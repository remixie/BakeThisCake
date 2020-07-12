import Vue from "vue";
import App from "@/App.vue";
import store from "@/store";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueSocketio from "vue-socket.io-extended";
import $socket from "@/socket-instance";
Vue.use(BootstrapVue);
Vue.use(VueSocketio, $socket, {
  store,
  actionPrefix: "socket_",
  mutationPrefix: "SOCKET_"
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
