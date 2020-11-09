<template>
  <div class="offers">
    <v-app-bar
      app
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title class="pl-0">Offers</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-filter-variant</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Tab 1</v-tab>
          <v-tab>Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <p class="display-4">Offers</p>
    <MenuModal />
    <v-container>
      <v-row>
        <v-col v-for="n in 4" :key="n" cols="12">
          <v-card elevation="0">
            <v-img
              src="https://picsum.photos/510/300?random"
              aspect-ratio="1.5"
              class="rounded-lg"
            >
              <v-btn icon dark class="ma-4">
                <v-icon size="32">
                  mdi-heart-outline
                </v-icon>
              </v-btn></v-img
            >
            <v-card-actions
              ><p class="text-h5 mb-0">
                Post by someone looking to rent or cohabit
              </p>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-card height="900"> </v-card>
  </div>
</template>

<script>
import MenuModal from '../components/modals/MenuModal';
export default {
  components: {
    MenuModal,
  },
};
</script>

<style></style>
