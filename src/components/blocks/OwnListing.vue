<template>
  <div class="listing">
    <v-card elevation="1" class="rounded-lg">
      <v-card-title class="">
        <v-progress-linear
          :value="listing.percentComplete"
          rounded
          striped
          height="25"
        >
          <template v-slot="{ value }">
            <strong>{{ Math.ceil(value) }}% Complete </strong>
          </template>
        </v-progress-linear>
      </v-card-title>
      <div style="position: relative">
        <div
          class="d-flex"
          style="position: absolute; top: 0; z-index: 1; width: 100%;"
        >
          <v-btn class="ma-4" depressed :disabled="loading"
            ><v-icon left>mdi-eye-plus</v-icon> Promote</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            v-if="listing.isPublished"
            small
            depressed
            dark
            color="green darken-2"
            :disabled="loading || listing.percentComplete < 100"
            class="mt-4 mr-3"
            fab
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn
            v-else
            fab
            small
            depressed
            dark
            color="grey darken-2"
            :disabled="loading || listing.percentComplete < 100"
            class="mt-4 mr-3"
            ><v-icon>mdi-eye-off</v-icon></v-btn
          >
          <EditListingModal :listingData="listing" />

          <v-dialog v-model="deleteListingModal" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                fab
                small
                dark
                color="error"
                :disabled="loading"
                v-bind="attrs"
                v-on="on"
                class="mt-4 mr-4"
              >
                <v-icon size="32">
                  mdi-close
                </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline"
                >Delete This Listing ?
              </v-card-title>
              <v-card-text
                >Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="deleteListingModal = false"
                >
                  <v-icon>mdi-window-close</v-icon> Cancel</v-btn
                >
                <v-btn @click="deleteListing(listing.id)" color="error" text
                  ><v-icon>mdi-delete-forever</v-icon> Confirm Delete</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <v-carousel
          class="rounded-lg"
          :continuous="false"
          :cycle="false"
          :show-arrows="true"
          hide-delimiter-background
          height="300"
        >
          <v-carousel-item
            v-for="image in listing.listingImages"
            :key="image.id"
          >
            <v-img
              :src="image.imageFullsizeUrl"
              height="300"
              class="rounded-lg"
            ></v-img>
          </v-carousel-item>
        </v-carousel>
      </div>
      <!-- <v-img
              src="https://picsum.photos/510/300?random"
              aspect-ratio="1.5"
              class="rounded-lg"
            >
              <div class="d-flex">
                <v-btn class="ma-4" depressed>Sponsored</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon dark color="primary" class="ma-4">
                  <v-icon size="32">
                    mdi-heart-outline
                  </v-icon>
                </v-btn>
              </div>
            </v-img> -->
      <v-card-text class="py-0 pl-0">
        <div class="d-flex align-center pl-2 pt-2">
          <div class="text-center">
            <v-rating
              background-color="grey lighten-3"
              dense
              :value="0"
              readonly
            ></v-rating>
          </div>
          <p
            class="text-subtitle-1 mb-0 ml-2 font-weight-light grey--text text--lighten-2"
          >
            No Reviews Yet
          </p>
        </div>

        <v-card-text class="text--primary py-0 pr-0">
          <div class="d-flex align-center text-h6 font-weight-light">
            <div>
              <v-card-subtitle class="py-0 px-0">{{
                listing.title
              }}</v-card-subtitle>
              {{ listing.buildingType }} &middot;
              {{ listing.locationState.replace('State', '') }}
            </div>
            <v-spacer> </v-spacer>
            <v-btn icon><v-icon>mdi-information</v-icon></v-btn>
          </div>

          <div>
            <v-card-subtitle class="py-0 px-0 black--text">
              {{ listing.description }}
            </v-card-subtitle>
            <!-- <p class="mb-0">
              {{ listing.description }}
            </p> -->
          </div>
        </v-card-text>
      </v-card-text>
      <v-card-actions class="pt-0"
        ><v-list-item class="px-0">
          <v-menu
            bottom
            right
            transition="scale-transition"
            :close-on-content-click="true"
            origin="top left"
          >
            <template v-slot:activator="{ on }">
              <v-list-item-avatar class="mx-2" size="48" v-on="on" color="grey">
                <v-img :src="listing.user.profileImageUrl"></v-img
              ></v-list-item-avatar>
              <v-list-item-content v-on="on">
                <v-list-item-title class="font-weight-medium"
                  >@{{ listing.user.username }}</v-list-item-title
                >
                <v-list-item-subtitle>
                  {{
                    new Date(listing.createdAt).toLocaleString(['en-US'], {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </template>
            <v-card width="300" class="rounded-lg">
              <v-list dark>
                <v-list-item>
                  <v-list-item-avatar size="48">
                    <v-img :src="listing.user.profileImageUrl"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{
                      listing.user.firstname
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                      >@{{ listing.user.username }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>

              <v-list dense>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon>mdi-calendar</v-icon>
                  </v-list-item-action>
                  <v-list-item-subtitle>
                    Joined
                    {{
                      new Date(listing.user.createdAt).toLocaleString(
                        ['en-US'],
                        {
                          weekday: 'short',
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        }
                      )
                    }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item @click="() => {}">
                  <v-list-item-action>
                    <v-icon>mdi-shield-account</v-icon>
                  </v-list-item-action>
                  <v-list-item-subtitle>Verified Identity</v-list-item-subtitle>
                </v-list-item>
                <v-list-item @click="() => {}">
                  <v-list-item-action>
                    <v-icon>mdi-shield-home-outline</v-icon>
                  </v-list-item-action>
                  <v-list-item-subtitle
                    >Verified Real Estate Agent</v-list-item-subtitle
                  >
                </v-list-item>
              </v-list>
              <v-card-actions class="d-flex justify-space-around">
                <v-btn text color="primary" class="px-4"
                  ><v-icon left>mdi-send</v-icon> Invite</v-btn
                >
                <v-btn color="accent" class="px-4"
                  ><v-icon left>mdi-forum</v-icon> Chat</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-menu>
          <!-- <v-list-item-avatar class="mx-2" size="48" color="grey">
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                  ></v-img
                ></v-list-item-avatar> -->

          <v-list-item-action class="ma-0">
            <p class="text-h5 mb-0 mr-2">
              <span class="font-weight-black "
                >&#8358;{{ listing.basicPrice | priceFilter }}</span
              >
              / Night
            </p>
          </v-list-item-action>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EditListingModal from '../modals/EditListingModal';
export default {
  props: ['listing'],
  components: {
    EditListingModal,
  },
  data() {
    return {
      deleteListingModal: false,
    };
  },
  computed: {
    ...mapGetters(['loading']),
  },
  methods: {
    ...mapActions(['deleteOwnListing']),
    deleteListing(listingId) {
      this.deleteOwnListing({ listingId }).then((result) => {
        console.log(result);
        this.deleteListingModal = false;
      });
    },
  },
};
</script>

<style></style>
