import { IUser } from './rooms';

export interface IMessage {
  id: number;
  content: string;
  sender: IUser;
  receiver: IUser;
  sentAt: string;
}
