<template>
  <div class="invite-to-listing-modal">
    <v-btn
      :disabled="!loggedInUser || buttonsBusy"
      :loading="loadingListingInvite"
      text
      @click="dialog = true"
      color="primary"
      class="px-4"
      ><v-icon left>mdi-send</v-icon> Invite</v-btn
    >
    <v-dialog
      max-width="500"
      :class="{ 'rounded-xl': $vuetify.breakpoint.mdAndUp }"
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      scrollable
      psersistent
      transition="dialog-bottom-transition"
      style="z-index: 2;"
    >
      <v-card
        max-width="500"
        :class="{ 'rounded-xl': $vuetify.breakpoint.mdAndUp }"
      >
        <!-- color="deep-purple accent-4" -->
        <v-toolbar light flat>
          <v-toolbar-title
            ><span class="text-subtitle-1 ml-4"
              >Invite <b>@{{ userToInvite.username }}</b> to view a
              listing</span
            >
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn fab text @click="dialog = false" color="error">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <template v-slot:extension>
            <v-tabs grow v-model="toInviteToTabs">
              <v-tab>Listing</v-tab>
              <v-tab>Offer</v-tab>
              <v-tab>Rental</v-tab>
              <v-tab>Coops</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <!-- <v-card-title class="d-flex pa-0">
          <span class="text-subtitle-1 ml-4"
            >Invite <b>@{{ userToInvite.username }}</b> to view a listing</span
          >
          <v-spacer></v-spacer>
          <v-btn fab text @click="dialog = false" color="error">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title> -->
        <v-divider></v-divider>
        <v-card-text
          class="pa-0"
          :style="
            $vuetify.breakpoint.mdAndUp
              ? 'min-height: 450px; max-height: 450px;'
              : ''
          "
        >
          <v-tabs-items v-model="toInviteToTabs">
            <v-tab-item>
              Listing to Invite to
              <!-- Listing to Invite to -->
              <v-item-group v-model="selectedListingSendInvite">
                <v-col v-for="(item, i) in items" :key="i" cols="12">
                  <v-container class="py-0">
                    <v-item v-slot:default="{ active, toggle }">
                      <!-- :color="item.color" -->
                      <v-card
                        :style="{
                          transform: active ? 'scale(1.1)' : 'scale(1)',
                          border: active ? '2px solid blue' : 'none',
                        }"
                        :class="active ? 'my-3' : 'my-auto'"
                        style="transition: all ease-out 0.15s"
                      >
                        <v-carousel
                          class="rounded-lg"
                          :continuous="false"
                          :cycle="false"
                          hide-delimiters
                          hide-delimiter-background
                          height="auto"
                        >
                          <v-carousel-item v-for="n in 5" :key="n">
                            <v-img
                              @click.stop="toggle"
                              :src="item.src"
                              :aspect-ratio="510 / 300"
                            ></v-img>
                          </v-carousel-item>
                        </v-carousel>
                        <v-card-text @click="toggle">
                          <div
                            class="d-flex align-center text-h6 font-weight-light"
                          >
                            <div>
                              <v-card-subtitle class="py-0 px-0"
                                >{Listing Title} - e.g. My little getaway
                                &middot; State</v-card-subtitle
                              >
                              2 Bedroom Flat &middot; City
                            </div>
                            <v-spacer> </v-spacer>
                            <v-btn @click.stop="() => {}" icon
                              ><v-icon>mdi-information</v-icon></v-btn
                            >
                          </div>
                        </v-card-text>
                        <!-- <div class="d-flex flex-no-wrap justify-space-between">
                          <div>
                            <v-card-title
                              class="headline"
                              v-text="item.title"
                            ></v-card-title>

                            <v-card-subtitle
                              v-text="item.artist"
                            ></v-card-subtitle>
                          </div>
                        </div> -->
                        <v-overlay absolute :value="active">
                          <v-btn
                            color="success"
                            @click.stop="sendListingInvite(userToInvite, item)"
                          >
                            Send Invite
                          </v-btn>
                          <v-btn color="error" @click.stop="toggle">
                            Cancel
                          </v-btn>
                        </v-overlay>
                      </v-card>
                    </v-item>
                  </v-container>
                </v-col>
              </v-item-group>
            </v-tab-item>
            <v-tab-item>
              Offer to Invite to
              <v-item-group v-model="selectedOfferSendInvite">
                <v-col v-for="i in 5" :key="i">
                  <v-item v-slot:default="{ active, toggle }">
                    <v-card @click="toggle" elevation="3" class="rounded-xl">
                      <v-card-title class="pt-2 px-2 pb-0"
                        ><v-list-item class="px-0">
                          <v-list-item-avatar
                            class="mx-2"
                            size="48"
                            color="grey"
                          >
                            <v-img
                              src="https://cdn.vuetifyjs.com/images/lists/3.jpg"
                            ></v-img
                          ></v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title class="font-weight-medium"
                              >@usernameball</v-list-item-title
                            >
                            <v-list-item-subtitle>
                              Posted
                              {{
                                new Date().toLocaleString(['en-US'], {
                                  day: '2-digit',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              }}</v-list-item-subtitle
                            >
                          </v-list-item-content>

                          <!-- <v-list-item-avatar class="mx-2" size="48" color="grey">
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                  ></v-img
                ></v-list-item-avatar> -->

                          <v-list-item-action class="ma-0">
                            <v-btn icon large class="ma-2">
                              <v-icon size="32">mdi-dots-horizontal</v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </v-card-title>
                      <!-- <v-divider></v-divider> -->
                      <v-card-text class="py-0">
                        <p class="mb-0 text-subtitle-1 ml-2">
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Inventore sint pariatur error, delectus dolores
                          impedit possimus quam accusantium magni explicabo.
                        </p>
                      </v-card-text>
                      <!-- <v-img
              src="https://picsum.photos/510/300?random"
              aspect-ratio="1.5"
              class="rounded-lg"
            >
              <v-btn icon dark class="ma-4">
                <v-icon size="32">
                  mdi-heart-outline
                </v-icon>
              </v-btn></v-img
            > -->
                      <!-- <v-divider class="mt-2"></v-divider> -->
                      <div class="d-flex px-4 py-2">
                        <v-chip class="mx-1"
                          ><v-icon left size="20">mdi-gender-female</v-icon>
                          F</v-chip
                        >
                        <v-chip class="mx-1"
                          ><v-icon left size="20">mdi-calendar-account</v-icon>
                          28yo</v-chip
                        >
                        <v-chip class="mx-1"
                          ><v-icon left size="20">mdi-cash</v-icon>
                          &#8358;150k</v-chip
                        >
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text class="mx-1 rounded-xl">
                          More <v-icon right>mdi-menu-right</v-icon>
                        </v-btn>
                      </div>

                      <!-- <v-card-text class="d-flex justify-space-around pb-0 pt-2 px-0"
        ><v-btn
          text
          large
          :color="show ? 'primary' : ''"
          class="rounded-xl"
          width="23%"
          @click="toggleComments"
          ><v-icon left>mdi-chat-outline</v-icon>5</v-btn
        >
        <v-btn @click="sendInvite" text width="23%" large class="rounded-xl"
          ><v-icon left>mdi-send</v-icon>89</v-btn
        >
        <v-btn @click="share" text width="23%" large class="rounded-xl"
          ><v-icon left>mdi-share-variant</v-icon>89</v-btn
        >
        <v-btn @click="like" text width="23%" large class="rounded-xl"
          ><v-icon left>mdi-heart-outline</v-icon>89</v-btn
        >
      </v-card-text> -->
                      <v-overlay absolute :value="active">
                        <v-btn
                          color="success"
                          @click.stop="sendListingInvite(userToInvite, item)"
                        >
                          Send Invite
                        </v-btn>
                        <v-btn color="error" @click.stop="toggle">
                          Cancel
                        </v-btn>
                      </v-overlay>
                    </v-card>
                  </v-item>
                </v-col>
              </v-item-group>
            </v-tab-item>
            <v-tab-item>
              Rental to Invite to
            </v-tab-item>
            <v-tab-item>
              Cooperative to invite to
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false"
            ><v-icon left>mdi-close-circle</v-icon> Cancel</v-btn
          >
          <!-- <v-btn @click="sendListingInvite(userToInvite)"> Send Invite</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  props: ['userToInvite'],
  data() {
    return {
      dialog: false,
      toInviteToTabs: 0,
      selectedListingSendInvite: null,
      selectedRentalSendInvite: null,
      selectedOfferSendInvite: null,
      selectedCoopSendInvite: null,
      buttonsBusy: false,
      loadingListingInvite: false,
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
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['loggedInUser', 'currentUserListings']),
  },
  methods: {
    ...mapActions(['sendListingInviteToUser', 'showToast']),
    sendListingInvite(user, listing) {
      console.log({ user, listing });
      this.sendListingInviteToUser({
        invitee: user,
        inviteDetails: {
          notificationType: 'listingInvite',

          notificationText: `invited you to view a listing`,
          notificationAction: 'goToListing',
          notificationUrl: 'listing/listingId',
        },
      }).then((data) => {
        console.log(data);
        if (data.success) {
          this.showToast({
            sclass: 'success',
            message: `Listing Invite sent to <b class="primary--text">@${this.userToInvite.username}</b>`,
          });
        }
      });
    },
  },
};
</script>

<style></style>
