<template>
  <div class="chat-context-modal">
    <v-menu
      v-model="menu"
      bottom
      :offset-x="false"
      :offset-y="false"
      left
      transition="scale-transition"
      origin="top right"
      :close-on-content-click="false"
      :close-on-click="true"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
      </template>
      <v-card width="300">
        <v-list dark>
          <v-list-item>
            <v-list-item-avatar>
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
        <v-list>
          <v-list-item @click="() => {}">
            <v-list-item-action>
              <v-icon>mdi-bell-ring</v-icon>
            </v-list-item-action>
            <v-list-item-subtitle
              >Ping
              <span class="primary--text font-weight-black"
                >@{{ user.username }}</span
              ></v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item @click="() => {}">
            <v-list-item-action>
              <v-icon>mdi-cancel</v-icon>
            </v-list-item-action>
            <v-list-item-subtitle
              >Block
              <span class="primary--text font-weight-black"
                >@{{ user.username }}</span
              ></v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item @click="() => {}">
            <v-list-item-action>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-action>
            <v-list-item-subtitle
              >View
              <span class="primary--text font-weight-black"
                >@{{ user.username }}</span
              >'s Profile</v-list-item-subtitle
            >
          </v-list-item>
        </v-list>
        <v-card-actions>
          <InviteToListingModal :userToInvite="user" />
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import InviteToListingModal from './InviteToListingModal';

export default {
  components: {
    InviteToListingModal,
  },
  props: ['contact', 'user'],
  data() {
    return {
      menu: false,
    };
  },
  methods: {},
  computed: {},
};
</script>

<style></style>
