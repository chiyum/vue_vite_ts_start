import { createApp } from "vue";
import "@/assets/scss/main.scss";
import App from "./App.vue";

/** _app */
import Layout from "@/_app/layouts";
import Directives from "@/_app/directives";
import router from "@/router";

/** plugin */
import { Quasar, Loading, Dialog, Notify } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import i18n from "@/i18n";

const VueApp = createApp(App);

VueApp.use(router);
VueApp.use(Layout);
VueApp.use(Directives);
VueApp.use(Quasar, {
  plugins: {
    Loading,
    Dialog,
    Notify
  }
});
VueApp.use(i18n);
VueApp.mount("#app");
