<template>
  <div class="places-form">
    <v-card class="fill-height">
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text class="pa-0">
            <v-row>
              <p class="ml-4 display-1 font-weight-light">step {{ step }}</p>
            </v-row>
            <v-card-text class="pa-0">
              <v-row>
                <v-col cols="6" class="py-0">
                  <v-autocomplete
                    outlined
                    autocomplete="off"
                    v-model="selectedCountry"
                    label="Select Country"
                    :items="autocompleteCountry"
                    item-text="name"
                    :search-input.sync="country"
                    prepend-inner-icon="mdi-earth"
                    return-object
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6" class="py-0 pl-0">
                  <v-autocomplete
                    outlined
                    label="Select State"
                    v-model="selectedState"
                    :items="autocompleteState"
                    item-text="name"
                    :search-input.sync="state"
                    prepend-inner-icon="mdi-flag"
                    return-object
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    outlined
                    label="Select City"
                    v-model="selectedCity"
                    :items="autocompleteCity"
                    item-text="name"
                    :search-input.sync="city"
                    prepend-inner-icon="mdi-map-marker"
                    return-object
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="2">
          <v-card-text class="pa-0">
            <v-row>
              <p class="ml-4 display-1 font-weight-light">step {{ step }}</p>
            </v-row>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="3">
          <v-card-text class="pa-0">
            <v-row>
              <p class="ml-4 display-1 font-weight-light">step {{ step }}</p>
            </v-row>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="4">
          <v-card-text class="pa-0">
            <v-row>
              <p class="ml-4 display-1 font-weight-light">step {{ step }}</p>
            </v-row>
          </v-card-text>
        </v-window-item>
      </v-window>

      <v-divider> </v-divider>
      <v-card-actions>
        <v-btn large class="px-12" @click="step--" :disabled="step == 1" text
          >Back</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="moveNext(step)" large class="px-12"
          >Next</v-btn
        >
      </v-card-actions>
    </v-card>

    <!-- <input type="text" v-model="location" /> -->
    <v-autocomplete
      outlined
      label="Google Auto Complete"
      v-model="selection"
      :items="autocompleteSearch"
      :search-input.sync="location"
      prepend-inner-icon="mdi-map-marker"
    ></v-autocomplete>
    <!-- <ul>
      <li v-for="(result, i) in searchResults" :key="i">
        {{ result }} // list of all places
      </li>
    </ul> -->
  </div>
</template>

<script>
import Cities from '../helpers/cities.json';
import Countries from '../helpers/countries.json';
import States from '../helpers/states.json';
export default {
  data: () => ({
    step: 1,
    selectedCity: '',
    city: '',
    state: '',
    autocompleteCountry: Countries,
    country: '',
    selectedCountry: '',
    selectedState: '',
    selection: '',
    location: '',
    searchResults: [],
    service: null, // will reveal this later 🕵️
  }),
  metaInfo() {
    return {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBXWtQ_T4wUNryjRZAKH1pEU7Q20j2TPIE&libraries=places`,
          async: true,
          defer: true,
          callback: () => this.MapsInit(), // will declare it in methods
        },
      ],
    };
  },
  computed: {
    autocompleteSearch() {
      return this.searchResults;
    },
    autocompleteState() {
      return States.filter(
        (state) => state.country_id == this.selectedCountry.id
      );
    },
    autocompleteCity() {
      return Cities.filter((city) => city.state_id == this.selectedState.id);
    },
  },
  methods: {
    moveNext(step) {
      console.log(step);
      if (step == 1) {
        console.log(
          this.selectedCountry,
          this.selectedState,
          this.selectedCity
        );
      }
    },
    checkInput() {
      console.log(this.location);
    },
    MapsInit() {
      this.service = new window.google.maps.places.AutocompleteService();
    },
    displaySuggestions(predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults = [];
        return;
      }
      console.log(predictions, status);
      this.searchResults = predictions.map(
        (prediction) => prediction.description
      );
    },
  },
  // the magical part
  watch: {
    // location(newValue) {
    //   if (newValue) {
    //     console.log(this.displaySuggestions);
    //     this.service.getPlacePredictions(
    //       {
    //         input: this.location,
    //         types: ['(cities)'],
    //       },
    //       this.displaySuggestions
    //     );
    //     console.log(this.selection);
    //   }
    // },

    async country(newValue) {
      if (newValue) {
        // let filteredCountries = await Countries.filter((country) =>
        //   country.name.toLowerCase().includes(newValue.toLowerCase())
        // );
        // console.log(newValue, filteredCountries);
        console.log(this.selectedCountry);
        console.log(await this.autocompleteState);
      }
    },
  },
};
</script>

<style></style>
