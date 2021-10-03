import { createStore } from 'vuex';

import rooms from './rooms';
import users from './users';
import user from './user';

export default createStore({
  modules: {
    rooms,
    user,
    users,
  },
});
