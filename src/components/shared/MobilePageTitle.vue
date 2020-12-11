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
    <Notifications
      :key="componentKey"
      @readNotification="componentKey += 1"
      @openContactsModal="openContactsModal"
    />
    <ChatModal ref="contactsModal" />

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
    <audio
      ref="newNotification"
      :src="require('@/assets/audio/newNotification.mp3')"
    ></audio>
  </v-app-bar>
</template>

<script>
import MenuModal from '../modals/MenuModal';
import ChatModal from '../modals/ContactsModal';
import Notifications from '../modals/Notifications';
import { mapActions } from 'vuex';
export default {
  sockets: {
    recievedListingInvite: function(data) {
      if (this.isMounted) {
        this.componentKey += 1;
        console.log(data);
        if (this.$refs.newNotification) {
          this.$refs.newNotification.volume = 0.3;
          this.$refs.newNotification.play();
        }
        this.showNToast({
          nclass: `${data.data.notification.notificationType}`,
          message: data.data.notification.notificationText,
          sender: data.data.notification.sender.username,
          imgUrl: data.data.notification.sender.profileImageUrl,
        });
      }
    },
    recievedChatInvite: function(data) {
      if (this.isMounted) {
        this.componentKey += 1;
        console.log(data);
        if (this.$refs.newNotification) {
          this.$refs.newNotification.volume = 0.3;
          this.$refs.newNotification.play();
        }
        this.showNToast({
          nclass: `${data.data.notification.notificationType}`,
          message: data.data.notification.notificationText,
          sender: data.data.notification.sender.username,
          imgUrl: data.data.notification.sender.profileImageUrl,
        });
      }
    },
    inviteResponse: function(data) {
      if (this.isMounted) {
        console.log(data);
        this.componentKey += 1;
        if (this.$refs.newNotification) {
          this.$refs.newNotification.volume = 0.3;
          this.$refs.newNotification.play();
        }
        this.showNToast({
          nclass: `${data.data.notification.notificationType}`,
          message: data.data.notification.notificationText,
          sender: data.data.notification.sender.username,
          imgUrl: data.data.notification.sender.profileImageUrl,
        });
      }
      // this.showNToast({ntclass: "chat", message: 'Sent you a Chat invite', })
    },
  },
  components: {
    ChatModal,
    MenuModal,
    Notifications,
  },
  data() {
    return {
      isMounted: false,
      dialog: false,
      pageRegex: '',
      pages: [
        {
          title: '',
          route: '',
        },
      ],
      componentKey: 0,
    };
  },
  computed: {
    // ...mapGetters(['loggedInUser']),
    showPage() {
      return this.$route.name == 'Verify' ||
        this.$route.name == 'Profile' ||
        this.$route.name == 'Listing Details'
        ? true
        : false;
    },
  },
  methods: {
    ...mapActions(['showNToast']),
    openContactsModal() {
      console.log(this.$refs);
      this.$refs.contactsModal.show();
    },
  },
  mounted() {
    this.isMounted = true;
  },
  beforeDestroy() {
    this.isMounted = false;
  },
};
</script>

<style></style>
