import Vue from 'vue';
import ElementUI from 'element-ui';
import axios from 'axios';

import 'xe-utils';
import VXETable from 'vxe-table';
import VXETablePluginElement from 'vxe-table-plugin-element';

import App from './App.vue';
import router from './router';
import store from './store';

import 'element-ui/lib/theme-chalk/index.css';
import 'vxe-table-plugin-element/dist/style.css';
import 'vxe-table/lib/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.use(VXETable);
VXETable.use(VXETablePluginElement);

// axios.defaults.baseURL = 'http://192.168.1.44:90/api';

Vue.http = Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
