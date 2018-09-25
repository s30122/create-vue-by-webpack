import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {},
  state: {
    userName: "aaa"
  },
  mutations: {
    Set_User_Name(state, name) {
      state.userName = name;
    }
  }
});

export default store;
