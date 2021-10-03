import {
  OnGatewayConnection,
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
    message: { sender: User; receiver: User; message: string },
  ): Promise<void> {
    try {
      await this.chatService.addMessage(
        message.message,
        message.sender,
        message.receiver,
      );
      this.server.to(message.receiver.id.toString()).emit('message', message);
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
