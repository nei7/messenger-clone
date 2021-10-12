import { Store } from 'vuex';
import { MutationType } from '../users/mutations';
import { socket } from '@/plugins/socket.io';
import { IMessage } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (store: Store<any>): void => {
  socket.on('message', (message: IMessage) => {
    if (store.state.user.id !== message.sender.id) {
      store.commit(`users/${MutationType.SET_USER_MESSAGE}`, {
        userid: message.sender.id,
        message,
      });
    }
  });
};
