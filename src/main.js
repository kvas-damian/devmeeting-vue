import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';

import App from './App.vue';
import store from './store';

Vue.use(VeeValidate);
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
