import api from '@/api';
import { ActionTree } from 'vuex';
import { MutationType } from './mutations';
import { State } from './state';

export enum ActionTypes {
  getUsers = 'getUsers',
}

const actions: ActionTree<State, State> = {
  async getUsers({ commit }) {
    const users = await (await api.get('/users')).data;
    commit(MutationType.SET_USERS, users);
  },
};

export default actions;
