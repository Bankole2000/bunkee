<template>
  <div class="new-stuff black white--text">
    <v-container>
      <div class="d-flex align-center">
        <div>
          <v-card-title class="font-weight-bold display-1 pl-0"
            >Meet Online Experiences
          </v-card-title>
          <v-card-subtitle class="pl-0">
            Interactive Experiences you can do together, led by expert hosts.
          </v-card-subtitle>
        </div>
        <v-spacer></v-spacer>
        <v-btn>Explore All</v-btn>
      </div>
    </v-container>
    <v-container class="mt-0 mx-auto pb-0">
      <v-row>
        <v-col cols="12" sm="6">
          <v-hover v-slot:default="{ hover }">
            <v-card elevation="0">
              <v-img :src="require(`@/assets/images/kitchen.jpg`)"></v-img>
              <v-slide-y-reverse-transition>
                <v-overlay v-if="hover" :opacity="0.9" absolute color="white">
                  <div class="pa-4 text-center grey--text text--darken-4">
                    <p class="text-h4">
                      We're all in this together
                    </p>
                    <p class="text-h5">
                      Join Our Global Community of retirees who have each
                      other's back during these tough times
                    </p>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Laudantium possimus harum eum vero, error corrupti
                      architecto blanditiis sed! Accusantium, odio!
                    </p>
                    <v-btn x-large class="secondary" style="font-size: 130%;"
                      >Become a free member</v-btn
                    >
                  </div>
                </v-overlay>
              </v-slide-y-reverse-transition>
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="6">
          <v-row>
            <v-col class="pt-0 pl-0" cols="12" sm="6">
              <v-hover v-slot:default="{ hover }">
                <v-card elevation="0">
                  <v-img
                    height="100%"
                    :src="require(`@/assets/images/elderlyyoungertalking.jpg`)"
                  >
                    <v-btn text absolute class="success primary--text" left top>
                      <span>Earn</span>
                    </v-btn>
                  </v-img>
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out success v-card--reveal primary--text pa-2"
                      style="height: 60%;"
                    >
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Commodi, dicta.
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-hover></v-col
            >
            <v-col cols="12" class="pt-0 pl-0" sm="6">
              <v-hover v-slot:default="{ hover }">
                <v-card elevation="0">
                  <v-img
                    height="100%"
                    :src="require(`@/assets/images/elderlycouple.jpg`)"
                  >
                    <v-btn text absolute class="accent primary--text" right top>
                      <span>Learn</span>
                    </v-btn></v-img
                  >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out accent v-card--reveal primary--text pa-2"
                      style="height: 60%;"
                    >
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Commodi, dicta.
                    </div>
                  </v-expand-transition>
                </v-card></v-hover
              ></v-col
            >
          </v-row>
          <v-row>
            <v-col cols="12" class="pt-0 pl-0" sm="6">
              <v-hover v-slot:default="{ hover }">
                <v-card elevation="0">
                  <v-img
                    height="100%"
                    :src="require(`@/assets/images/elderlysocialnetwork.jpg`)"
                    ><v-btn text absolute class="info primary--text" left top>
                      <span>Experience</span>
                    </v-btn></v-img
                  >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out info v-card--reveal primary--text pa-2"
                      style="height: 60%;"
                    >
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Commodi, dicta.
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-hover>
            </v-col>
            <v-col cols="12" class="pt-0 pl-0" sm="6">
              <v-hover v-slot:default="{ hover }">
                <v-card elevation="0">
                  <v-img
                    height="100%"
                    :src="require(`@/assets/images/grandparents.jpg`)"
                    ><v-btn
                      text
                      absolute
                      class="secondary primary--text"
                      right
                      top
                    >
                      <span>Connect</span>
                    </v-btn></v-img
                  >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out secondary v-card--reveal primary--text pa-2"
                      style="height: 60%;"
                    >
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Commodi, dicta.
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-hover></v-col
            >
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  word-break: break-word;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
