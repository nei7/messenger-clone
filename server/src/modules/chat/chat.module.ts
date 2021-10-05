import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
