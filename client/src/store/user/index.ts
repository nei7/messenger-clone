import { Module } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import state, { State } from "./state";
import getters from "./getters";

const store: Module<State, never> = {
  namespaced: true,
  actions,
  mutations,
  state,
  getters,
};

export default store;
