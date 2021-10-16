import Component from './Index.vue';
import { App } from '@vue/runtime-core';
import { createApp } from '@vue/runtime-dom';
import { Loading } from 'equal-vue';
import './index.css';
import { LoadingProps } from '@/types/loading';

function renderComponent(parent: HTMLElement, props: LoadingProps) {
  if (parent.classList.contains('overlay')) {
    return {
      destroy() {
        return;
      },
    };
  }
  parent.scrollTop = 0;
  parent.classList.add('overlay');

  const container = document.createElement('div');
  container.classList.add('loading__overlay');

  container.style.backgroundColor = props.background || 'white';

  container.style.borderRadius = getComputedStyle(parent).borderRadius;

  const instance = createApp(Component, props)
    .use(Loading)
    .mount(container);

  parent.appendChild(container);

  return {
    destroy: () => {
      parent.classList.remove('overlay');
      instance.$.appContext.app.unmount();
      container.remove();
    },
  };
}

const plugin = (app: App): void => {
  app.provide('loading', renderComponent);
};

export default plugin;
