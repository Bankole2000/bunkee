<template>
  <div class="places-around">
    <v-row class="py-8 d-flex justify-center">
      <v-col
        v-for="(item, i) in items"
        :key="i"
        cols="12"
        lg="3"
        md="4"
        sm="6"
        class="justify-center"
      >
        <v-card color="transparent" elevation="0" class="d-flex justify-center">
          <div class="d-flex flex-no-wrap align-center">
            <v-avatar class="rounded-lg" size="80" tile>
              <v-img :src="item.src"></v-img>
            </v-avatar>
            <div>
              <v-card-title class="text-h6" v-text="item.title"></v-card-title>

              <v-card-subtitle v-text="item.artist"></v-card-subtitle>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People',
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        artist: 'Ellie Goulding',
      },
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People',
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        artist: 'Ellie Goulding',
      },
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People',
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        artist: 'Ellie Goulding',
      },
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People',
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        artist: 'Ellie Goulding',
      },
    ],
  }),
  // computed: {
  //   filteredItems() {
  //     if (this.$vuetify.breakpoint.lgAndUp) {
  //       // return this.items.filter((item) => {
  //       //   return this.items.indexOf(item) < 6;
  //       // });
  //     }
  //   },
  // },
  mounted() {
    console.log(this.$vuetify.breakpoint);
  },
};
</script>

<style></style>
