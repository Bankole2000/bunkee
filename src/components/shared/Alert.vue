<template>
  <v-alert
    :value="alert.show"
    :color="alert.aclass"
    text
    :icon="alert.icons[alert.aclass]"
    dark
    transition="slide-y-transition"
    dense
  >
    {{ alert.message }}
  </v-alert>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Alert',
  computed: {
    ...mapGetters(['alert']),
  },
  methods: {
    ...mapActions(['hideAlert']),
  },
};
</script>

<style></style>
