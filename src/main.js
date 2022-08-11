import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'; // import antd

import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/axios'

import 'ant-design-vue/dist/antd.css'; // import antd css
import '@/assets/style/tailwind.css'
import '@/assets/style/global.css'

import { registerGlobalComponents } from '../src/ultis/import'

const app = createApp(App);
registerGlobalComponents(app);
app.use(store);
app.use(router);

//use antd 
app.use(Antd);

app.use(VueAxios, axios);

app.mount('#app');
