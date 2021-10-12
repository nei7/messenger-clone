import { IMessage } from '@/types';
import { IUser } from '@/types/rooms';
import { MutationTree } from 'vuex';
import { State } from './state';

export enum MutationType {
  SET_USERS = 'SET_USERS',
  SET_USER_MESSAGES = 'SET_USER_MESSAGES',
  SET_USER_MESSAGE = 'SET_USER_MESSAGE',
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
  [MutationType.SET_USER_MESSAGE]: (
    state: State,
    payload: {
      receiverId: number;
      senderId: number;
      message: IMessage;
      isUnread?: boolean;
    },
  ) => {
    const messages = state.messages.get(payload.receiverId);
    const user = state.users.find(usr => usr.id === payload.receiverId);

    if (messages) {
      messages.push(payload.message);
      if (user) {
        user.lastMessage = payload.message.content;
        user.unreadMessages = user.unreadMessages
          ? user.unreadMessages++
          : payload.isUnread
          ? 1
          : 0;
      }
    }
  },
};

export default mutations;
