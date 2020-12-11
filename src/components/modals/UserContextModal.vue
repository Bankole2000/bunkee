<template>
  <v-list-item class="pl-2">
    <v-menu
      bottom
      right
      v-model="menu"
      transition="scale-transition"
      :close-on-content-click="false"
      :close-on-click="true"
    >
      <template v-slot:activator="{ on }">
        <v-list-item-avatar class="mx-2" size="48" v-on="on">
          <v-img :src="user.profileImageUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content v-on="on">
          <v-list-item-title class="font-weight-medium"
            >@{{ user.username }}
            <span
              :class="
                user.isOnline ? 'primary--text' : 'grey--text text--lighten-1'
              "
              class="caption"
            >
              &middot; {{ user.isOnline ? 'Online' : `Last Seen ` }}
              <span v-if="!user.isOnline">{{
                user.lastSeen | moment('from')
              }}</span></span
            >
          </v-list-item-title>
          <v-list-item-subtitle
            >Some details could be here or whatever, lol
          </v-list-item-subtitle>
        </v-list-item-content>
      </template>
      <v-card>
        <v-list dark>
          <v-list-item>
            <v-list-item-avatar size="48">
              <v-img :src="user.profileImageUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ user.firstname }}</v-list-item-title>
              <v-list-item-subtitle>@{{ user.username }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="menu = false">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-list dense>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-action>
            <v-list-item-subtitle>
              Joined
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item @click="() => {}">
            <v-list-item-action>
              <v-icon>mdi-shield-account</v-icon>
            </v-list-item-action>
            <v-list-item-subtitle>Verified Identity</v-list-item-subtitle>
          </v-list-item>
          <v-list-item @click="() => {}">
            <v-list-item-action>
              <v-icon>mdi-shield-home-outline</v-icon>
            </v-list-item-action>
            <v-list-item-subtitle
              >Verified Real Estate Agent</v-list-item-subtitle
            >
          </v-list-item>
        </v-list>
        <v-alert type="warning" text v-if="!loggedInUser">
          You must be Logged in to connect with a user
        </v-alert>

        <v-card-actions class="d-flex justify-space-around">
          <InviteToListingModal :userToInvite="user" />
          <v-btn
            :loading="loadingChatInvite"
            @click="sendChatInvite(user)"
            :disabled="!loggedInUser"
            color="accent"
            class="px-4"
            ><v-icon left>mdi-forum</v-icon> Chat</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-menu>

    <v-list-item-action>
      <v-btn icon><v-icon>mdi-close</v-icon></v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import InviteToListingModal from './InviteToListingModal';
export default {
  props: ['user'],
  components: {
    InviteToListingModal,
  },
  data() {
    return {
      menu: false,
      buttonsBusy: false,
      loadingChatInvite: false,
    };
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  methods: {
    ...mapActions(['showToast', 'sendChatInviteToUser']),
    sendChatInvite(user) {
      this.buttonsBusy = true;
      this.loadingChatInvite = true;
      if (this.loggedInUser) {
        this.sendChatInviteToUser(user).then((result) => {
          if (result.success) {
            this.showToast({
              sclass: 'success',
              message: result.message,
              timeout: 2000,
            });
          } else {
            this.showToast({
              sclass: 'error',
              message: result.message,
              timeout: 2000,
            });
          }
          this.buttonsBusy = false;
          this.loadingChatInvite = false;
        });
      } else {
        this.showToast({
          sclass: 'error',
          message: 'Please signup / Login',
          timeout: 1500,
        });
      }
    },
  },
};
</script>

<style></style>
