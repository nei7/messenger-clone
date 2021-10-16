import mitt from 'mitt';

export const messageEvent = mitt();

export enum EventType {
  NEW_MESSAGE = 'NEW_MESSAGE',
}
