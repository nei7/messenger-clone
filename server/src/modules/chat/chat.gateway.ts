import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { User } from 'src/entities/user.entity';
@WebSocketGateway(5000, {
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway {
  constructor(
    private chatService: ChatService,
    private userService: UserService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('authenticate')
  async authenticate(client: Socket, token: string) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload &
        User;
      delete user.iat;
      if (await this.userService.findOne(user)) {
        client.join(user.id.toString());
        client.emit('success');
      } else
        client.emit('error', {
          error: 'Invalid token',
        });
    } catch (err) {
      client.emit('error', {
        error: err.message,
      });
    }
  }
}
