// // import { App } from 'vue';
import permission from './permission';
import resizeDirective from './resizeDirective';

export default {
  install(Vue) {
    Vue.directive('permission', permission);
    Vue.directive('resize', resizeDirective);
  },
};
