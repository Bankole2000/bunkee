<template>
  <div class="profile">
    <v-card flat tile>
      <v-app-bar
        color="primary"
        src="https://picsum.photos/510/300?random"
        dark
        prominent
        extended
        flat
        extension-height="100"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(255,115,201,.7), rgba(25,32,255,.7)"
          ></v-img>
        </template>
        <!-- <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, 000000EE, 00000000"
          ></v-img>
        </template> -->
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-camera</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-apps</v-icon>
        </v-btn>
      </v-app-bar>

      <v-card
        color="transparent"
        class="mx-auto"
        max-width="900"
        style="margin-top: -75px;"
        elevation="0"
      >
        <v-card-title class="d-flex">
          <v-avatar size="120" color="white" style="border: 3px solid white;">
            <v-img :src="`${loggedInUser.profileImageUrl}?s=300`"></v-img>
          </v-avatar>
          <v-spacer></v-spacer>
          <div class="align-self-end">
            <p
              flat
              color="transparent"
              class=" mb-6 text-end white--text font-weight-black"
            >
              @{{ loggedInUser.username }}
            </p>
            <p flat color="transparent" class="text-h5 ">
              Hi, I'm
              <span class="font-weight-black">{{
                loggedInUser.firstname
              }}</span>
            </p>
          </div>
        </v-card-title>
      </v-card>
    </v-card>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="4" class="d-flex justify-center">
          <v-card class="rounded-lg" elevation="1" style="width: 100%;">
            <v-card-title class="font-weight-light">
              <span class="primary--text font-weight-black"
                >@{{ loggedInUser.username }}</span
              >
              's Stats
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text>
              <!-- <v-rating
              :value="4.5"
              background-color="grey darken-3"
              color="amber"
              half-increments
              readonly
              dense
            ></v-rating>

            3 reviews -->
              <v-list>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon>mdi-shield-check-outline</v-icon>
                  </v-list-item-action>
                  <v-list-item-title>
                    Identity Verified
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="8" class="d-flex justify-center">
          <v-card class="rounded-lg" style="width: 100%;">
            <v-card-title class="font-weight-light">
              About &nbsp;
              <span class="font-weight-bold ml-2 primary--text">
                &nbsp; {{ loggedInUser.firstname }}</span
              >
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text
              >{{ loggedInUser.aboutMe }} Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Sed harum sequi animi necessitatibus
              labore libero doloremque quas quia quibusdam a.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary"
                ><v-icon left>mdi-pencil</v-icon>Edit</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  methods: {
    ...mapActions(['showToast', 'getProfile']),
  },
  created() {
    console.log(this.$route);
    console.log(this.$route.params.username);
  },
  mounted() {
    this.getProfile({ username: this.$route.params.username });
  },
};
</script>

<style></style>
