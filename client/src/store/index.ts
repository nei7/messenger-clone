import { createStore } from "vuex";
import rooms from "./rooms";
import users from "./users";

export default createStore({
  mutations: {},
  actions: {},
  modules: {
    rooms,
    users,
  },
});
