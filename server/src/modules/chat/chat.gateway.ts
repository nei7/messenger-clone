import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { User } from 'src/entities/user.entity';
import { ChatService } from './chat.service';

@WebSocketGateway(5000, {
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway {
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(
    client: Socket,
    message: { senderId: number; receiverId: number; message: string },
  ): Promise<void> {
    try {
      await this.chatService.addMessage(
        message.message,
        message.senderId,
        message.receiverId,
      );
      this.server.to(message.receiverId.toString()).emit('message', message);
    } catch (err) {
      client.emit('error', err);
    }
  }

  @SubscribeMessage('joinRoom')
  handleJoin(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeave(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
