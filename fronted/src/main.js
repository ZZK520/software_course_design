import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js'

import store from './store';

import Vuex from 'vuex';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vuex);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
