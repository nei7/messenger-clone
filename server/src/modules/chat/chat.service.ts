import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async addMessage(message: string, sender: User, receiver: User) {
    return this.messageRepository.save({
      sender: sender,
      receiver: receiver,
      content: message,
    });
  }
}
