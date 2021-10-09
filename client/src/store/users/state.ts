import { IUser } from '@/types/rooms';
import { IMessage } from '@/types';

export interface State {
  users: IUser[];
  messages: Map<number, IMessage[]>;
}

const state: State = {
  users: [],
  messages: new Map(),
};

export default state;
