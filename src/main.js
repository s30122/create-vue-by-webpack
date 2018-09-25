// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import moment from "moment";
import JsonExcel from "vue-json-excel";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(moment);
Vue.component("downloadExcel", JsonExcel);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
  render: h => h(App)
});
