import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import './mock';
import App from './App.vue';
import '@/assets/style/global.less';
import '@/api/interceptor';
import '@arco-themes/vue-diamond-web3-pos/index.less';
import '@/assets/style/index.css';
const IconFont = ArcoVue.Icon.addFromIconFontCn({ src: '//at.alicdn.com/t/c/font_4700879_0a2o7c1yg41m.js' });
// add global components
const app = createApp(App);
app.component('IconFont', IconFont);
app.use(ArcoVue, {});
app.use(ArcoVueIcon);

app.use(router);
app.use(store);
app.use(i18n);
app.use(globalComponents);
app.use(directive);

app.mount('#app');
