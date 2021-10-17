import { Room } from 'src/entities/room.entity';
import { User } from 'src/entities/user.entity';
import * as dotenv from 'dotenv';
import { Message } from 'src/entities/message.entity';

dotenv.config();

export default {
  type: 'mysql',
  host:
    process.env.NODE_ENV === 'production' ? process.env.DB_HOST : 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Room, Message],
  synchronize: true,
  bigNumberStrings: false,
};
