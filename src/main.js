import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "tailwindcss/base.css";
import "tailwindcss/components.css";
import "tailwindcss/utilities.css";

Vue.use(BootstrapVue);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
