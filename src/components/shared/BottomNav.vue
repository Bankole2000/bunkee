<template>
  <v-bottom-navigation fixed :value="activeBtn" color="primary" height="70">
    <v-btn
      to="/listings"
      small
      :class="$vuetify.breakpoint.width <= minDeviceWidth ? 'px-1' : 'px-4'"
    >
      <span>Places</span>
      <v-icon :size="$vuetify.breakpoint.width <= minDeviceWidth ? '24' : '32'"
        >mdi-home-account</v-icon
      >
    </v-btn>
    <v-btn
      to="/offers"
      small
      :class="$vuetify.breakpoint.width <= minDeviceWidth ? 'px-1' : 'px-4'"
    >
      <span>People</span>
      <v-icon :size="$vuetify.breakpoint.width <= minDeviceWidth ? '24' : '32'"
        >mdi-account-group</v-icon
      >
    </v-btn>

    <v-btn
      to="/rentals"
      small
      :class="$vuetify.breakpoint.width <= minDeviceWidth ? 'px-1' : 'px-4'"
    >
      <span>Rentals</span>
      <v-icon :size="$vuetify.breakpoint.width <= minDeviceWidth ? '24' : '32'"
        >mdi-home-city</v-icon
      >
    </v-btn>
    <v-btn
      to="/coops"
      small
      :class="$vuetify.breakpoint.width <= minDeviceWidth ? 'px-1' : 'px-4'"
    >
      <span>Co-ops</span>
      <v-icon :size="$vuetify.breakpoint.width <= minDeviceWidth ? '24' : '32'"
        >mdi-image-filter-hdr</v-icon
      >
    </v-btn>
    <v-btn
      to="/login"
      v-if="!loggedInUser"
      small
      :class="$vuetify.breakpoint.width <= minDeviceWidth ? 'px-1' : 'px-4'"
    >
      <span>Log In</span>
      <v-icon :size="$vuetify.breakpoint.width <= minDeviceWidth ? '24' : '32'"
        >mdi-account-circle</v-icon
      >
    </v-btn>
    <v-btn
      :to="`/profile/${loggedInUser.username}`"
      v-if="loggedInUser"
      small
      :class="$vuetify.breakpoint.width <= minDeviceWidth ? 'px-1' : 'px-4'"
    >
      <span>Profile</span>
      <v-avatar size="34">
        <v-img :src="loggedInUser.profileImageUrl"></v-img>
      </v-avatar>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      activeBtn: null,
      minDeviceWidth: 373,
    };
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
};
</script>

<style></style>
