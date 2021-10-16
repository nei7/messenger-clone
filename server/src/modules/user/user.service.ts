import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository, getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Message } from 'src/entities/message.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async getMessages(id: number, userid: number, offset = 0, limit = 50) {
    const messages = await this.messageRepository.find({
      skip: offset * limit,
      take: limit,
      order: {
        sentAt: 'DESC',
      },
      where: [
        {
          receiver: {
            id: userid,
          },
          sender: {
            id,
          },
        },
        {
          receiver: {
            id,
          },
          sender: {
            id: userid,
          },
        },
      ],

      relations: ['receiver', 'sender'],
    });
    return messages.sort(function (a, b) {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const user = await this.userRepository.save({
      ...data,
      avatar: `initials/${data.name}.svg`,
    });
    delete user.password;

    return user;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }

  async getUsers() {
    return this.userRepository.find({
      select: ['email', 'id', 'name'],
    });
  }

  async getUsersWithLastMessage(id: string) {
    const sbQuery = getConnection()
      .createQueryBuilder()
      .select(['senderId', 'max(id) as id'])
      .from(Message, 'messages')
      .where(`messages.receiverId = ${id}`)
      .groupBy('senderId');

    const anthSbQuery = getConnection()
      .createQueryBuilder()
      .select('*')
      .from(Message, 'messages');

    const users = getConnection()
      .createQueryBuilder()
      .select([
        'users.name as name',
        'users.email as email',
        'users.id as id',
        'users.avatar as avatar',
        'messages.content as lastMessage',
        'messages.sentAt as lastMessageDate',
      ])
      .from(User, 'users')
      .leftJoin(
        `(${sbQuery.getQuery()})`,
        'last_messages',
        'last_messages.senderId = users.id ',
      )
      .leftJoin(
        `(${anthSbQuery.getQuery()})`,
        'messages',
        'messages.id = last_messages.id',
      );

    return users.execute();
  }
}
