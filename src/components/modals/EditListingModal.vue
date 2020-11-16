<template>
  <div class="create-listing-modal">
    <v-btn
      fab
      small
      dark
      color="primary"
      :disabled="loading"
      :loading="loading"
      class="mt-4 mr-3"
      @click="showModal"
    >
      <v-icon size="32">
        mdi-pencil
      </v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      fullscreen
      scrollable
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title class="pt-3">
          <v-btn icon @click="dialog = false" class="mr-2">
            <v-icon>mdi-arrow-left</v-icon> </v-btn
          ><span>Edit listing</span> <v-spacer></v-spacer>
          <v-btn text icon large color="error" @click="dialog = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-4">
          <EditListingForm :listingData="listingData" ref="editListingForm" />
        </v-card-text>
        <v-divider style="z-index: 1;"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn large width="40%" text color="error"
            ><v-icon>mdi-close</v-icon> Cancel</v-btn
          >
          <v-btn
            large
            width="40%"
            color="primary"
            :disabled="canSave"
            class="px-4"
            ><v-icon left>mdi-content-save</v-icon> Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import EditListingForm from '../forms/EditListingForm';
import { mapActions, mapGetters } from 'vuex';
export default {
  props: ['listingData'],
  components: {
    EditListingForm,
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
  methods: {
    ...mapActions([
      'updateListingInCreation',
      'getListingInCreation',
      'setLoading',
    ]),
    showModal() {
      this.getListingInCreation({ listingId: this.listingData.id });
      this.setLoading({ loading: true });

      setTimeout(() => {
        this.dialog = true;
        this.setLoading({ loading: false });
      }, 1500);
    },
  },
  computed: {
    ...mapGetters(['loading']),
    canSave() {
      return true;
    },
  },
};
</script>

<style></style>
