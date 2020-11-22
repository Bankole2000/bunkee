import Vue from 'vue';
import VueMeta from 'vue-meta';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import Croppa from 'vue-croppa';

// export const SocketInstance = socketio('http://localhost:3000');

Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: socketio('http://localhost:3000'),
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
  })
);
Vue.use(VueMeta);
Vue.use(Croppa);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
