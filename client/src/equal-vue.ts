import { getCurrentInstance } from 'vue';

export const equal = () =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  getCurrentInstance().appContext.config.globalProperties;
