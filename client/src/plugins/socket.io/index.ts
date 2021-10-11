import { App } from 'vue';
import { io } from 'socket.io-client';

export const socket = io(
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '',
  {
    reconnection: true,
    reconnectionDelay: 1000,
  },
);

export default (app: App): void => {
  app.provide('socket', socket);
};
