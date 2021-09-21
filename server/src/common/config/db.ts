import { Room } from 'src/entities/room.entity';
import { User } from 'src/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();
export default {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Room],
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
};
