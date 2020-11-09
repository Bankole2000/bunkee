import Vue from 'vue';
import Vuex from 'vuex';
import { config } from '../components/helpers/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    toast: {
      sclass: '',
      message: '',
      // color: "",
      show: false,
      timeout: -1,
      icons: {
        success: 'mdi-check',
        warning: 'mdi-alert',
        error: 'mdi-window-close',
        info: 'mdi-information',
      },
      icon: '',
    },
    loader: {
      show: false,
      message: '',
      lclass: '',
    },
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = {};
      for (const key in payload) {
        state.currentUser[key] = payload[key];
      }
    },
    logOutUser(state) {
      state.currentUser = null;
    },
    showToast(state, payload) {
      for (const key in payload) {
        state.toast[key] = payload[key];
      }
      state.toast.icon = state.toast.icons[payload.sclass];
      state.toast.show = true;
    },
    hideLoader(state) {
      state.loader.show = false;
    },
    showLoader(state, payload) {
      for (const key in payload) {
        state.loader[key] = payload[key];
      }
      state.loader.show = true;
    },
  },
  actions: {
    setUser({ commit }, payload) {
      commit('setUser', payload);
    },
    showToast({ commit }, { sclass, message, timeout = 2000 }) {
      return new Promise((resolve) => {
        commit('showToast', { sclass, message, timeout });
        resolve();
      });
    },
    hideLoader({ commit }) {
      commit('hideLoader');
    },
    showLoader({ commit }, { lclass, message }) {
      return new Promise((resolve) => {
        commit('showLoader', { lclass, message });
        resolve();
      });
    },
    logOut({ commit }) {
      commit('logOutUser');
    },
    async getProfile({ commit }, payload) {
      const res = await fetch(`${config.serverURL}/users/checkusername`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: payload.username }),
      });
      const data = await res.json();
      console.log(data, res, commit);
    },
  },
  getters: {
    toast(state) {
      return state.toast;
    },
    loader(state) {
      return state.loader;
    },
    loggedInUser(state) {
      return state.currentUser;
    },
  },
  modules: {},
});
