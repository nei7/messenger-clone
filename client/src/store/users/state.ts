import { IUser } from '@/types/rooms';
import { IMessage } from '@/types';

export interface State {
  users: IUser[];
  messages: Map<number, IMessage[]>;
  selectedUser: IUser | null;
}

const state: State = {
  users: [],
  messages: new Map(),
  selectedUser: null,
};

export default state;
