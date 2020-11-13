import Vue from 'vue';
import Vuex from 'vuex';
import { config } from '../components/helpers/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    listingInCreation: null,
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
    alert: {
      aclass: '',
      message: '',
      show: false,
      icons: {
        success: 'mdi-check',
        warning: 'mdi-alert',
        error: 'mdi-window-close',
        info: 'mdi-information',
      },
      icon: '',
    },
  },
  mutations: {
    setListingInCreation(state, payload) {
      state.listingInCreation = {};
      for (const key in payload) {
        state.listingInCreation[key] = payload[key];
      }
    },
    removeListingInCreation(state, payload) {
      console.log(payload);
      state.listingInCreation = null;
    },
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
    showAlert(state, payload) {
      for (const key in payload) {
        state.alert[key] = payload[key];
      }
      state.alert.show = true;
    },
    hideAlert(state) {
      setTimeout(() => {
        state.alert.show = false;
      }, state.alert.timeout);
    },
  },
  actions: {
    async uploadListingImage({ commit, state }, payload) {
      const formData = new FormData();
      formData.append('listingImage', payload.listingImage);
      formData.append('index', payload.index);
      let requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.currentUser.token}`,
        },
        body: formData,
      };
      const res = await fetch(
        `${config.serverURL}/listings/listingimage`,
        requestOptions
      );
      const data = await res.json();
      console.log(data, res, commit);
      // axios.post("/api/uploadFile", formData)
      //   .then(function (result) {
      //     console.log(result);
      //   }, function (error) {
      //     console.log(error);
      //   });
    },
    async updateListingInCreation({ commit, state }, payload) {
      const dataToUpdate = [];
      for (const item in payload) {
        if (item == 'id') {
          continue;
        }
        let dataPoint = {};
        (dataPoint.name = item), (dataPoint.value = payload[item]);
        dataToUpdate.push(dataPoint);
      }
      console.log(dataToUpdate);
      const res = await fetch(`${config.serverURL}/listings/${payload.id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.currentUser.token}`,
        },
        body: JSON.stringify(dataToUpdate),
      });
      const data = await res.json();
      commit('setListingInCreation', data);
      console.log(data, res);
    },
    async setListingInCreation({ commit, state }, payload) {
      const res = await fetch(`${config.serverURL}/listings`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.currentUser.token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      commit('setListingInCreation', data);
      console.log(data, res);
    },
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
    showAlert(context, { aclass, message, timeout = 2500 }) {
      return new Promise((resolve) => {
        context.commit('showAlert', { aclass, message: message, timeout });
        resolve();
      });
    },
    hideAlert(context) {
      return new Promise((resolve) => {
        context.commit('hideAlert');
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
    alert(state) {
      return state.alert;
    },
    loggedInUser(state) {
      return state.currentUser;
    },
    listingInCreation(state) {
      return state.listingInCreation;
    },
  },
  modules: {},
});
