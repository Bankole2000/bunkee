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
        <v-card>
          <v-img
            :height="$vuetify.breakpoint.height"
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
      <v-col class="d-flex text-center" cols="12" sm="6" md="5" lg="4">
        <v-card
          :height="$vuetify.breakpoint.height"
          class="d-flex pa-6 align-center justify-center"
          width="100%"
          elevation="3"
          tile
        >
          <div style="width: 100%;">
            <v-card tile elevation="0" class="mx-auto">
              <v-card-title
                class="title font-weight-regular justify-space-between"
              >
                <span>{{ currentTitle }}</span>
                <v-avatar
                  color="primary lighten-2"
                  class="subheading white--text"
                  size="24"
                  v-text="step"
                ></v-avatar>
              </v-card-title>

              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-card-text class="mb-0 pb-0">
                    <v-text-field
                      label="Email"
                      outlined
                      value="john@vuetifyjs.com"
                    ></v-text-field>
                    <v-text-field
                      label="Username"
                      outlined
                      value="coolperson123"
                    ></v-text-field>
                    <span
                      v-if="$vuetify.breakpoint.smAndUp"
                      class="caption grey--text text--darken-1"
                    >
                      This is the email and username you will use to login to
                      your Vuetify account
                    </span>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="2">
                  <v-card-text class="mb-0 pb-0">
                    <v-text-field
                      outlined
                      label="First Name"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      outlined
                      label="Last Name"
                      type="text"
                    ></v-text-field>
                    <v-select
                      :items="['Male', 'Female', 'Decline to say']"
                      solo
                      label="Gender"
                    ></v-select>
                    <span
                      v-if="$vuetify.breakpoint.smAndUp"
                      class="caption grey--text text--darken-1"
                    >
                      Just some personal details for your bio.
                    </span>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="3">
                  <v-card-text class="mb-0 pb-0">
                    <v-text-field
                      outlined
                      label="Password"
                      type="password"
                    ></v-text-field>
                    <v-text-field
                      outlined
                      label="Confirm Password"
                      type="password"
                    ></v-text-field>
                    <v-checkbox
                      v-model="checkbox"
                      :label="`Checkbox 1: ${checkbox.toString()}`"
                    ></v-checkbox>
                    <span
                      v-if="$vuetify.breakpoint.smAndUp"
                      class="caption grey--text text--darken-1"
                    >
                      Please enter a password for your account
                    </span>
                  </v-card-text>
                </v-window-item>

                <v-window-item :value="4">
                  <div class="pa-4 text-center">
                    <v-img
                      class="mb-4"
                      contain
                      height="128"
                      src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                    ></v-img>
                    <h3 class="title font-weight-light mb-2">
                      Welcome to Vuetify
                    </h3>
                    <span class="caption grey--text"
                      >Thanks for signing up!</span
                    >
                  </div>
                </v-window-item>
              </v-window>

              <v-divider></v-divider>

              <v-card-actions>
                <v-btn :disabled="step === 1" text @click="step--">
                  Back
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="step === 4"
                  color="primary"
                  depressed
                  @click="step++"
                >
                  Next
                </v-btn>
              </v-card-actions>
            </v-card>
            <div class="or" v-if="step < 2">
              <hr class="bar" />
              <span>OR</span>
              <hr class="bar" />
            </div>
            <div
              v-if="step < 2"
              class="mx-auto d-flex flex-column"
              style="width: 90%;"
            >
              <v-btn large block color="red accent-2" class="mb-4" dark>
                <v-icon left>mdi-google</v-icon>
                Login with Google</v-btn
              >
              <v-btn large block color="blue darken-2" dark>
                <v-icon left>mdi-facebook</v-icon>
                Login with Facebook</v-btn
              >
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import colors from 'vuetify/lib/util/colors';

export default {
  data() {
    return {
      step: 1,
      checkbox: false
    };
  },
  created() {
    console.log('test', colors);
    console.log(this.$vuetify);
  },

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'Sign-up';
        case 2:
          return 'Basic Profile Setup';
        case 3:
          return 'Create a password';
        default:
          return 'Account created';
      }
    }
  }
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
