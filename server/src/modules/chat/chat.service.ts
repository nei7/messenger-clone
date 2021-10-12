import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  addMessage(message: string, sender: User, receiverId: number) {
    return this.messageRepository.save({
      sender,
      receiver: {
        id: receiverId,
      },
      content: message,
    });
  }
}
