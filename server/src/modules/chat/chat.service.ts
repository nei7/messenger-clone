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

  async addMessage(message: string, senderId: number, receiverId: number) {
    return this.messageRepository.save({
      sender: {
        id: senderId,
      },
      receiver: {
        id: receiverId,
      },
      content: message,
    });
  }

  async getMessages(from: number, to: number) {
    return this.messageRepository.find({
      sender: {
        id: from,
      },
      receiver: {
        id: to,
      },
    });
  }
}
