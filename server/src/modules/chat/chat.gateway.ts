import {
  OnGatewayDisconnect,
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
export class ChatGateway implements OnGatewayDisconnect {
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
        client.data = user;
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

  @SubscribeMessage('setTyping')
  async setTyping(
    client: Socket,
    data: {
      channelId: number;
    },
  ) {
    if (client.data.id) {
      this.server.to(data.channelId.toString()).emit('typing', {
        userId: client.data.id,
      });
    }
  }

  @SubscribeMessage('doneTyping')
  async doneTyping(
    client: Socket,
    data: {
      channelId: number;
    },
  ) {
    if (client.data.id) {
      this.server.to(data.channelId.toString()).emit('doneTyping', {
        userId: client.data.id,
      });
    }
  }

  handleDisconnect(client: Socket) {
    if (client.data.id) {
      this.userService.updateUserSeenStatus(client.data.id);
    }
  }
}
