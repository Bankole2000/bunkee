<template>
  <div class="single-listing mb-16">
    <ListingPageTitle v-if="listingDetails != null" :listing="listingDetails" />
    <v-carousel hide-delimiters height="auto">
      <v-carousel-item
        v-for="(image, i) in listingDetails.listingImages"
        :key="i"
        height="auto"
      >
        <v-img :aspect-ratio="510 / 300" :src="image.imageResizedUrl"> </v-img>
      </v-carousel-item>
    </v-carousel>
    <v-container>
      <v-row>
        <v-col cols="12">
          <p style="font-size: 26px;" class="mb-0 font-weight-medium">
            {{ listingDetails.title }}
          </p>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <p class="my-4">{{ listingDetails.description }}</p>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <p style="font-size: 22px;" class="mb-0 font-weight-medium">
            Amenities
          </p>
        </v-col>
        <v-list>
          <v-list-item
            v-for="(feature, i) in listingDetails.specialFeatures"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon size="32" color="primary accent-4">{{
                feature.icon
              }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ feature.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <p
            v-if="bookingDates.length < 2"
            style="font-size: 22px;"
            class="mb-0 font-weight-medium"
          >
            Select {{ bookingDates.length == 0 ? 'CheckIn' : 'Checkout' }} Date
          </p>
          <p
            v-if="bookingDates.length >= 2"
            style="font-size: 22px;"
            class="mb-0 font-weight-medium"
          >
            {{ bookingDates[0] | moment('from', `${bookingDates[1]}`, true) }}
            in {{ listingDetails.locationCity }}
          </p>
          <p class="subtitle-1 mb-0" v-if="bookingDates.length < 2">
            Add Booking Dates
          </p>
          <p class="subtitle-1 mb-0" v-if="bookingDates.length >= 2">
            {{
              new Date(bookingDates[0]).toLocaleString(['en-Us'], {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            }}
            -
            {{
              new Date(bookingDates[1]).toLocaleString(['en-Us'], {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            }}
          </p>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex justify-center py-0">
          <v-date-picker
            class="py-0"
            full-width
            v-model="bookingDates"
            range
          ></v-date-picker>
        </v-col>
        <v-col cols="12" class="py-0 mt-n4">
          <v-btn class="mt-n4" text color="primary" @click="bookingDates = []"
            ><span class="text-capitalize">Clear Dates</span></v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ListingPageTitle from '../components/shared/ListingPageTitle';
import { mapActions } from 'vuex';
export default {
  components: {
    ListingPageTitle,
  },
  data() {
    return {
      listingDetails: null,
      bookingDates: [],
    };
  },
  computed: {},
  methods: {
    ...mapActions(['getSingleListingDetails']),
  },
  beforeMount() {
    console.log(this.$route);
    this.getSingleListingDetails({ listinguuid: this.$route.params.uuid }).then(
      (data) => {
        if (data.success) {
          this.listingDetails = data.listing;
        }
      }
    );
  },
};
</script>

<style></style>
