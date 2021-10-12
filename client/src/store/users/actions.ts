import api from '@/api';
import { ActionTree } from 'vuex';
import { MutationType } from './mutations';
import { State } from './state';

export enum ActionTypes {
  getUsers = 'getUsers',
  getUserMessages = 'getUserMessages',
}

const actions: ActionTree<State, State> = {
  async [ActionTypes.getUsers]({ commit }) {
    const users = await (await api.get('/users')).data;
    commit(MutationType.SET_USERS, users);
  },
  async [ActionTypes.getUserMessages]({ commit, state }, userid: number) {
    const user = state.users.find(user => user.id === userid);
    if (user) user.unreadMessages = 0;

    if (state.messages.get(userid)) {
      return;
    }
    const messages = (await api.get(`/users/${userid}/messages`)).data;

    commit(MutationType.SET_USER_MESSAGES, { userid, messages });
  },
};

export default actions;
