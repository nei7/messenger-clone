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

  async getUnread(user: User) {
    // SELECT senderId, count(senderId) FROM chat.messages where sentAt > "2021-10-16 22:47:16" AND receiverId = 22 GROUP by senderId

    const query = getConnection()
      .createQueryBuilder()
      .select(['senderId', 'count(senderId) as unread'])
      .from(Message, 'messages')
      .where(
        `sentAt > "${user.lastSeen.toISOString().split('T')[0]} ${
          user.lastSeen.toTimeString().split(' ')[0]
        }" and receiverId = ${user.id}`,
      )
      .groupBy(`senderId`);
    return query.execute();
  }

  async updateUserSeenStatus(userid: number) {
    this.userRepository.update(
      { id: userid },
      {
        lastSeen: new Date(),
      },
    );
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
        'users.createdAt as createdAt',
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
