import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Equal from "equal-vue";
import loading from "./plugins/loading";

import "equal-vue/dist/style.css";
import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(Equal);
app.use(store);

app.use(loading);

app.mount("#app");
