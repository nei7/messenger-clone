import { Store } from 'vuex';
import { MutationType } from '../users/mutations';
import { socket } from '@/plugins/socket.io';
import { IMessage } from '@/types';
import router from '../../router';
import { ActionTypes } from '../users/actions';
import { messageEvent, EventType } from '@/events/messages';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (store: Store<any>): void => {
  socket.on('message', async (message: IMessage) => {
    if (store.state.user.id !== message.sender.id) {
      if (!store.state.users.messages.get(message.sender.id)) {
        await store.dispatch(
          `users/${ActionTypes.getUserMessages}`,
          message.sender.id,
        );
      }
      store.commit(`users/${MutationType.SET_USER_MESSAGE}`, {
        receiverId: message.sender.id,
        senderId: message.receiver.id,
        message,
        isUnread:
          parseInt(router.currentRoute.value.params.userid as string) !==
          message.sender.id,
      });
      messageEvent.emit(EventType.NEW_MESSAGE, {
        senderId: message.sender.id,
        content: message.content,
      });
    }
  });
};
