import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import ArcoVue from "@arco-design/web-vue";
import Antd from "ant-design-vue";
// import "@arco-design/web-vue/dist/arco.css";
import "ant-design-vue/dist/reset.css";
import "@/plugins/axios";
import "@/access";

import VueMarkdownEditor from "@/plugins/mdEditor";
import VMdPreview from "@/plugins/mdPreviewer";

createApp(App)
  .use(Antd)
  .use(store)
  .use(router)
  .use(VueMarkdownEditor)
  .use(VMdPreview)
  .mount("#app");
