<template>
  <v-bottom-navigation fixed :value="activeBtn" color="primary" height="70">
    <v-btn to="/listings">
      <span>Places</span>
      <v-icon size="32">mdi-home-account</v-icon>
    </v-btn>
    <v-btn to="/offers">
      <span>People</span>
      <v-icon size="32">mdi-account-group</v-icon>
    </v-btn>

    <v-btn to="/rentals">
      <span>Rentals</span>
      <v-icon size="32">mdi-home-city</v-icon>
    </v-btn>
    <v-btn to="/coops">
      <span>Co-ops</span>
      <v-icon size="32">mdi-image-filter-hdr</v-icon>
    </v-btn>
    <v-btn to="/login" v-if="!loggedInUser">
      <span>Log In</span>
      <v-icon size="32">mdi-account-circle</v-icon>
    </v-btn>
    <v-btn :to="`/profile/${loggedInUser.username}`" v-if="loggedInUser">
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
    };
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
};
</script>

<style></style>
