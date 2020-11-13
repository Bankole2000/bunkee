<template>
  <v-snackbar
    v-model="toast.show"
    :top="$vuetify.breakpoint.smAndDown"
    :bottom="!$vuetify.breakpoint.smAndDown"
    :right="!$vuetify.breakpoint.smAndDown"
    :timeout="toast.timeout"
  >
    {{ toast.message }}

    <template v-slot:action="{ attrs }">
      <v-btn dark text v-bind="attrs" :color="toast.sclass">
        <!-- @click="toast.show = false" -->
        <v-icon left>{{ toast.icon }}</v-icon> &nbsp; Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['toast']),
  },
  methods: {},
};
</script>

<style></style>
