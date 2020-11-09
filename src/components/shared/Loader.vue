<template>
  <v-dialog v-model="loader.show" persistent width="300">
    <v-card :color="loader.lclass" dark>
      <v-card-text>
        {{ loader.message }}
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['loader']),
  },
};
</script>

<style></style>
