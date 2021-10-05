import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { User } from 'src/entities/user.entity';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
