import Vue from 'vue';
import Vuex from 'vuex';
import { config } from '../components/helpers/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    io: null,
    connected: null,
    loading: false,
    userDirectory: [],
    currentUser: null,
    currentUserContacts: [],
    currentUserListings: null,
    listingInCreation: null,
    ntoast: {
      show: false,
      sender: '',
      timeout: '',
      message: '',
      imgUrl: '',
      icons: {
        success: 'mdi-check',
        warning: 'mdi-alert',
        error: 'mdi-window-close',
        info: 'mdi-information',
        like: 'mdi-heart',
        chatInvite: 'mdi-forum',
        listingInvite: 'mdi-home-account',
        offerInvite: 'mdi-account-group',
      },
      icon: '',
      colors: {
        like: 'red',
        chatInvite: 'primary',
        listingInvite: 'info',
        offerInvite: 'warning',
      },
    },
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
    SOCKET_inviteResponse(state, data) {
      console.log(data);
      state.currentUserContacts.forEach((contact) => {
        if (contact.uuid == data.data.invite.uuid) {
          data.data.invite.hasBeenAccepted
            ? (contact.hasBeenAccepted = data.data.invite.hasBeenAccepted)
            : false;
          data.data.invite.hasBeenDeclined
            ? (contact.hasBeenDeclined = data.data.invite.hasBeenDeclined)
            : false;
          data.data.invite.isBlocked
            ? (contact.isBlocked = data.data.invite.isBlocked)
            : false;
        }
        if (data.data.notification) {
          state.currentUser.recievedNotifications.push(data.data.notification);
        }
      });
    },
    SOCKET_allRead(state, data) {
      console.log(data, state);
      const contact = state.currentUserContacts.find(
        (contact) => contact.id == data.contactId
      );
      contact.conversation.forEach((message) => {
        if (message.senderId == data.senderId) {
          message.hasBeenRead = data.hasBeenRead;
          message.hasBeenDelivered = data.hasBeenDelivered;
        }
      });
    },
    openDialogReadContactMessages(state, payload) {
      const contact = state.currentUserContacts.find(
        (contact) => contact.id == payload.contactId
      );
      contact.conversation.forEach((message) => {
        if (message.senderId != state.currentUser.id && !message.hasBeenRead) {
          message.hasBeenRead = true;
          message.hasBeenDelivered = true;
        }
      });
    },
    clearAllNotifications(state) {
      state.currentUser.recievedNotifications = [];
    },
    markAllAsRead(state) {
      state.currentUser.recievedNotifications.forEach((notif) => {
        notif.hasBeenRead = true;
      });
    },
    addContactMessage(state, payload) {
      const contact = state.currentUserContacts.find(
        (contact) => contact.id == payload.conversationId
      );
      contact.conversation.push(payload);
    },
    setUserDirectory(state, payload) {
      state.userDirectory = payload;
    },
    // SOCKET_pingMessage(state, data) {
    //   state.currentUserContacts.forEach((contact) => {
    //     if (contact.id == data.conversationId) {
    //       contact.conversation.push(data);
    //     }
    //   });
    // },

    SOCKET_deleteContact(state, data) {
      // listing.listingImages.splice(
      //   listing.listingImages.findIndex((v) => v.listingOrder === index),
      //   1
      // );
      // get index of contact with id in payload
      state.currentUserContacts.splice(
        state.currentUserContacts.findIndex(
          (contact) => contact.id === data.contactId
        ),
        1
      );

      // const removeIndex = state.currentUserContacts
      //   .map((contact) => {
      //     contact.id;
      //   })
      //   .indexOf(data.contactId);
      // // remove contact
      // state.currentUserContacts.splice(removeIndex, 1);
      // state.message = data;
      console.log(data);
    },

    SOCKET_newLogin(state, message) {
      // console.log(message);
      const user = state.userDirectory.find(
        (user) => user.uuid == message.uuid
      );
      user.isOnline = true;
      user.lastSeen = message.lastSeen;
      user.currentSocketId = message.currentSocketId;
      console.log({ user, message });
      if (state.currentUserContacts) {
        state.currentUserContacts.forEach((contact) => {
          if (contact.inviter.uuid == message.uuid) {
            console.log('Is Inviter', contact.inviter);
            contact.inviter.isOnline = true;
            contact.inviter.lastSeen = message.lastSeen;
            contact.inviter.currentSocketId = message.currentSocketId;
          }
          if (contact.invitee.uuid == message.uuid) {
            console.log('Is Invitee', contact.invitee);
            contact.invitee.isOnline = true;
            contact.invitee.lastSeen = message.lastSeen;
            contact.invitee.currentSocketId = message.currentSocketId;
          }
        });
      }
    },
    SOCKET_recievedListingInvite(state, data) {
      console.log(data);
      state.currentUser.recievedNotifications.push(data.data.notification);
    },
    SOCKET_recievedChatInvite(state, data) {
      if (data.data.success) {
        state.currentUserContacts.push(data.data.invite);
        state.currentUser.recievedNotifications.push(data.data.notification);
      }
    },
    SOCKET_pingMessage(state, data) {
      console.log(data);
      const contact = state.currentUserContacts.find(
        (contact) => contact.id == data.conversationId
      );
      contact.conversation.push(data);
    },
    SOCKET_chatMessage(state, data) {
      const contact = state.currentUserContacts.find(
        (contact) => contact.id == data.conversationId
      );
      contact.conversation.push(data);
    },
    SOCKET_userLogout(state, message) {
      // console.log(state.currentUserContacts, message);
      const user = state.userDirectory.find(
        (user) => user.uuid == message.uuid
      );
      user.isOnline = false;
      user.lastSeen = message.lastSeen;
      user.currentSocketId = message.currentSocketId;
      console.log({ user, message });
      if (state.currentUserContacts) {
        state.currentUserContacts.forEach((contact) => {
          if (contact.inviter.uuid == message.uuid) {
            console.log('Is Inviter', contact.inviter);
            contact.inviter.isOnline = false;
            contact.inviter.lastSeen = message.lastSeen;
            contact.inviter.currentSocketId = null;
          }
          if (contact.invitee.uuid == message.uuid) {
            console.log('Is Invitee', contact.invitee);
            contact.invitee.isOnline = false;
            contact.invitee.lastSeen = message.lastSeen;
            contact.invitee.currentSocketId = null;
          }
        });
      }
    },
    addInviteToContacts(state, payload) {
      state.currentUserContacts.push(payload.contact);
    },

    deleteInvite(state, payload) {
      state.currentUserContacts.splice(
        state.currentUserContacts.findIndex(
          (contact) => contact.id === payload.contactId
        ),
        1
      );

      // // get index of contact with id in payload
      // const removeIndex = state.currentUserContacts
      //   .map((contact) => {
      //     contact.id;
      //   })
      //   .indexOf(payload.contactId);

      // // remove contact
      // state.currentUserContacts.splice(removeIndex, 1);
    },
    setLoading(state, payload) {
      state.loading = payload.loading;
    },
    setNotificationHasBeenRead(state, payload) {
      const notifToUpdate = state.currentUser.recievedNotifications.find(
        (notification) => notification.id == payload.notificationId
      );
      notifToUpdate.hasBeenRead = true;
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
    updateContactInviteStatus(state, payload) {
      state.currentUserContacts.forEach((contact) => {
        if (contact.uuid == payload.invite.uuid) {
          payload.invite.hasBeenAccepted
            ? (contact.hasBeenAccepted = payload.invite.hasBeenAccepted)
            : false;
          payload.invite.hasBeenDelivered
            ? (contact.hasBeenDelivered = payload.invite.hasBeenDelivered)
            : false;
          payload.invite.isBlocked
            ? (contact.isBlocked = payload.invite.isBlocked)
            : false;
        }
      });
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
    showNToast(state, payload) {
      for (const key in payload) {
        state.ntoast[key] = payload[key];
      }
      // state.toast.icon = state.toast.icons[payload.sclass];
      state.ntoast.icon = state.ntoast.icons[payload.nclass];
      state.ntoast.color = state.ntoast.colors[payload.nclass];
      state.ntoast.show = true;
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
    SOCKET_connected({ state }, message) {
      if (state.currentUser) {
        console.log('User is logged in');
        state.currentUser.currentSocketId = message;
        this._vm.$socket.emit('login', {
          user: state.currentUser,
          socketId: message,
        });
      } else {
        console.log('Not logged In ');
      }
      console.log({ state, message });
    },
    SOCKET_CONNECT({ commit }) {
      console.log('socket disconnected');
      commit('SOCKET_CONNECT');
    },
    SOCKET_NEWLOGIN({ commit }, payload) {
      console.log(payload, { commit });
    },
    openDialogReadContactMessages({ commit }, payload) {
      commit('openDialogReadContactMessages', payload);
    },
    async getSingleListingDetails({ state }, payload) {
      const res = await fetch(
        `${config.serverURL}/listings/listing/${payload.listinguuid}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      console.log({ data, res, state });
      return data;
    },
    async getAllUsers({ commit }) {
      const res = await fetch(`${config.serverURL}/users`);
      const data = await res.json();
      commit('setUserDirectory', data.users);
    },
    async getContactMessages({ state }, payload) {
      const res = await fetch(
        `${config.serverURL}/chat/contacts/${payload.contactId}/messages`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${state.currentUser.token}`,
          },
        }
      );
      const data = await res.json();
      // console.log({ data, res, commit });
      return data.messages;
    },
    async markAllAsRead({ commit, state }) {
      const res = fetch(`${config.serverURL}/notifications/user/recieved`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${state.currentUser.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.success) {
        commit('markAllAsRead');
      }
    },
    async clearAllNotifications({ commit, state }) {
      const res = fetch(`${config.serverURL}/user/recieved`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${state.currentUser.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.success) {
        commit('clearAllNotitifications');
      }
    },
    async setNotificationHasBeenRead({ commit, state }, payload) {
      const updateData = [];
      const updateObject = { name: 'hasBeenRead', value: payload.hasBeenRead };
      updateData.push(updateObject);
      const res = await fetch(
        `${config.serverURL}/notifications/notification/${payload.notificationId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${state.currentUser.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        }
      );
      const data = await res.json();
      console.log(data, commit);
      if (data.success) {
        commit('setNotificationHasBeenRead', payload);
      }
    },
    async sendInviteResponse({ commit, state }, payload) {
      const { contactId, response } = payload;
      const updateData = [];
      let updateObject;
      if (response) {
        updateObject = [
          { name: 'hasBeenAccepted', value: true },
          { name: 'hasBeenDeclined', value: false },
        ];
      } else {
        updateObject = [
          { name: 'hasBeenDeclined', value: true },
          { name: 'hasBeenAccepted', value: false },
        ];
      }
      updateData.push(...updateObject);
      const res = await fetch(`${config.serverURL}/chat/invites/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${state.currentUser.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      const data = await res.json();
      // console.log(data, res);
      this._vm.$socket.emit('inviteResponse', {
        data,
        socketId: payload.chattee.currentSocketId,
      });
      commit('updateContactInviteStatus', data);
      return data;
    },
    async sendListingInviteToUser({ state }, payload) {
      const res = await fetch(
        `${config.serverURL}/notifications/users/${payload.invitee.id}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${state.currentUser.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload.inviteDetails),
        }
      );
      const data = await res.json();
      console.log(data, res);
      this._vm.$socket.emit('sendListingInvite', {
        data,
        socketId: data.notification.reciever.currentSocketId,
      });
      return data;
    },
    async sendChatInviteToUser({ commit, state }, payload) {
      console.log(payload);
      console.log(commit, state);
      const res = await fetch(
        `${config.serverURL}/chat/invites/${payload.id}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${state.currentUser.token}`,
            'Accept': 'application/json',
            'Content-type': 'application/json',
          },
        }
      );
      const data = await res.json();
      console.log(data, res);
      if (data.success) {
        commit('addInviteToContacts', { contact: data.invite });
        this._vm.$socket.emit('sendChatInvite', {
          data,
        });
      }

      return data;
    },
    async sendChatMessage({ commit, state }, payload) {
      const {
        messageText,
        senderId,
        recieverId,
        conversationId,
        chattee,
      } = payload;
      console.log(payload);
      const res = await fetch(
        `${config.serverURL}/chat/contacts/${conversationId}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${state.currentUser.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messageText,
            senderId,
            recieverId,
            conversationId,
          }),
        }
      );
      const data = await res.json();
      console.log({ data, res });
      commit('addContactMessage', data.messageContent);
      this._vm.$socket.emit('chatMessage', {
        message: data.messageContent,
        chattee,
      });
      // return data.messageContent;
    },

    async pingInvitee({ commit, state }, payload) {
      const res = await fetch(
        `${config.serverURL}/chat/contacts/${payload.contactId}/ping/${payload.inviteeId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${state.currentUser.token}`,
          },
        }
      );
      const data = await res.json();
      console.log({ data, res });
      console.log({ commit });
      return data;
    },
    async deleteInvite({ commit, state }, payload) {
      const res = await fetch(
        `${config.serverURL}/chat/invites/${payload.contactId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${state.currentUser.token}`,
          },
        }
      );
      const data = await res.json();
      console.log(data, res);
      commit('deleteInvite', payload);

      return { data };
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
        `${config.serverURL}/user/${state.currentUser?.username}/listings`,
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
    showNToast(
      { commit },
      {
        sender,
        message,
        nclass = 'like',
        timeout = 2000,
        imgUrl = 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      }
    ) {
      return new Promise((resolve) => {
        commit('showNToast', { message, timeout, imgUrl, nclass, sender });
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
    userDirectory(state) {
      return state.userDirectory;
    },
    currentUserListings(state) {
      return state.currentUserListings;
    },
    currentUserContacts(state) {
      return state.currentUserContacts;
    },
    getContactConversationById: (state) => (id) => {
      const contact = state.currentUserContacts.find(
        (contact) => contact.id == id
      );
      return contact.conversation;
    },
    toast(state) {
      return state.toast;
    },
    ntoast(state) {
      return state.ntoast;
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
    unreadMessageCount(state) {
      if (state.currentUserContacts.length > 0) {
        const messageCount = state.currentUserContacts.map((contact) => {
          return contact.conversation.filter((message) => {
            return (
              !message.hasBeenRead && message.senderId != state.currentUser.id
            );
          });
        });
        console.log(messageCount.flat());
        return messageCount.flat().length;
      } else {
        return 0;
      }
    },
    recievedNotifications(state) {
      if (state.currentUser) {
        return state.currentUser.recievedNotifications;
      } else {
        return [];
      }
    },
    listingInCreation(state) {
      return state.listingInCreation;
    },
  },
  modules: {},
});
