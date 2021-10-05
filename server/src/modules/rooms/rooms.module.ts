import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/entities/room.entity';
import { UserService } from '../user/user.service';
import { User } from 'src/entities/user.entity';
import { Message } from 'src/entities/message.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Room, User, Message])],
  controllers: [RoomsController],
  providers: [RoomsService, UserService],
})
export class RoomsModule {}
