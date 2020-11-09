<template>
  <div class="app-offerings">
    <v-row>
      <p class="display-1 mb-0 pb-4 pl-4 font-weight-bold">
        Make money as A Host
      </p>
    </v-row>
    <v-row>
      <v-col v-for="n in 3" :key="n" cols="4">
        <v-card elevation="0">
          <v-img
            src="https://picsum.photos/510/300?random"
            aspect-ratio="1.5"
            class="rounded-lg"
          ></v-img>
          <v-card-actions
            ><p class="text-h5 mb-0">A service we offer</p>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
