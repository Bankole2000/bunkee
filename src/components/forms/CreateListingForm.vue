<template>
  <div class="create-listing-form">
    <v-progress-linear :value="percentComplete" rounded striped height="25">
      <template v-slot="{ value }">
        <strong>{{ Math.ceil(value) }}% Complete</strong>
      </template>
    </v-progress-linear>
    <v-divider></v-divider>

    <v-card elevation="0">
      <v-card-title class="justify-space-between px-0 pb-0">
        <span>{{ currentTitle }}</span>
        <v-spacer></v-spacer>
        <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="24"
          v-text="step"
        >
        </v-avatar>
      </v-card-title>
      <Alert class="mt-4" />
      <v-card-text class="pa-0">
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-row :class="{ 'pt-2': $vuetify.breakpoint.height > 618 }">
              <v-col cols="6" class="pb-0">
                <v-select
                  label="Type of Listing"
                  outlined
                  v-model="typeOfListing"
                  :items="typeOfListingOptions"
                  class="pb-0"
                >
                </v-select>
              </v-col>
              <v-col cols="6" class="pb-0">
                <v-select
                  label="No of guests"
                  outlined
                  v-model="noOfGuests"
                  :items="noOfGuestsOptions"
                >
                </v-select>
              </v-col>
            </v-row>
            <v-divider v-if="$vuetify.breakpoint.height > 618"></v-divider>
            <v-subheader v-if="$vuetify.breakpoint.height > 618"
              >Location</v-subheader
            >
            <v-row>
              <v-col class="py-0" cols="6">
                <v-autocomplete
                  outlined
                  v-model="selectedCountry"
                  item-text="name"
                  :items="preSelectedCountries"
                  label="Select Country"
                  return-object
                  prepend-inner-icon="mdi-earth"
                >
                </v-autocomplete>
              </v-col>
              <v-col class="py-0" cols="6">
                <v-autocomplete
                  outlined
                  v-model="selectedState"
                  item-text="name"
                  :items="autocompleteState"
                  label="Select State"
                  :search-input.sync="state"
                  return-object
                  prepend-inner-icon="mdi-flag"
                >
                </v-autocomplete>
              </v-col>

              <v-col class="py-0 mt-n8" cols="12">
                <v-switch
                  v-model="enterCustomCityName"
                  inset
                  :label="`${citySwitchLabel}`"
                ></v-switch>
                <v-scroll-y-reverse-transition leave-absolute>
                  <v-text-field
                    outlined
                    v-model="enteredCustomCityName"
                    label="Enter City Name"
                    v-if="enterCustomCityName"
                  >
                  </v-text-field>
                </v-scroll-y-reverse-transition>
                <v-scroll-y-reverse-transition leave-absolute>
                  <v-autocomplete
                    v-if="!enterCustomCityName"
                    outlined
                    v-model="selectedCity"
                    item-text="name"
                    item-value="name"
                    :items="autocompleteCity"
                    label="Select City"
                    :search-input.sync="city"
                    prepend-inner-icon="mdi-map-marker"
                  >
                  </v-autocomplete>
                </v-scroll-y-reverse-transition>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="2">
            <v-row :class="{ 'pt-2': $vuetify.breakpoint.height > 618 }">
              <v-col cols="12" class="pb-0">
                <v-text-field
                  label="Listing Title"
                  placeholder="e.g. Cool little Jabi Apartment"
                  outlined
                  v-model="listingTitle"
                  counter="30"
                  class="pb-0"
                >
                </v-text-field>
              </v-col>
              <v-col class="py-0">
                <v-divider v-if="$vuetify.breakpoint.height > 618"></v-divider>
                <v-subheader v-if="$vuetify.breakpoint.height > 618"
                  >Description</v-subheader
                >
              </v-col>

              <v-col cols="12" class="py-0">
                <v-textarea
                  label="Brief Description"
                  placeholder="e.g. Cool little Jabi Apartment"
                  outlined
                  v-model="listingBriefDescription"
                  counter="120"
                  class="pb-0"
                  auto-grow
                  rows="1"
                >
                </v-textarea>
              </v-col>
              <v-col cols="12" class="pb-0 mt-n8">
                <v-switch
                  v-model="enterCustomPlaceType"
                  inset
                  :label="`${placeTypeSwitchLabel}`"
                ></v-switch>
                <v-scroll-y-reverse-transition leave-absolute>
                  <v-select
                    label="Select Type of Place"
                    v-if="!enterCustomPlaceType"
                    outlined
                    v-model="typeOfPlace"
                    :items="typeOfPlaceOptions"
                    class="pb-0"
                  >
                  </v-select>
                </v-scroll-y-reverse-transition>
                <v-scroll-y-transition leave-absolute>
                  <v-text-field
                    label="Enter Type of Place"
                    v-if="enterCustomPlaceType"
                    outlined
                    v-model="typeOfPlace"
                    class="pb-0"
                  >
                  </v-text-field>
                </v-scroll-y-transition>
              </v-col>
              <v-col cols="12" class="py-0"> </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="3">
            <v-row :class="{ 'pt-2': $vuetify.breakpoint.height > 618 }">
              <v-col cols="12" sm="6">
                <AddListingImage
                  :index="1"
                  @savedImage="mainImageSaved"
                  @deletedImage="mainImageDeleted"
                />
              </v-col>

              <v-col cols="12" sm="6" v-for="n in noOfExtraImages + 1" :key="n">
                <AddListingImage
                  :index="n + 1"
                  @savedImage="imageSaved"
                  @deletedImage="imageDeleted"
                />
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="4"> {{ step }}</v-window-item>
          <v-window-item :value="5"> {{ step }}</v-window-item>
          <v-window-item :value="6"> {{ step }}</v-window-item>
          <v-window-item :value="7"> {{ step }}</v-window-item>
          <v-window-item :value="8"> {{ step }}</v-window-item>
        </v-window>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-btn
          large
          v-if="step != 4"
          width="45%"
          :disabled="step === 1 || moving"
          text
          @click="step--"
        >
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :loading="moving"
          large
          v-if="step != totalNoOfSteps + 1"
          :block="step == 4"
          width="45%"
          :disabled="step == totalNoOfSteps + 1 || moving"
          color="primary"
          @click="moveToNextStep(step)"
        >
          <span v-if="step != 4 || step == totalNoOfSteps + 1">Next</span>
          <span v-if="step == 4">Save & Continue</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Cities from '../helpers/cities.json';
