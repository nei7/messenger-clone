import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway(5000, { namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('message')
  handleMessage(
    client: Socket,
    message: { sender: string; room: string; message: string },
  ): void {
    this.server.to(message.room).emit('message', message);
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
