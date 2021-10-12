import { createStore } from 'vuex';

import rooms from './rooms';
import users from './users';
import user from './user';
import socket from './plugins/socket';

export default createStore({
  modules: {
    rooms,
    user,
    users,
  },
  plugins: [socket],
});
