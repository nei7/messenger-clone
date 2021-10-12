import { GetterTree } from 'vuex';
import { State } from './state';

export enum GettersType {
  getUserMessages = 'getUserMessages',
}

const getters: GetterTree<State, State> = {
  [GettersType.getUserMessages]: (state: State) => (id: number) =>
    state.messages.get(id) || [],
};

export default getters;
