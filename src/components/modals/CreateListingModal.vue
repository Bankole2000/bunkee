<template>
  <div class="create-listing-modal">
    <v-dialog
      v-model="dialog"
      fullscreen
      scrollable
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-card
          class="transparent text-center"
          elevation="0"
          v-bind="attrs"
          v-on="on"
        >
          <v-card-text style="border: 5px dashed grey;">
            <v-icon size="120">mdi-plus</v-icon>
            <p class="display-1">Add a listing</p>
          </v-card-text>
        </v-card>
      </template>
      <v-card>
        <v-card-title class="pt-3">
          <v-btn icon @click="dialog = false" class="mr-2">
            <v-icon>mdi-arrow-left</v-icon> </v-btn
          ><span>Add a listing</span> <v-spacer></v-spacer>
          <v-btn text icon large color="error" @click="dialog = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-4">
          <CreateListingForm ref="listingform"></CreateListingForm>
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
import CreateListingForm from '../forms/CreateListingForm';
export default {
  components: {
    CreateListingForm,
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
  computed: {
    canSave() {
      return true;
    },
  },
  beforeUpdate() {
    console.log(this);
  },
};
</script>

<style></style>
