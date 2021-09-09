import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Equal from "equal-vue";
import "equal-vue/dist/style.css";
import "./assets/main.css";

createApp(App)
  .use(Equal)
  .use(store)
  .use(router)
  .mount("#app");
