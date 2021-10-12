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
): { [n: string]: IMessage[] } | [] {
  const arr: { [n: string]: IMessage[] } = {};
  if (messages) {
    messages.forEach(msg => {
      const date = parseDate(msg.sentAt);

      if (date.formatted() in arr) {
        arr[date.formatted()].push(msg);
        return;
      }

      arr[date.formatted()] = [msg];
    });

    return arr;
  }
  return [];
}
