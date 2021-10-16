export type Loading = (
  parent: Element,
  props?: LoadingProps,
) => { destroy(): void };

export type LoadingProps = {
  color?: string;
  stroke?: number;
  radius?: number;
  text?: string;
  background?: string;
};
