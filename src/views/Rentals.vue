<template>
  <div class="rentals">
    <v-container>
      <p class=" d-flex align-center display-1 mt-4 mb-2 font-weight-light">
        Rentals &middot;
        <span class="font-weight-bold primary--text"
          ><v-icon>mdi-map-marker</v-icon> Abuja</span
        >
      </p>
      <v-divider></v-divider>
      <v-row>
        <v-col v-for="n in number" :key="n" cols="12" sm="6">
          <Rental />
        </v-col>
      </v-row>
      <v-row style="margin-bottom: 80px;">
        <v-col cols="12"
          ><v-btn
            :loading="fetchingMore"
            :disabled="fetchingMore"
            @click="addMore"
            x-large
            block
            color="primary"
          >
            Show More <v-icon right>mdi-dots-horizontal</v-icon></v-btn
          ></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import MenuModal from '../components/modals/MenuModal';
import Rental from '../components/blocks/Rental';
export default {
  components: {
    // MenuModal,
    Rental,
  },
  data() {
    return {
      number: 6,
      menu: null,
      fetchingMore: false,
      page: 1,
      colors: [
        'green',
        'secondary',
        'yellow darken-4',
        'red lighten-2',
        'orange darken-1',
      ],
      cycle: false,
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    };
  },
  methods: {
    addMore() {
      this.fetchingMore = true;
      setTimeout(() => {
        this.number += 6;
        this.fetchingMore = false;
      }, 2000);
    },
  },
};
</script>

<style></style>
