import { IMessage } from '../types';

type DateJSON = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minutes: number;
  seconds: number;
  formatted: () => string;
};

export function parseDate(date: string): DateJSON {
  const dt = new Date(date);
  return {
    year: dt.getFullYear(),
    month: dt.getMonth(),
    day: dt.getDate(),
    hour: dt.getHours(),
    minutes: dt.getMinutes(),
    seconds: dt.getSeconds(),
    formatted() {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const today = new Date();

      if (
        today.getFullYear() === this.year &&
        today.getMonth() === this.month &&
        today.getDate() === this.day
      ) {
        return 'Today';
      }

      return `${this.day} ${months[this.month]} ${this.year} `;
    },
  };
}

export function sortMessages(
  messages: IMessage[],
  unread?: number,
): { [n: string]: IMessage[] } | [] {
  const arr: { [n: string]: IMessage[] } = {};

  let unreadArr: IMessage[] = [];

  if (messages) {
    if (unread && unread > 0) {
      unreadArr = messages.slice(messages.length - unread, messages.length);
      messages = messages.slice(0, messages.length - unread);
    }

    messages.forEach(msg => {
      const date = parseDate(msg.sentAt);

      if (date.formatted() in arr) {
        arr[date.formatted()].push(msg);
        return;
      }

      arr[date.formatted()] = [msg];
    });

    if (unreadArr.length > 0) {
      arr['Unread Mesages'] = unreadArr;
    }

    return arr;
  }
  return [];
}
