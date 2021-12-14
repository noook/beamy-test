import { createApp } from 'vue';
import 'virtual:windi.css';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app');
