import api from '@/api';
import { IMessage } from '@/types';
import { ActionTree } from 'vuex';
import { MutationType } from './mutations';
import { State } from './state';

export enum ActionTypes {
  getUsers = 'getUsers',
  getUserMessages = 'getUserMessages',
  loadUserMesages = 'addUserMesages',
}

const actions: ActionTree<State, State> = {
  async [ActionTypes.getUsers]({ commit }) {
    const users = await (await api.get('/users')).data;
    commit(MutationType.SET_USERS, users);
  },
  async [ActionTypes.getUserMessages]({ commit, state }, userid: number) {
    const user = state.users.find(user => user.id === userid);
    if (!user) {
      return;
    }

    if (state.messages.get(userid)) {
      return;
    }
    const messages = (await api.get(`/users/${userid}/messages`)).data;
    if (messages.length < 50) {
      user.properties.allMessagesLoaded = true;
    }
    commit(MutationType.SET_USER_MESSAGES, { userid, messages });
  },

  async [ActionTypes.loadUserMesages]({ state }, userid: number) {
    const user = state.users.find(user => user.id === userid);
    if (!user) throw new Error('User not found');
    if (user.properties.allMessagesLoaded) return;

    user.properties.offset++;
    const messages: IMessage[] = (
      await api.get(
        `/users/${userid}/messages?offset=${user.properties.offset}`,
      )
    ).data;

    if (messages.length < 50) {
      user.properties.allMessagesLoaded = true;
      return;
    }
    const userMessages = state.messages.get(userid);
    if (!userMessages) throw new Error("Can't load user messages");

    state.messages.set(userid, [...messages, ...userMessages]);
  },
};

export default actions;
