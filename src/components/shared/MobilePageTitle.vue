<template>
  <v-app-bar
    app
    color="#6A76AB"
    dark
    shrink-on-scroll
    prominent
    src="https://picsum.photos/1920/1080?random"
    fade-img-on-scroll
    v-if="!['/login', '/signup'].includes($route.path) && !showPage"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
      ></v-img>
    </template>
    <!-- <v-btn
      text
      class=" rounded-xl"
      outlined
      v-if="$route.path != '/login' && $route.path != '/signup'"
    >
      <v-icon left>mdi-menu</v-icon>

      <v-icon color="grey" right>mdi-account-circle</v-icon>
    </v-btn> -->
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title class="pl-0">{{ $route.name }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- <v-badge bordered overlap dot offset-x="20" offset-y="20">
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-badge> -->
    <Notifications />
    <ChatModal />

    <MenuModal />

    <template v-slot:extension>
      <v-text-field
        align-with-title
        light
        solo
        prepend-inner-icon="mdi-magnify"
        append-icon="mdi-filter-variant"
        label="Search by City or State"
        class="rounded-xl mt-4"
      >
      </v-text-field>
    </template>
  </v-app-bar>
</template>

<script>
import MenuModal from '../modals/MenuModal';
import ChatModal from '../modals/MobileChatModal';
import Notifications from '../modals/Notifications';
export default {
  components: {
    ChatModal,
    MenuModal,
    Notifications,
  },
  data() {
    return {
      dialog: false,
      pageRegex: '',
      pages: [
        {
          title: '',
          route: '',
        },
      ],
    };
  },
  computed: {
    showPage() {
      return this.$route.name == 'Verify' || this.$route.name == 'Profile'
        ? true
        : false;
    },
  },
};
</script>

<style></style>
