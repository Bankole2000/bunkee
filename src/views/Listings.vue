<template>
  <div class="listings">
    <v-container>
      <p class="display-1 mt-4 mb-2 font-weight-light">
        Listings in <span class="font-weight-bold primary--text">Abuja</span>
      </p>
      <v-divider></v-divider>
      <v-row class="mt-2 d-flex justify-start text-center mx-auto">
        <v-chip small class="ma-2"
          ><v-icon size="12" left>mdi-map-marker</v-icon> Abuja</v-chip
        >
        <v-chip small class="ma-2">
          <v-icon size="12" left>mdi-air-filter</v-icon>
          Air Conditioning
        </v-chip>
        <v-chip small class="ma-2">
          <v-icon size="12" left>mdi-lightbulb-on</v-icon>
          24hr UPS
        </v-chip>
        <v-chip small class="ma-2">
          <v-icon size="12" left>mdi-cash-multiple</v-icon>
          &lt; 10k / mth
        </v-chip>
        <v-chip small class="ma-2">
          <v-icon size="12" left>mdi-shower</v-icon>
          Bathroom
        </v-chip>
        <v-chip small class="ma-2">
          <v-icon size="12" left>mdi-water-pump</v-icon>
          Tap water
        </v-chip>
      </v-row>

      <v-row>
        <v-col v-for="n in number" :key="n" cols="12" sm="6">
          <Listing />
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
import Listing from '../components/blocks/Listing';
export default {
  components: {
    Listing,
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
