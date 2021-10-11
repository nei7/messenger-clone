import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import db from 'src/config/db';
import { AuthModule } from '../auth/auth.module';
import { ChatModule } from '../chat/chat.module';
import { RoomsModule } from '../rooms/rooms.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(db as TypeOrmModuleOptions),
    AuthModule,
    RoomsModule,
    UserModule,
    ChatModule,
  ],
  controllers: [],
})
export class AppModule {}
