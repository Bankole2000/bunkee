<template>
  <div class="">
    <v-row no-gutters>
      <v-col
        class="d-flex text-center"
        v-if="$vuetify.breakpoint.smAndUp"
        cols="12"
        sm="6"
        md="7"
        lg="8"
      >
        <v-card tile>
          <v-img
            :height="$vuetify.breakpoint.height - 70"
            class="d-flex align-center justify-center pa-0 ma-0"
            elevation="0"
            tile
            dark
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            gradient="to top right, rgba(255,10,25,.33), rgba(25,10,255,.7)"
          >
            <!-- <v-card-title>Here's some Text</v-card-title> -->
            <v-row class="d-flex" align="center" justify="center">
              <v-col class="text-center" cols="12">
                <!-- <h1 class="display-1 font-weight-black mb-4">Vuetify.js</h1> -->
                <h1 class="text-h1 font-weight-black mb-4">Vuetify.js</h1>
                <h4 class="text-h4">Build your application today!</h4>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="5" lg="4">
        <v-card
          class="d-flex pa-6 align-center justify-center text-center"
          width="100%"
          elevation="0"
          tile
        >
          <div style="width: 100%;">
            <v-card tile elevation="0" class="mx-auto">
              <SignupForm />
            </v-card>
            <div class="or">
              <hr class="bar" />
              <span>OR</span>
              <hr class="bar" />
            </div>
            <div class="mx-auto d-flex flex-column" style="width: 90%;">
              <v-btn large block color="red accent-2" class="mb-4" dark>
                <v-icon left>mdi-google</v-icon>
                Signup with Google</v-btn
              >
              <v-btn large block color="blue darken-2" dark>
                <v-icon left>mdi-facebook</v-icon>
                SIgnup with Facebook</v-btn
              >
            </div>
            <p class="font-weight-light my-4">
              Already have an account?
              <router-link to="/login" class="font-weight-bold"
                ><span class="font-weight-bold">Login</span></router-link
              >
            </p>
            <p
              class="text-caption font-weight-light mb-0 align-self-end mt-16"
              :class="{ 'pt-10': $vuetify.breakpoint.smAndDown }"
              v-if="$vuetify.breakpoint.mdAndUp"
            >
              <router-link to="/help" class="text-decoration-none"
                ><span class="text-decoration-none"
                  >Help & Support</span
                ></router-link
              >
              &middot;
              <router-link to="/tos" class="text-decoration-none"
                ><span>Terms of Service</span></router-link
              >
              &middot;
              <router-link to="/policy" class="text-decoration-none"
                ><span>Privacy Policy</span></router-link
              >
            </p>
            <p class="text-caption font-weight-light mb-0 align-self-end">
              &copy; {{ new Date().getFullYear() }} -
              <router-link to="/" class="text-decoration-none"
                ><span>{{ config.appName }}</span></router-link
              >
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import colors from 'vuetify/lib/util/colors';
import { config } from '../helpers/config';
import SignupForm from '../forms/Signup';

export default {
  components: {
    SignupForm,
  },
  data() {
    return {
      config,
    };
  },
  created() {
    console.log('test', colors);
    console.log(this.$vuetify);
  },

  computed: {},
};
</script>

<style>
.or {
  display: flex;
  flex-direction: row;
  margin-bottom: 1.2rem;
  align-items: center;
}

.or .bar {
  flex: auto;
  border: none;
  height: 1px;
  background: #aaa;
}

.or span {
  color: #ccc;
  padding: 0 0.8rem;
}
</style>
