<template>
  <div class="filter-listing-form">
    <v-card class="ma-0 pa-0" elevation="0">
      <v-text-field label="Country"> </v-text-field>
      <p class="font-weight bold mb-0">Price (&#8358;) / Night</p>
      <v-range-slider
        :min="min"
        :max="max"
        v-model="range"
        class="d-flex align-center"
      >
        <!-- <template v-slot:prepend>
          <v-text-field
            :value="range[0]"
            class="mt-n8 pt-n8"
            hide-details
            single-line
            readonly
            style="width: 60px"
            @change="$set(range, 0, $event)"
          ></v-text-field
        ></template>
        <template v-slot:append>
          <v-text-field
            :value="range[1]"
            class="mt-n8 pt-n8"
            hide-details
            single-line
            readonly
            style="width: 60px"
            @change="$set(range, 1, $event)"
          ></v-text-field>
        </template> -->
      </v-range-slider>
      <v-row class="d-flex align-center mt-n5">
        <v-col cols="5">
          <v-text-field v-model="range[0]" type="number" outlined>
            <template #label>
              <span>Min (&#8358;)</span>
            </template>
          </v-text-field>
        </v-col>
        <v-divider class="mb-8"></v-divider>
        <p class="text-uppercase font-weight-light mb-8 mx-2">To</p>
        <v-divider class="mb-8"></v-divider>
        <v-col cols="5">
          <v-text-field v-model="range[1]" type="number" outlined>
            <template #label>
              <span>Max (&#8358;)</span>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      min: 1000,
      max: 100000,
      range: [5000, 30000],
    };
  },
};
</script>

<style></style>
