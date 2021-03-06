import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Equal from 'equal-vue';
import loading from './plugins/loading';

import 'equal-vue/dist/style.css';
import './index.css';
import 'animate.css';

import socketIo from './plugins/socket.io';

const app = createApp(App);

app.use(router);
app.use(Equal);
app.use(store);

app.use(socketIo);
app.use(loading);

app.mount('#app');
