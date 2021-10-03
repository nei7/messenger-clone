import { IUser } from '@/types/rooms';
import { MutationTree } from 'vuex';
import { State } from './state';

export enum MutationType {
  SET_USER = 'SET_USER_DATA',
}

const mutations: MutationTree<State> = {
  [MutationType.SET_USER]: (
    state: State,
    payload: IUser & { token: string },
  ) => {
    ((Object.keys(state) as unknown) as Array<keyof State>).forEach(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      key => ((state as any)[key] = payload[key]),
    );
  },
};

export default mutations;
