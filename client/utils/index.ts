import { IMessage } from '../src/types';

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
    day: dt.getDay(),
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

      return `${this.day} ${months[this.month]} ${this.year} `;
    },
  };
}

export function sortMessages(
  messages: IMessage[],
): { [n: string]: IMessage[] } {
  const arr: { [n: string]: IMessage[] } = {};

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
