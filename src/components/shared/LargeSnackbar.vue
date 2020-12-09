<template>
  <v-snackbar
    :max-width="$vuetify.breakpoint.width"
    v-model="ntoast.show"
    multi-line
    color="white"
    :bottom="!$vuetify.breakpoint.smAndDown"
    :top="$vuetify.breakpoint.smAndDown"
    :center="$vuetify.breakpoint.smAndDown"
    :left="!$vuetify.breakpoint.smAndDown"
    transition="slide-x-transition"
    rounded="pill"
    :timeout="ntoast.timeout"
  >
    <v-list three-line class="pa-0 white">
      <!-- <v-subheader>New Notification</v-subheader> -->
      <v-list-item class="pa-0">
        <v-badge
          overlap
          bordered
          light
          bottom
          :icon="ntoast.icon"
          offset-x="30"
          offset-y="30"
          :color="ntoast.color"
        >
          <v-list-item-avatar size="48">
            <v-img :src="ntoast.imgUrl"></v-img>
          </v-list-item-avatar>
        </v-badge>
        <v-list-item-content class="black--text">
          <!-- v-html="ntoast.message" -->
          <v-list-item-title class="text-h6 mb-0 black--text"
            >@{{ ntoast.sender || 'TestUser' }}</v-list-item-title
          >
          <v-list-item-subtitle class="subtitle-1 grey--text text--darken-3"
            >{{ ntoast.message }}
          </v-list-item-subtitle>
          <!-- <p v-html="ntoast.message" class="mb-0"></p> -->
        </v-list-item-content>
        <!-- <v-list-item-icon> -->
        <!-- <v-btn dark text icon large :color="ntoast.color"> -->
        <!-- <v-icon :color="ntoast.color">{{ ntoast.icon }}</v-icon> -->
        <!-- </v-btn> -->
        <!-- </v-list-item-icon> -->
      </v-list-item>
    </v-list>
    <!-- {{ ntoast.message }} -->
    <!-- @click="ntoast.show = false" -->

    <template v-slot:action="{ attrs }">
      <v-btn
        dark
        text
        icon
        large
        v-bind="attrs"
        :color="ntoast.color"
        class="mr-4"
      >
        <v-icon>{{ ntoast.icon }}</v-icon>
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
    ...mapGetters(['ntoast']),
  },
  methods: {},
};
</script>

<style></style>
