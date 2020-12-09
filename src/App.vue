<template>
  <v-app>
    <Navbar v-if="!$vuetify.breakpoint.smAndDown" />
    <MobilePageTitle v-if="$vuetify.breakpoint.smAndDown" />
    <v-main>
      <transition name="router-anim">
        <router-view />
      </transition>
    </v-main>
    <BottomNav v-if="$vuetify.breakpoint.smAndDown" />
    <Snackbar />
    <NotifSnackbar />
    <Loader />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import Snackbar from './components/shared/Snackbar';
import NotifSnackbar from './components/shared/LargeSnackbar';
import Loader from './components/shared/Loader';
import Navbar from './components/shared/Navbar';
import BottomNav from './components/shared/BottomNav';
import MobilePageTitle from './components/shared/MobilePageTitle';
export default {
  name: 'App',

  components: {
    Snackbar,
    Loader,
    Navbar,
    NotifSnackbar,
    MobilePageTitle,
    BottomNav,
  },
  sockets: {
    // newLogin: function(data) {
    //   console.log(data);
    //   console.log(data.user);
    //   console.log(data.user.username);
    //   this.showToast({
    //     sclass: 'info',
    //     message: `<span class="font-weight-black amber--text">@${data.user.username}</span> just logged in`,
    //     timeout: 2000,
    //   });
    // },
  },

  data: () => ({
    //
  }),
  methods: {
    ...mapActions(['showToast', 'showLoader', 'hideLoader']),
    displayLoader() {
      this.showLoader({ lclass: 'info', message: 'Hello world' });
      setTimeout(() => {
        this.hideLoader();
      }, 2000);
    },
  },
};
</script>

<style>
.router-anim-enter-active {
  animation: coming 0.5s;
  animation-delay: 0.5s;
  opacity: 0;
}

.router-anim-leave-active {
  animation: going 0.4s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>
