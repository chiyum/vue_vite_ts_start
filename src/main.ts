import { createApp } from 'vue';
import '@/assets/scss/main.scss';
import App from './App.vue';
import Layout from "@/_app/layouts";
import Directives from "@/_app/directives";
import router from "@/router";


const VueApp = createApp(App);

VueApp.use(router);
VueApp.use(Layout);
VueApp.use(Directives);
VueApp.mount('#app');
