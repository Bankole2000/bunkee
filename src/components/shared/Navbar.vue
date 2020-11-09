<template>
  <div class="navbar">
    <v-app-bar height="70" app color="white" elevate-on-scroll>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
      ></v-app-bar-nav-icon>

      <a :href="config.appURL" class="text-decoration-none black--text">
        <v-toolbar-title
          class=""
          :class="{ 'ml-8 mr-16 pr-16': $vuetify.breakpoint.mdAndUp }"
          >{{ config.appName }}</v-toolbar-title
        >
      </a>

      <v-spacer></v-spacer>
      <v-btn
        to="/listings"
        text
        class="text-capitalize"
        v-if="$vuetify.breakpoint.mdAndUp"
        >Places to Stay</v-btn
      >
      <v-btn
        to="/rentals"
        text
        class="text-capitalize"
        v-if="$vuetify.breakpoint.mdAndUp"
        >Places to Rent</v-btn
      >
      <v-btn
        to="/coops"
        text
        class="text-capitalize"
        v-if="$vuetify.breakpoint.mdAndUp"
        >Join A Cooperative</v-btn
      >

      <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
      <v-btn text class="text-capitalize" v-if="$vuetify.breakpoint.mdAndUp"
        >Become A Host</v-btn
      >
      <v-btn
        v-if="$route.path != '/login' && $route.path != '/signup'"
        icon
        @click="searching = !searching"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        v-model="userMenu"
        bottom
        right
        transition="slide-x-transition"
        offset-y
        origin="top left"
        :close-on-content-click="false"
        :close-on-click="false"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            text
            class="mx-2 rounded-xl"
            v-on="on"
            outlined
            v-if="$route.path != '/login' && $route.path != '/signup'"
          >
            <v-icon size="24" left>mdi-menu</v-icon>

            <v-icon color="grey" size="32" right>mdi-account-circle</v-icon>
          </v-btn>
          <!-- <v-chip pill class="transparent" v-on="on">
            <v-avatar left>
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-avatar>
            <span v-if="$vuetify.breakpoint.smAndUp">@username</span>
          </v-chip> -->
        </template>
        <v-card width="300">
          <v-list
            dark
            v-if="loggedInUser"
            :to="`/profile/${loggedInUser.username}`"
          >
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="loggedInUser.profileImageUrl"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  >@{{ loggedInUser.username }}</v-list-item-title
                >
                <v-list-item-subtitle>{{
                  loggedInUser.email
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="userMenu = false">
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-list>
            <!-- <v-list-item @click="() => {}">
              <v-list-item-action>
                <v-icon>mdi-briefcase</v-icon>
              </v-list-item-action>
              <v-list-item-subtitle>john@gmail.com</v-list-item-subtitle>
            </v-list-item> -->
            <v-list-item v-if="!loggedInUser" @click="showSignupModal = true">
              <v-list-item-action>
                <v-icon>mdi-account-plus</v-icon>
              </v-list-item-action>
              <v-list-item-subtitle>Sign up</v-list-item-subtitle>
            </v-list-item>
            <v-list-item v-if="!loggedInUser" @click="showLoginModal = true">
              <v-list-item-action>
                <v-icon>mdi-login</v-icon>
              </v-list-item-action>
              <v-list-item-subtitle>Login</v-list-item-subtitle>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item to="/listings">
              <v-list-item-action>
                <v-icon>mdi-magnify</v-icon>
              </v-list-item-action>
              <v-list-item-subtitle>Find a Place</v-list-item-subtitle>
            </v-list-item>
            <v-list-item @click="() => {}">
              <v-list-item-action>
                <v-icon>mdi-home-account</v-icon>
              </v-list-item-action>
              <v-list-item-subtitle>Host a Place</v-list-item-subtitle>
            </v-list-item>
            <v-list-item to="/offers">
              <v-list-item-action>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-action>
              <v-list-item-subtitle>Find a Co-Tenant</v-list-item-subtitle>
            </v-list-item>
            <v-list-item to="/rentals">
              <v-list-item-action>
                <v-icon>mdi-home-city</v-icon>
              </v-list-item-action>
              <v-list-item-subtitle>Rent a Place</v-list-item-subtitle>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="() => {}">
              <v-list-item-action>
                <v-icon>mdi-image-filter-hdr</v-icon>
              </v-list-item-action>
              <v-list-item-subtitle>Join a Cooperative</v-list-item-subtitle>
            </v-list-item>
            <v-list-item @click="() => {}">
              <v-list-item-action>
                <v-icon>mdi-help-circle</v-icon>
              </v-list-item-action>
              <v-list-item-subtitle>Help & FAQs</v-list-item-subtitle>
            </v-list-item>
            <v-list-item @click="() => {}">
              <v-list-item-action>
                <v-icon>mdi-face-agent</v-icon>
              </v-list-item-action>
              <v-list-item-subtitle>Support</v-list-item-subtitle>
            </v-list-item>
            <v-list-item to="/about">
              <v-list-item-action>
                <v-icon>mdi-alert-box-outline</v-icon>
              </v-list-item-action>
              <v-list-item-subtitle>About</v-list-item-subtitle>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions v-if="loggedInUser">
            <v-btn @click="logout" block dark
              ><v-icon left>mdi-logout</v-icon> Logout</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-menu>

      <!-- <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
      <template v-slot:extension v-if="searching">
        <v-tabs align-with-title>
          <v-tab>Tab 1</v-tab>
          <v-tab>Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <LoginModal :show="showLoginModal" @closeModal="showLoginModal = false" />
    <SignupModal
      :show="showSignupModal"
      @closeModal="showSignupModal = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { config } from '../helpers/config';
import LoginModal from '../modals/LoginModal';
import SignupModal from '../modals/SignupModal';
export default {
  components: {
    LoginModal,
    SignupModal,
  },
  data() {
    return {
      config,
      searching: false,
      userMenu: false,
      showLoginModal: false,
      showSignupModal: false,
    };
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  methods: {
    ...mapActions(['logOut', 'showToast']),
    logout() {
      this.logOut();
      this.showToast({
        sclass: 'info',
        message: 'Logged Out',
      });
    },
  },
  mounted() {
    console.log(this.$route);
  },
};
</script>

<style scoped></style>
