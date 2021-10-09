import { IMessage } from '@/types';
import { IUser } from '@/types/rooms';
import { MutationTree } from 'vuex';
import { State } from './state';

export enum MutationType {
  SET_USERS = 'SET_USERS',
  SET_USER_MESSAGES = 'SET_USER_MESSAGES',
}

const mutations: MutationTree<State> = {
  [MutationType.SET_USERS]: (state: State, payload: IUser[]) => {
    state.users = payload;
  },
  [MutationType.SET_USER_MESSAGES]: (
    state: State,
    payload: { messages: IMessage[]; userid: number },
  ) => {
    state.messages.set(payload.userid, payload.messages);
  },
};

export default mutations;
