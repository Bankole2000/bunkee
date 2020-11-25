<template>
  <div class="create-listing-form">
    <v-progress-linear
      :value="listingInCreation.listing.percentComplete"
      rounded
      striped
      height="25"
    >
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
                <EditListingImage
                  :listingImageToEdit="
                    listingData.listingImages.find(
                      (image) => image.listingOrder == 1
                    )
                  "
                  :index="1"
                  @savedImage="mainImageSaved"
                  @deletedImage="mainImageDeleted"
                />
              </v-col>

              <v-col
                cols="12"
                sm="6"
                v-for="extraListingImage in extraListingImages"
                :key="extraListingImage.id"
              >
                <EditListingImage
                  :listingImageToEdit="extraListingImage"
                  :index="extraListingImage.listingOrder"
                  @savedImage="oldImageSaved"
                  @deletedImage="oldImageDeleted"
                />
              </v-col>
              <v-col cols="12" sm="6" v-for="n in noOfExtraImages + 1" :key="n">
                <AddListingImage
                  :index="
                    Math.max.apply(
                      Math,
                      listingInCreation.listing.listingImages.map(
                        (image) => image.listingOrder
                      )
                    ) + 1
                  "
                  @savedImage="newImageSaved"
                  @deletedImage="newImageDeleted"
                />
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item :value="4">
            <v-row :class="{ 'pt-2': $vuetify.breakpoint.height > 618 }">
              <v-col cols="12">
                <p class="text-h5 font-weight-black black--text mb-0">
                  So Far So Good
                </p>
                <v-divider></v-divider>
                <v-expansion-panels accordion focusable>
                  <v-expansion-panel v-for="(item, i) in information" :key="i">
                    <v-expansion-panel-header>{{
                      item.title
                    }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      {{ item.text }}
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
              <v-col cols="12" class="px-4"
                ><v-btn large class="accent" block
                  ><v-icon left>mdi-pause</v-icon> Pause For now</v-btn
                ></v-col
              >
            </v-row>
          </v-window-item>
          <v-window-item :value="5">
            <p class="text-h6 font-weight-light mb-0">
              What Amenities will your guests have?
            </p>
            <v-card elevation="0">
              <v-card-text class="pa-0">
                <v-slide-y-transition group>
                  <v-card
                    v-for="(amenity, i) in amenitiesData"
                    :key="i"
                    class="rounded-xl my-2"
                  >
                    <v-card-title class="primary py-2"
                      ><p class="mb-0 text-h5 font-weight-light">
                        Amenity No {{ i + 1 }}
                      </p>
                      <v-spacer></v-spacer
                      ><v-btn @click="removeAmenity(i)" small color="error" fab>
                        <v-icon>mdi-close</v-icon>
                      </v-btn></v-card-title
                    >
                    <v-card-text class="py-4 pb-0">
                      <v-select
                        :items="amenities"
                        :value="
                          listingInCreation.listing.amenities[i].amenity || ''
                        "
                        label="Amenity"
                        outlined
                        v-model="amenitiesData[i].amenity"
                      >
                      </v-select>
                      <v-expand-transition>
                        <v-text-field
                          v-show="amenitiesData[i].amenity != ''"
                          v-model="amenitiesData[i].description"
                          :value="
                            listingInCreation.listing.amenities[i]
                              .description || ''
                          "
                          outlined
                          label="description"
                        ></v-text-field>
                      </v-expand-transition>
                    </v-card-text>
                  </v-card>
                </v-slide-y-transition>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="addAmenity" class="px-4 my-4"
                  ><v-icon>mdi-plus</v-icon> Add an Amenity</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-window-item>
          <v-window-item :value="6">
            <p class="text-h6 font-weight-light mb-0">
              What Special Features would you be offering your guests
            </p>

            <v-card elevation="0">
              <v-card-text class="pa-0">
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                    sm="4"
                    class="py-0"
                    v-for="(feature, i) in booleanFeatures"
                    :key="i"
                  >
                    <v-switch flat inset v-model="feature.value">
                      <template v-slot:label>
                        <span
                          ><v-icon>{{ feature.icon }}</v-icon
                          >{{ feature.name }} ?
                          {{ feature.value ? 'Yes' : 'No' }}</span
                        >
                      </template>
                    </v-switch>
                  </v-col>
                  <v-col> </v-col>
                </v-row>
                <v-container class="d-flex justify-center my-4">
                  <RequestSpecialFeature />
                </v-container>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item :value="7">
            <p class="text-h6 font-weight-light mb-0">
              What Rules would you want your guests to be aware of
            </p>
            <v-card elevation="0">
              <v-card-text class="pa-0">
                <v-row>
                  <v-col
                    cols="12"
                    md="3"
                    sm="4"
                    class="py-0"
                    v-for="(rule, i) in booleanRules"
                    :key="i"
                  >
                    <v-switch flat inset v-model="rule.value">
                      <template v-slot:label>
                        <span
                          ><v-icon>{{
                            rule.value ? rule.iconAllowed : rule.iconNotAllowed
                          }}</v-icon>
                          {{ rule.rule }} ?
                          {{ rule.value ? 'Yes' : 'No' }}</span
                        >
                      </template>
                    </v-switch>
                  </v-col>
                  <v-col> </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item :value="8">
            <p class="text-h6 font-weight-light mb-0">
              What Rules would you want your guests to be aware of
            </p>
            <p class="">How much notice do you need before a guest arrives ?</p>
            <v-select
              outlined
              :items="[0, 1, 2, 3, 4, 5, 6, 7]"
              v-model="guestArrivalDaysNotice"
              label="Days Notice"
            >
              <template v-slot:selection="{ item }">
                <span
                  >{{ item }} {{ item == 1 ? 'day' : 'days'
                  }}{{ item == 0 ? ' (Same day)' : '' }}</span
                >
              </template>
            </v-select>
            <p>How far in Advance can Guests Book ?</p>
            <v-select
              outlined
              v-model="guestBookingMonthsInAdvance"
              :items="[1, 2, 3, 4, 5, 6, 12]"
              label="Months in advance"
            >
              <template v-slot:selection="{ item }">
                <span
                  >{{ item }} {{ item == 1 ? 'month' : 'months' }} in advance
                  {{ item == 12 ? '(one year)' : '' }}</span
                >
              </template>
            </v-select>
            <p>How long can Guests stay?</p>
            <v-col cols="12" sm="12">
              <v-slider
                v-model="bookingStayDaysMin"
                color="orange"
                label="Min"
                ticks="always"
                step="1"
                persistent-hint
                :hint="
                  `${bookingStayDaysMin} ${
                    bookingStayDaysMin == 1 ? 'Day' : 'Days'
                  } Minimum`
                "
                min="1"
                max="7"
                thumb-label
              >
              </v-slider>
            </v-col>
            <v-col cols="12" sm="12">
              <v-slider
                v-model="bookingStayDaysMax"
                color="orange"
                label="Max"
                ticks="always"
                step="3"
                persistent-hint
                :hint="
                  `${bookingStayDaysMax} ${
                    bookingStayDaysMax == 1 ? 'Day' : 'Days'
                  } ${
                    bookingStayDaysMax > 7 && bookingStayDaysMax < 30
                      ? ' (over ' +
                        Math.floor(bookingStayDaysMax / 7) +
                        ' week(s)'
                      : ''
                  }
                  ${
                    bookingStayDaysMax >= 30 && bookingStayDaysMax <= 180
                      ? ' - over ' +
                        Math.floor(bookingStayDaysMax / 28) +
                        ' month(s)'
                      : ''
                  } 
                  Maximum`
                "
                min="1"
                max="180"
                thumb-label
              ></v-slider>
            </v-col>
          </v-window-item>
          <v-window-item :value="9">
            <p class="text-h6 font-weight-light mb-0">
              Set your pricing
            </p>

            <!-- <v-switch
              label="Offer alternate prices"
              v-model="hasAlternativePricing"
            ></v-switch> -->

            <v-row class="d-flex flex-wrap align-center">
              <v-col
                class="py-0 d-flex"
                :class="
                  $vuetify.breakpoint.smAndDown
                    ? 'justify-start mb-0'
                    : 'justify-end mb-3'
                "
                cols="12"
                sm="6"
                md="3"
              >
                <p
                  class="headline"
                  :class="$vuetify.breakpoint.smAndDown ? 'mb-3' : 'mb-6'"
                >
                  Set Basic Price
                </p>
              </v-col>
              <v-col
                class="py-0 d-flex"
                :class="
                  $vuetify.breakpoint.smAndDown
                    ? 'justify-start mb-0'
                    : 'justify-end mb-3'
                "
                cols="12"
                sm="6"
                md="3"
              >
                <v-text-field
                  outlined
                  v-model="basicPrice"
                  label="Price per day (24Hrs)"
                >
                  <template slot="prepend" class="mt-3 mx-auto">
                    <span class="headline pb-6">&#8358;</span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col
                class="py-0 d-flex"
                cols="12"
                sm="6"
                md="3"
                :class="
                  $vuetify.breakpoint.smAndDown
                    ? 'justify-start mb-0'
                    : 'justify-end mb-3'
                "
              >
                <v-checkbox
                  class="mt-0"
                  v-model="hasPricePerWeekend"
                  label="Set Weekend Price"
                ></v-checkbox>
              </v-col>
              <v-expand-transition>
                <v-col
                  class="py-0"
                  v-show="hasPricePerWeekend"
                  cols="12"
                  sm="6"
                  md="3"
                >
                  <v-text-field
                    outlined
                    label="Weekend Price"
                    v-model="pricePerWeekend"
                  >
                    <template slot="prepend" class="mt-3 mx-auto">
                      <span class="headline pb-6">&#8358;</span>
                    </template>
                  </v-text-field>
                </v-col>
              </v-expand-transition>
              <v-col
                :class="
                  $vuetify.breakpoint.smAndDown
                    ? 'justify-start mb-0'
                    : 'justify-end mb-3'
                "
                class="py-0 d-flex"
                cols="12"
                sm="6"
                md="3"
              >
                <v-checkbox
                  class="mt-0"
                  v-model="hasPricePerWeek"
                  label="Set Weekly Price"
                ></v-checkbox>
              </v-col>

              <v-expand-transition>
                <v-col
                  class="py-0"
                  v-show="hasPricePerWeek"
                  cols="12"
                  sm="6"
                  md="3"
                >
                  <v-text-field
                    outlined
                    label="Weekly Price"
                    type="number"
                    v-model="pricePerWeek"
                  >
                    <template slot="prepend" class="mt-3 mx-auto">
                      <span class="headline pb-6">&#8358;</span>
                    </template>
                  </v-text-field>
                </v-col>
              </v-expand-transition>
              <v-col
                :class="
                  $vuetify.breakpoint.smAndDown
                    ? 'justify-start mb-0'
                    : 'justify-end mb-3'
                "
                class="py-0 d-flex"
                cols="12"
                sm="6"
                md="3"
              >
                <v-checkbox
                  class="mt-0"
                  v-model="hasPricePerMonth"
                  label="Set Monthly Price"
                ></v-checkbox>
              </v-col>
              <v-expand-transition>
                <v-col
                  class="py-0"
                  v-show="hasPricePerMonth"
                  cols="12"
                  sm="6"
                  md="3"
                >
                  <v-text-field
                    outlined
                    label="Monthly Price"
                    type="number"
                    v-model="pricePerMonth"
                  >
                    <template slot="prepend" class="mt-3 mx-auto">
                      <span class="headline pb-6">&#8358;</span>
                    </template>
                  </v-text-field>
                </v-col>
              </v-expand-transition>
            </v-row>
          </v-window-item>
          <v-window-item :value="10">
            <p class="text-h6 font-weight-light mb-0">
              What Rules would you want your guests to be aware of
            </p>
          </v-window-item>
          <v-window-item :value="10">
            <p class="text-h6 font-weight-light mb-0">
              What Rules would you want your guests to be aware of
            </p>
          </v-window-item>
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
          :disabled="
            step == totalNoOfSteps + 1 ||
              moving ||
              (listingInCreation.listing.listingImages.length < 2 &&
                step == 3) ||
              (!mainImageUploaded && step == 3) ||
              (step == 5 && !amenitiesDataIsOkay)
          "
          color="primary"
          @click="moveToNextStep(step)"
        >
          <v-icon left v-if="step == 4">mdi-play</v-icon>
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
import EditListingImage from '../blocks/EditListingImage';
import AddListingImage from '../blocks/AddListingImage';
import { mapActions, mapGetters } from 'vuex';
import { allRegexes } from '../helpers/config';
import RequestSpecialFeature from '../modals/RequestFeatureModal';
// import 'vue-croppa/dist/vue-croppa.css'
export default {
  components: {
    Alert,
    EditListingImage,
    AddListingImage,
    RequestSpecialFeature,
  },
  props: ['listingData'],
  data() {
    return {
      basicPrice: 0,
      hasPricePerWeekend: false,
      hasPricePerWeek: false,
      hasPricePerMonth: false,
      pricePerWeekend: null,
      pricePerWeek: null,
      pricePerMonth: null,
      guestArrivalDaysNotice: 0,
      guestBookingMonthsInAdvance: 0,
      bookingStayDaysMin: 0,
      bookingStayDaysMax: 1,
      placeDescriptions: [
        {
          name: '',
        },
      ],
      periods: '',
      mySwitch: false,

      booleanRules: [
        {
          rule: 'Children/Babies Allowed',
          iconAllowed: 'mdi-baby',
          iconNotAllowed: 'mdi-cancel',
          value: false,
        },
        {
          rule: 'Smoking Allowed',
          iconAllowed: 'mdi-smoking',
          iconNotAllowed: 'mdi-smoking-off',
          value: false,
        },
        {
          rule: 'Friends/Visitors Allowed',
          iconAllowed: 'mdi-account',
          iconNotAllowed: 'mdi-account-off',
          value: false,
        },
        {
          rule: 'Spouse/Lovers Allowed',
          iconAllowed: 'mdi-heart',
          iconNotAllowed: 'mdi-heart-off',
          value: false,
        },
        {
          rule: 'Pet(s) Allowed',
          iconAllowed: 'mdi-paw',
          iconNotAllowed: 'mdi-paw-off',
          value: false,
        },
        {
          rule: 'Parties/Events allowed',
          iconAllowed: 'mdi-food',
          iconNotAllowed: 'mdi-food-off',
          value: false,
        },
        {
          rule: 'Alcohol Allowed',
          iconAllowed: 'mdi-cup',
          iconNotAllowed: 'mdi-cup-off',
          value: false,
        },
      ],
      booleanFeatures: [
        {
          name: '24hr Power Supply',
          icon: 'mdi-lightbulb-on',
          value: false,
        },
        {
          name: 'Swimming Pool',
          icon: 'mdi-pool',
          value: false,
        },
        {
          name: 'Power Generator',
          icon: 'mdi-power',
          value: false,
        },
        {
          name: 'Private kitchen',
          icon: 'mdi-chef-hat',
          value: false,
        },
        {
          name: 'Home Gym',
          icon: 'mdi-dumbbell',
          value: false,
        },
        {
          name: 'Free Wifi',
          icon: 'mdi-wifi',
          value: false,
        },
        {
          name: 'Private Garage',
          icon: 'mdi-garage',
          value: false,
        },
        {
          name: 'Playground',
          icon: 'mdi-beach',
          value: false,
        },
        {
          name: 'Close to City Center',
          icon: 'mdi-city',
          value: false,
        },
        {
          name: 'Easy Commute',
          icon: 'mdi-train-car',
          value: false,
        },
        {
          name: 'Hot Water',
          icon: 'mdi-kettle-steam',
          value: false,
        },
        {
          name: 'Dedicated WorkSpace',
          icon: 'mdi-table-chair',
          value: false,
        },
        {
          name: 'Washing Machine',
          icon: 'mdi-washing-machine',
          value: false,
        },
        {
          name: 'Clothes Cabinet',
          icon: 'mdi-hanger',
          value: false,
        },
        {
          name: 'Pressing Iron',
          icon: 'mdi-tshirt-v',
          value: false,
        },
        {
          name: 'Free Parking Space',
          icon: 'mdi-car-hatchback',
          value: false,
        },
      ],
      // booleanFeatures: [
      //   'Swimming Pool',
      //   'Free Wifi',
      //   'Garage',
      //   'Playground',
      //   'City Center',
      //   '24Hr Power supply',
      //   '',
      // ],

      amenitiesData: [],
      amenities: [
        'TV',
        'Wifi/Internet',
        'Air Conditioner',
        'Water Supply',
        'Power Supply',
        'Laundry',
        'Bathroom',
        'Toiletries',
      ],
      mainImageUploaded: this.listingData.listingImages.some(
        (image) => image.listingOrder == 1
      ),
      noOfExtraImages: 0,
      listingTitle: this.listingData.title,
      imageCropModal: false,
      croppa: {},
      listingBriefDescription: this.listingData.description,
      typeOfPlace: this.listingData.buildingType,
      typeOfPlaceOptions: [
        'Serviced Apartment',
        'Self Contain',
        'Bungalow',
        'Duplex',
        'Boys Quarters',
        'Face Me I Face You',
        'Boutique Hotel',
      ],
      typeOfListing: this.listingData.typeOfListing,
      typeOfListingOptions: ['Entire Place', 'Private Room', 'Shared Room'],
      noOfGuestsOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      noOfGuests: this.listingData.guestCapacity,
      enterCustomCityName: false,
      enterCustomPlaceType: false,
      Countries,
      States,
      Cities,
      selectedCountry: Countries.find(
        (country) => country.name == this.listingData.locationCountry
      ),
      selectedCity: Cities.find(
        (city) => city.name == this.listingData.locationCity
      ),
      enteredCustomCityName: this.listingData.locationCity,
      city: '',
      selectedState: States.find(
        (state) => state.name == this.listingData.locationState
      ),
      state: null,
      noChecks: false,
      step: 1,
      totalNoOfSteps: 11,
      moving: false,
      information: [
        {
          title: 'Information you will need',
          text: `Here's some info you might need`,
        },
        {
          title: 'Information you will need',
          text: `Here's some info you might need`,
        },
        {
          title: 'Information you will need',
          text: `Here's some info you might need`,
        },
        {
          title: 'Information you will need',
          text: `Here's some info you might need`,
        },
        {
          title: 'Information you will need',
          text: `Here's some info you might need`,
        },
      ],
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
    addSpecialFeature() {},
    removeAmenity(i) {
      this.amenitiesData.splice(i, 1);
    },
    addAmenity() {
      this.amenitiesData.push({
        amenity: '',
        description: '',
      });
    },
    uploadImage() {
      this.imageCropModal = true;
      this.croppa.chooseFile();
    },
    mainImageSaved(e) {
      console.log(e);
      this.showToast({
        sclass: 'success',
        message: 'Image uploaded',
        timeout: 1500,
      }).then(() => {
        this.mainImageUploaded = true;
      });
    },
    mainImageDeleted(e) {
      console.log(e);
      this.showToast({
        sclass: 'info',
        message: 'Image deleted',
        timeout: 1500,
      }).then(() => {
        this.mainImageUploaded = false;
      });
    },
    newImageSaved(e) {
      console.log('image Saved', e);
      this.noOfExtraImages++;
      this.showToast({
        sclass: 'success',
        message: 'Image uploaded',
        timeout: 1500,
      });
    },
    oldImageSaved(e) {
      console.log('image Saved', e);
      this.showToast({
        sclass: 'success',
        message: 'Image uploaded',
        timeout: 1500,
      });
    },
    newImageDeleted(e) {
      console.log('image Deleted', e);
      this.noOfExtraImages--;
      this.showToast({
        sclass: 'info',
        message: 'Image deleted',
        timeout: 1500,
      });
    },
    oldImageDeleted(e) {
      console.log('image Deleted', e);
      this.showToast({
        sclass: 'info',
        message: 'Image deleted',
        timeout: 1500,
      });
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
    checkStep5() {
      if (this.noChecks) {
        return { message: 'No Checks', move: true };
      }
      if (this.amenitiesData.length < 1) {
        return { message: 'Listing Title Too short', move: false };
      }
      for (let i = 0; i < this.amenitiesData.length; i++) {
        if (!/([^\s])/.test(this.amenitiesData[i].amenity)) {
          return { message: 'Missing Amenity name', move: false };
        }
        if (!/([^\s])/.test(this.amenitiesData[i].description)) {
          return { message: 'Missing Amenity Description', move: false };
        }
      }
      let uniqueAmenities = this.amenitiesData.map(
        (amenity) => amenity.amenity
      );

      if (new Set(uniqueAmenities).size !== this.amenitiesData.length) {
        return { message: 'Duplicate Amenities detected', move: false };
      }
      return { message: 'step 5 complete - Saving...', move: true };
    },
    moveToNextStep(step) {
      this.moving = true;
      if (step == 1) {
        console.log(step);
        const moveToStepTwo = this.checkStep1();
        if (moveToStepTwo.move) {
          let newCity =
            this.selectedCity.name === undefined
              ? this.selectedCity
              : this.selectedCity.name;
          this.updateListingInCreation({
            id: this.listingInCreation.listing.id,
            typeOfListing: this.typeOfListing,
            locationCountry: this.selectedCountry.name,
            locationState: this.selectedState.name,
            guestCapacity: this.noOfGuests,
            locationCity: this.enterCustomCityName
              ? this.enteredCustomCityName
              : newCity,
          }).then(() => {
            this.step++;
            this.moving = false;
          });
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
          this.updateListingInCreation({
            id: this.listingInCreation.listing.id,
            title: this.listingTitle,
            description: this.listingBriefDescription,
            // "isPrivate": false,
            // "isPublished":false,
            buildingType: this.typeOfPlace,
            typeOfListing: this.typeOfListing,
            percentComplete: this.percentComplete,
          }).then(() => {
            this.moving = false;
            this.step++;
          });
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
        this.updateListingInCreation({
          id: this.listingInCreation.listing.id,
          percentComplete: this.percentComplete,
        }).then(() => {
          this.step++;
          this.moving = false;
        });
      }
      if (step == 4) {
        this.updateListingInCreation({
          id: this.listingInCreation.listing.id,
          percentComplete: this.percentComplete,
        }).then(() => {
          this.step++;
          this.moving = false;
        });
      }
      if (step == 5) {
        // this.step++;
        console.log({ data: this.amenitiesData });
        const moveToStepSix = this.checkStep5();
        if (moveToStepSix.move) {
          console.log(moveToStepSix);
          console.log('can Move');
          this.updateListingInCreation({
            id: this.listingInCreation.listing.id,
            amenities: this.amenitiesData,
            percentComplete: this.percentComplete,
          }).then(() => {
            this.moving = false;
            this.step++;
          });
        } else {
          console.log(moveToStepSix);
          // console.log(JSON.stringify(this.amenitiesData));
          this.showToast({
            sclass: 'error',
            message: moveToStepSix.message,
            timeout: 2000,
          });
          this.moving = false;
        }
      }
      if (step == 6) {
        this.updateListingInCreation({
          id: this.listingInCreation.listing.id,
          specialFeatures: this.booleanFeatures,
          percentComplete: this.percentComplete,
        }).then(() => {
          this.step++;
          this.moving = false;
        });
        console.log(this.booleanFeatures);
      }
      if (step == 7) {
        this.updateListingInCreation({
          id: this.listingInCreation.listing.id,
          rules: this.booleanRules,
          percentComplete: this.percentComplete,
        }).then(() => {
          this.step++;
          this.moving = false;
        });
      }
      if (step == 8) {
        this.updateListingInCreation({
          id: this.listingInCreation.listing.id,
          guestArrivalDaysNotice: this.guestArrivalDaysNotice,
          guestBookingMonthsInAdvance: this.guestBookingMonthsInAdvance,
          bookingStayDaysMin: this.bookingStayDaysMin,
          bookingStayDaysMax: this.bookingStayDaysMax,
          percentComplete: this.percentComplete,
        }).then(() => {
          this.step++;
          this.moving = false;
        });
      }
      if (step == 9) {
        this.updateListingInCreation({
          id: this.listingInCreation.listing.id,
          basicPrice: this.basicPrice,
          pricePerWeekend: this.hasPricePerWeekend
            ? this.pricePerWeekend
            : null,
          pricePerWeek: this.hasPricePerWeek ? this.pricePerWeek : null,
          pricePerMonth: this.hasPricePerMonth ? this.pricePerMonth : null,
          percentComplete: this.percentComplete,
        }).then(() => {
          this.step++;
          this.moving = false;
        });
      }
    },
  },

  computed: {
    ...mapGetters(['listingInCreation']),
    amenitiesDataIsOkay() {
      // console.log(/([^\s])/.test(this.amenitiesData[0].amenity));
      if (this.amenitiesData.length < 1) {
        return false;
      }
      if (!/([^\s])/.test(this.amenitiesData[0].amenity)) {
        return false;
      }
      if (!/([^\s])/.test(this.amenitiesData[0].description)) {
        return false;
      }
      return true;
    },

    extraListingImages() {
      let extraListingImages = this.listingInCreation.listing.listingImages.filter(
        (image) => image.listingOrder > 1
      );
      return extraListingImages;
    },
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

  beforeMount() {
    this.amenitiesData = this.listingInCreation.listing.amenities;
    this.booleanFeatures = this.listingInCreation.listing.specialFeatures;
    this.booleanRules = this.listingInCreation.listing.rules;
    // this.booleanFeatures.forEach((feature) => {
    //   this.booleanFeaturesData.push({ name: feature, value: false });
    // });
  },
  mounted() {
    // console.log(this.$vuetify.breakpoint);
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
