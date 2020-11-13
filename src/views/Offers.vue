<template>
  <div class="offers" style="margin-bottom: 70px;">
    <v-container>
      <p class=" d-flex align-center display-1 mt-4 mb-2 font-weight-light">
        Roommates &middot;
        <span class="font-weight-bold primary--text"
          ><v-icon>mdi-map-marker</v-icon> Abuja</span
        >
      </p>
      <v-divider></v-divider>
      <v-row>
        <v-col v-for="(n, i) in showComments" :key="i" cols="12">
          <Offer />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import MenuModal from '../components/modals/MenuModal';
import Offer from '../components/blocks/Offer';
export default {
  components: {
    // MenuModal,
    Offer,
  },
  data() {
    return {
      showComments: [],
      offers: 12,
    };
  },
  methods: {
    displayComments(i, n) {
      console.log(i);
      n.show = !n.show;
      console.log(this.showComments);
    },
  },
  mounted() {
    this.showComments = [];
    for (let i = 0; i < this.offers; i++) {
      let offer = { show: false, number: Math.random(), i };
      this.showComments.push(offer);
    }
    console.log(this.showComments);
  },
};
</script>

<style></style>
