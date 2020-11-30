import Vue from 'vue';
import Vuex from 'vuex';
import { config } from '../components/helpers/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    connected: null,
    loading: false,
    currentUser: null,
    currentUserContacts: null,
    currentUserListings: null,
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
    SOCKET_CONNECT(state) {
      console.log('socket disconnected');
      state.connected = true;
    },
    SOCKET_DISCONNECT(state) {
      state.connected = false;
    },
    SOCKET_MESSAGE(state, message) {
      state.message = message;
    },
    SOCKET_HELLO_WORLD(state, message) {
      state.message = message;
    },
    SOCKET_ERROR(state, message) {
      state.error = message.error;
    },
    SOCKET_newLogin(state, message) {
      console.log(state.currentUserContacts, message);
      if (state.currentUserContacts) {
        state.currentUserContacts.forEach((contact) => {
          if (contact.inviter.uuid == message.uuid) {
            console.log('Is Inviter', contact.inviter);
            contact.inviter.isOnline = true;
            contact.inviter.lastSeen = message.lastSeen;
          }
          if (contact.invitee.uuid == message.uuid) {
            console.log('Is Invitee', contact.invitee);
            contact.invitee.isOnline = true;
            contact.invitee.lastSeen = message.lastSeen;
          }
        });
      }
    },
    SOCKET_userLogout(state, message) {
      console.log(state.currentUserContacts, message);
      if (state.currentUserContacts) {
        state.currentUserContacts.forEach((contact) => {
          if (contact.inviter.uuid == message.uuid) {
            console.log('Is Inviter', contact.inviter);
            contact.inviter.isOnline = false;
            contact.inviter.lastSeen = message.lastSeen;
          }
          if (contact.invitee.uuid == message.uuid) {
            console.log('Is Invitee', contact.invitee);
            contact.invitee.isOnline = false;
            contact.invitee.lastSeen = message.lastSeen;
          }
        });
      }
    },
    setLoading(state, payload) {
      state.loading = payload.loading;
    },
    removeListingFromCurrentUserListings(state, payload) {
      state.currentUserListings.splice(
        state.currentUserListings.findIndex(
          (listing) => listing.id === payload.listingId
        ),
        1
      );
    },
    setCurrentUserListings(state, payload) {
      state.currentUserListings = payload;
    },
    setCurrentUserContacts(state, payload) {
      state.currentUserContacts = payload;
    },
    updateCurrentUserContacts(state, payload) {
      state.currentUserContacts.forEach((contact) => {
        if (contact.id == payload.contactId) {
          if (contact.inviter.uuid == payload.uuid) {
            contact.inviter.isOnline = payload.status;
            contact.inviter.lastSeen = payload.lastSeen;
          }
          if (contact.invitee.uuid == payload.uuid) {
            contact.invitee.isOnline = payload.status;
            contact.invitee.lastSeen = payload.lastSeen;
          }
        }
      });
    },
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
    SOCKET_CONNECT({ commit }) {
      console.log('socket disconnected');
      commit('SOCKET_CONNECT');
    },
    SOCKET_NEWLOGIN({ commit }, payload) {
      console.log(payload, { commit });
    },
    updateUserContacts({ commit }, payload) {
      commit('updateCurrentUserContacts', payload);
    },
    async setLoading({ commit }, payload) {
      const { loading } = payload;
      commit('setLoading', { loading });
    },
    async deleteOwnListing({ commit, state }, payload) {
      const listingToDelete = state.currentUserListings.find((listing) => {
        return (
          listing.id == payload.listingId &&
          listing.ownerId == state.currentUser.id
        );
      });
      if (listingToDelete) {
        console.log(listingToDelete);
        const res = await fetch(
          `${config.serverURL}/listings/${payload.listingId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${state.currentUser.token}`,
            },
          }
        );
        const data = await res.json();
        console.log(data, res, payload);
        if (data.hasErrors) {
          return false;
        } else {
          commit('removeListingFromCurrentUserListings', {
            listingId: payload.listingId,
          });
          commit('showToast', {
            sclass: 'info',
            message: 'Listing Deleted',
            timeout: 1500,
          });
          return true;
        }
      } else {
        console.log(listingToDelete);
        return false;
      }
    },
    async getCurrentUserListings({ commit, state }) {
      const res = await fetch(
        `${config.serverURL}/user/${state.currentUser.username}/listings`,
        {
          method: 'GET',
        }
      );
      const data = await res.json();
      console.log(data, res);
      commit('setCurrentUserListings', data.listings);
    },
    async getCurrentUserContacts({ commit, state }) {
      const res = await fetch(`${config.serverURL}/chat/contacts`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${state.currentUser.token}`,
        },
      });
      const data = await res.json();
      commit('setCurrentUserContacts', data.contacts.rows);
    },
    async deleteListingImage({ commit, state }, payload) {
      const res = await fetch(
        `${config.serverURL}/listings/${state.listingInCreation.listing.id}/listingimage/${payload.index}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${state.currentUser.token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data, res);
      if (data.hasErrors) {
        commit('showToast', {
          sclass: 'error',
          message: data.errors[0].message,
          timeout: 1500,
        });
      } else {
        commit('setListingInCreation', data);
      }
    },
    async uploadListingImage({ commit, state }, payload) {
      const formData = new FormData();
      formData.append('listingImage', payload.listingImage);
      formData.append('userGivenName', payload.userGivenName);
      formData.append('index', payload.index);
      let requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.currentUser.token}`,
        },
        body: formData,
      };
      const res = await fetch(
        `${config.serverURL}/listings/${state.listingInCreation.listing.id}/listingimage`,
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
      commit('setListingInCreation', data);
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
    async getListingInCreation({ commit, state }, payload) {
      const res = await fetch(
        `${config.serverURL}/listings/listing/${payload.listingId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${state.currentUser.token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data, res);
      if (data.hasErrors) {
        commit('showToast', {
          sclass: 'error',
          message: data.errors[0].message,
          timeout: 1500,
        });
        return false;
      } else {
        if (data.listing.ownerId !== state.currentUser.id) {
          commit('showToast', {
            sclass: 'error',
            message: 'You don not own this listing',
            timeout: 1500,
          });
          return false;
        } else {
          commit('setListingInCreation', data);
          return true;
        }
      }
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
    currentUserListings(state) {
      return state.currentUserListings;
    },
    currentUserContacts(state) {
      return state.currentUserContacts;
    },
    toast(state) {
      return state.toast;
    },
    loader(state) {
      return state.loader;
    },
    alert(state) {
      return state.alert;
    },
    loading(state) {
      return state.loading;
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
