<template>
  <div class="manage-listings">
    <v-container>
      <CreateListingModal />
    </v-container>
  </div>
</template>

<script>
import CreateListingModal from '../components/modals/CreateListingModal';
export default {
  components: {
    CreateListingModal,
  },
};
</script>

<style></style>
