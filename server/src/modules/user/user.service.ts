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

  async createUser(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const user = await this.userRepository.save(data);
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

  async getUsersLastMessage() {
    // select messages.* from messages,users where sentAt in (select MAX(sentAt) from messages where senderId = users.id)
    const subQuery = getConnection()
      .createQueryBuilder()
      .select('MAX(sentAt)')
      .from(Message, 'messages')
      .where('senderId = users.id');

    const users = getConnection()
      .createQueryBuilder()
      .select(
        'messages.content as lastMessage, users.name, users.id, users.email',
      )
      .from(Message, 'messages')
      .from(User, 'users')
      .where(`sentAt IN (${subQuery.getQuery()})`);

    return users.execute();
  }
}
