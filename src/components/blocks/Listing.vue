<template>
  <div class="listing">
    <v-card elevation="1" class="rounded-lg">
      <div style="position: relative">
        <div
          class="d-flex"
          style="position: absolute; top: 0; z-index: 1; width: 100%;"
        >
          <v-btn class="ma-4" depressed>Sponsored</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon dark color="primary" class="ma-4">
            <v-icon size="32">
              mdi-heart-outline
            </v-icon>
          </v-btn>
        </div>
        <v-carousel
          class="rounded-lg"
          :continuous="false"
          :cycle="false"
          :show-arrows="true"
          hide-delimiter-background
          height="300"
        >
          <v-carousel-item v-for="i in 3" :key="i">
            <v-img
              src="https://picsum.photos/510/300?random"
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
            <v-rating dense :value="4"></v-rating>
          </div>
          <p class="text-subtitle-1 mb-0 ml-2 font-weight-light">
            No Reviews Yet
          </p>
        </div>

        <v-card-text class="text--primary py-0 pr-0">
          <div class="d-flex align-center text-h6 font-weight-light">
            <div>
              <v-card-subtitle class="py-0 px-0"
                >Listing Title - e.g. My little getaway</v-card-subtitle
              >
              2 Bedroom Flat &middot; Abuja
            </div>
            <v-spacer> </v-spacer>
            <v-btn icon><v-icon>mdi-information</v-icon></v-btn>
          </div>

          <div>
            <p class="mb-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
              necessitatibus! Whitsunday Island, Whitsunday Islands
            </p>
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
                <v-img
                  src="https://cdn.vuetifyjs.com/images/lists/3.jpg"
                ></v-img
              ></v-list-item-avatar>
              <v-list-item-content v-on="on">
                <v-list-item-title class="font-weight-medium"
                  >@usernameball</v-list-item-title
                >
                <v-list-item-subtitle>
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
            </template>
            <v-card width="300" class="rounded-lg">
              <v-list dark>
                <v-list-item>
                  <v-list-item-avatar size="48">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/lists/3.jpg"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>Userfirstname</v-list-item-title>
                    <v-list-item-subtitle>@usernameball</v-list-item-subtitle>
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
                      new Date().toLocaleString(['en-US'], {
                        weekday: 'short',
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
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
              <span class="font-weight-black ">&#8358;5k</span> / Night
            </p>
          </v-list-item-action>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
