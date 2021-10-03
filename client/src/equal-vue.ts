import { getCurrentInstance } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const equal = (): Record<string, any> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  getCurrentInstance().appContext.config.globalProperties;
