import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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
}
