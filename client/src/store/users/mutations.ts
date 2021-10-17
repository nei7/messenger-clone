import { IMessage } from '@/types';
import { IUser } from '@/types/rooms';
import { MutationTree } from 'vuex';
import { State } from './state';

export enum MutationType {
  SET_USERS = 'SET_USERS',
  SET_USER_MESSAGES = 'SET_USER_MESSAGES',
  SET_USER_MESSAGE = 'SET_USER_MESSAGE',
  SELECT_USER = 'SELECT_USER',
  PURGE_UNREAD = 'PURGE_UNREAD',
}

const mutations: MutationTree<State> = {
  [MutationType.SET_USERS]: (
    state: State,
    payload: {
      users: IUser[];
      unread: Array<{
        senderId: number;
        unread: number;
      }>;
    },
  ) => {
    state.users = payload.users.map(usr => {
      const unread = payload.unread.find(u => u.senderId === usr.id);
      return {
        ...usr,
        createdAt: new Date(usr.createdAt).toLocaleString(),
        properties: {
          offset: 0,
          unreadMessages: unread ? unread.unread : 0,
          allMessagesLoaded: false,
        },
      };
    });
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
        user.lastMessageDate = new Date().toString();
        user.properties.unreadMessages = payload.isUnread
          ? (user.properties.unreadMessages += 1)
          : 0;
      }
    }
  },
  [MutationType.SELECT_USER]: (state: State, id: number) => {
    const user = state.users.find(user => user.id === id);
    if (user) {
      state.selectedUser = user;
    }
  },
  [MutationType.PURGE_UNREAD]: (state: State) => {
    if (state.selectedUser) state.selectedUser.properties.unreadMessages = 0;
  },
};

export default mutations;
