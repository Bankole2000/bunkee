<template>
  <div class="manage-listings">
    <v-container>
      <v-row>
        <v-col
          v-for="(eachListing, i) in currentUserListings"
          :key="i"
          cols="12"
          sm="6"
        >
          <Listing :listing="eachListing" />
        </v-col>
        <v-col cols="12" sm="6">
          <CreateListingModal />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CreateListingModal from '../components/modals/CreateListingModal';
import Listing from '../components/blocks/OwnListing';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    CreateListingModal,
    Listing,
  },
  data() {
    return {
      listings: null,
    };
  },
  methods: {
    ...mapActions(['getCurrentUserListings']),
  },
  computed: {
    ...mapGetters(['currentUserListings']),
    ownListings() {
      return this.currentUserListings;
    },
  },
  created() {
    this.getCurrentUserListings().then(() => {
      this.listings = this.$store.getters.currentUserListings;
    });
  },
};
</script>

<style></style>
