import { IUser } from './rooms';

export interface IMessage {
  id: number;
  content: string;
  sender: IUser;
  reciever: IUser;
  sentAt: Date;
}
