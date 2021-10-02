import { IUser } from "@/types/rooms";
import { MutationTree } from "vuex";
import { State } from "./state";

export enum MutationType {
  SET_USERS = "SET_USERS",
}

const mutations: MutationTree<State> = {
  [MutationType.SET_USERS]: (state: State, payload: IUser[]) => {
    state.users = payload;
  },
};

export default mutations;