import Countries from '../helpers/countries.json';
import States from '../helpers/states.json';
import Alert from '../shared/Alert';
import AddListingImage from '../blocks/AddListingImage';
import { mapActions, mapGetters } from 'vuex';
import { allRegexes } from '../helpers/config';
// import 'vue-croppa/dist/vue-croppa.css'
export default {
  components: {
    Alert,
    AddListingImage,
  },
  data() {
    return {
      noOfExtraImages: 0,
      listingTitle: '',
      imageCropModal: false,
      croppa: {},
      uploadedImage: null,
      listingBriefDescription: '',
      typeOfPlace: '',
      typeOfPlaceOptions: [
        'Serviced Apartment',
        'Self Contain',
        'Bungalow',
        'Duplex',
        'Boys Quarters',
        'Face Me I Face You',
        'Boutique Hotel',
      ],
      typeOfListing: '',
      typeOfListingOptions: ['Entire Place', 'Private Room', 'Shared Room'],
      noOfGuestsOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      noOfGuests: '',
      enterCustomCityName: false,
      enterCustomPlaceType: false,
      Countries,
      States,
      Cities,
      selectedCountry: {},
      selectedCity: {},
      enteredCustomCityName: '',
      city: '',
      selectedState: {},
      state: null,
      noChecks: false,
      step: 1,
      totalNoOfSteps: 7,
      moving: false,
    };
  },

  methods: {
    ...mapActions([
      'showAlert',
      'hideAlert',
      'setListingInCreation',
      'updateListingInCreation',
      'showToast',
    ]),
    uploadImage() {
      this.imageCropModal = true;
      this.croppa.chooseFile();
    },
    mainImageSaved(e) {
      console.log(e);
    },
    mainImageDeleted(e) {
      console.log(e);
    },
    imageSaved(e) {
      console.log('image Saved', e);
      this.noOfImages++;
    },
    imageDeleted(e) {
      console.log('image Deleted', e);
      this.noOfImages--;
    },

    checkStep1() {
      if (this.noChecks) {
        return { message: 'No Checks', move: true };
      }
      if (!this.typeOfListingOptions.includes(this.typeOfListing)) {
        return { message: 'Invalid Listing Type', move: false };
      }
      if (!this.noOfGuestsOptions.includes(this.noOfGuests)) {
        return { message: 'Invalid No of Guests', move: false };
      }
      if (
        this.selectedState.name == undefined ||
        this.selectedCountry.name == undefined
      ) {
        return { message: 'Invalid Country / State', move: false };
      }
      if (this.enterCustomCityName) {
        if (!(this.enteredCustomCityName.trim().length > 0)) {
          return { message: 'Invalid City', move: false };
        }
      } else if (!this.city) {
        return { message: 'Invalid City', move: false };
      }

      return { message: 'successful Step 1', move: true };
    },
    checkStep2() {
      if (this.noChecks) {
        return { message: 'No Checks', move: true };
      }
      if (this.listingTitle.length < 3) {
        return { message: 'Listing Title Too short', move: false };
      }
      if (this.listingTitle.length > 30) {
        return { message: 'Listing Title Too long', move: false };
      }
      if (
        !this.typeOfPlaceOptions.includes(this.typeOfPlace) &&
        !this.enterCustomPlaceType
      ) {
        return { message: 'Invalid type of place', move: false };
      }

      if (this.enterCustomPlaceType) {
        if (!/([^\s])/.test(this.typeOfPlace)) {
          return { message: 'Invalid type of place', move: false };
        }
        if (!allRegexes.anyWithSpaces.test(this.typeOfPlace)) {
          return { message: 'Invalid type of place', move: false };
        }
      }

      if (this.listingBriefDescription.length < 5) {
        return { message: 'Description is Too short', move: false };
      }

      if (this.listingBriefDescription.length > 120) {
        return { message: 'Description Too long', move: false };
      }
      return { message: 'step 2 complete - Saving...', move: true };
    },
    moveToNextStep(step) {
      this.moving = true;
      if (step == 1) {
        console.log(step);
        const moveToStepTwo = this.checkStep1();
        if (moveToStepTwo.move) {
          this.moving = false;
          this.step++;
        } else {
          this.showAlert({
            aclass: 'error',
            message: moveToStepTwo.message,
          }).then(() => {
            this.moving = false;
            this.hideAlert();
          });
        }
        console.log({
          state: this.selectedState,
          city: this.selectedCity,
          isCustomCity: this.enterCustomCityName,
          customCityName: this.enteredCustomCityName,
          country: this.selectedCountry,
          countryName: this.selectedCountry.name,
        });
      }
      if (step == 2) {
        const moveToStepThree = this.checkStep2();

        if (moveToStepThree.move) {
          if (this.listingInCreation) {
            this.updateListingInCreation({
              id: this.listingInCreation.listing.id,
              title: this.listingTitle,
              description: this.listingBriefDescription,
              // "isPrivate": false,
              locationState: this.selectedState.name,
              locationCountry: this.selectedCountry.name,
              locationCity: this.enterCustomCityName
                ? this.enteredCustomCityName
                : this.selectedCity,
              guestCapacity: this.noOfGuests,
              // "isPublished":false,
              buildingType: this.typeOfPlace,
              typeOfListing: this.typeOfListing,
              percentComplete: this.percentComplete,
            }).then(() => {
              this.moving = false;
              this.step++;
            });
          } else {
            this.setListingInCreation({
              title: this.listingTitle,
              description: this.listingBriefDescription,
              // "isPrivate": false,
              locationState: this.selectedState.name,
              locationCountry: this.selectedCountry.name,
              locationCity: this.enterCustomCityName
                ? this.enteredCustomCityName
                : this.selectedCity,
              guestCapacity: this.noOfGuests,
              // "isPublished":false,
              buildingType: this.typeOfPlace,
              typeOfListing: this.typeOfListing,
              percentComplete: this.percentComplete,
            }).then(() => {
              this.moving = false;
              this.step++;
            });
          }
        } else {
          this.showAlert({
            aclass: 'error',
            message: moveToStepThree.message,
          }).then(() => {
            this.moving = false;
            this.hideAlert();
          });
        }
      }
      if (step == 3) {
        this.step++;
        this.moving = false;
      }
      if (step == 4) {
        this.step++;
        this.moving = false;
      }
      if (step == 5) {
        this.step++;
        this.moving = false;
      }
      if (step == 6) {
        this.step++;
        this.moving = false;
      }
      if (step == 7) {
        this.step++;
        this.moving = false;
      }
      if (step == 8) {
        this.step++;
        this.moving = false;
      }
    },
  },

  computed: {
    ...mapGetters(['listingInCreation']),
    currentTitle() {
      switch (this.step) {
        case 1:
          return '🏠 Type of Place?';
        case 2:
          return '✍ General Description?';
        case 3:
          return '📷 Add Some Pictures';
        case 4:
          return '💾 Pause and Save?';
        case 5:
          return '🚰 Add Amenities';
        case 6:
          return '💲 Add Pricing';
        case 7:
          return '📝 Any Other Details';
        case 8:
          return '🥇All Done';
        default:
          return 'Add Listing Details';
      }
    },
    percentComplete() {
      return ((this.step - 1) / this.totalNoOfSteps) * 100;
    },
    autocompleteState() {
      return States.filter(
        (state) => state.country_id == this.selectedCountry.id
      );
    },
    autocompleteCity() {
      return Cities.filter((city) => city.state_id == this.selectedState.id);
    },
    preSelectedCountries() {
      return Countries.filter((country) => country.name == 'Nigeria');
    },
    citySwitchLabel() {
      return this.enterCustomCityName
        ? 'Enter Custom City Name'
        : 'Select City from a list';
    },
    placeTypeSwitchLabel() {
      return this.enterCustomPlaceType
        ? 'Enter a custom type of place'
        : 'Select type of place from a list';
    },
  },
  mounted() {
    console.log(this.$vuetify.breakpoint);
  },
};
</script>

<style scoped>
.croppa-container {
  background-color: rgba(0, 0, 0, 0.1) !important;
  border: 2px dashed steelblue;
  border-radius: 0px;
}
.croppa-container.croppa--has-target {
  background-color: none !important;
  border: 2px solid steelblue;
  border-radius: 10px;
}
</style>
