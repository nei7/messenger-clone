import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import db from 'src/common/config/db';
import { AuthModule } from '../auth/auth.module';
import { ChatGateway } from '../chat/chat.gateway';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(db as TypeOrmModuleOptions),
    AuthModule,
    RoomsModule,
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
