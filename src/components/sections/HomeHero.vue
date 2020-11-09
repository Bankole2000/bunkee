<template>
  <div class="home-hero-section">
    <v-parallax
      dark
      :height="$vuetify.breakpoint.height * 0.8"
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">Vuetify.js</h1>
          <h4 class="subheading">Build your application today!</h4>
        </v-col>
      </v-row>
    </v-parallax>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
