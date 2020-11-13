<template>
  <div class="offer">
    <v-card elevation="3" class="rounded-xl">
      <v-card-title class="pt-2 px-2 pb-0"
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
            <v-btn icon large class="ma-2">
              <v-icon size="32">mdi-dots-horizontal</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card-title>
      <!-- <v-divider></v-divider> -->
      <v-card-text class="py-0">
        <p class="mb-0 text-subtitle-1 ml-2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore
          sint pariatur error, delectus dolores impedit possimus quam
          accusantium magni explicabo.
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
          ><v-icon left size="20">mdi-gender-female</v-icon> F</v-chip
        >
        <v-chip class="mx-1"
          ><v-icon left size="20">mdi-calendar-account</v-icon> 28yo</v-chip
        >
        <v-chip class="mx-1"
          ><v-icon left size="20">mdi-cash</v-icon> &#8358;150k</v-chip
        >
        <v-spacer></v-spacer>
        <v-btn color="primary" text class="mx-1 rounded-xl">
          More <v-icon right>mdi-menu-right</v-icon>
        </v-btn>
      </div>

      <v-divider></v-divider>
      <v-card-text class="d-flex justify-space-around pb-0 pt-2 px-0"
        ><v-btn
          text
          large
          :color="show ? 'primary' : ''"
          class="rounded-xl"
          width="23%"
          @click="show = !show"
          ><v-icon left>mdi-chat-outline</v-icon>5</v-btn
        >
        <v-btn text width="23%" large class="rounded-xl"
          ><v-icon left>mdi-send</v-icon>89</v-btn
        >
        <v-btn text width="23%" large class="rounded-xl"
          ><v-icon left>mdi-share</v-icon>89</v-btn
        >
        <v-btn text width="23%" large class="rounded-xl"
          ><v-icon left>mdi-heart-outline</v-icon>89</v-btn
        >
      </v-card-text>
      <v-card-actions class="pt-1 pb-0">
        <v-expand-transition>
          <v-card
            elevation="0"
            style="width: 100%;"
            v-show="show"
            class="px-4 pb-0 rounded-xl"
          >
            <v-divider></v-divider>
            <p
              class="my-4 font-weight-medium primary--text"
              style="cursor: pointer;"
              @click="() => {}"
            >
              View previous comments
            </p>

            <!-- Existing Comment -->
            <div class="d-flex align-start mt-2">
              <v-avatar size="40" class="mr-2">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                ></v-img>
              </v-avatar>
              <v-card
                elevation="0"
                style="width: 100%;"
                class="grey lighten-4 rounded-xl"
              >
                <v-card-subtitle
                  class="d-flex black--text pt-2 pb-1 font-weight-bold"
                  ><span
                    >@username &middot;
                    <span class="font-weight-light">8h</span></span
                  ><v-spacer></v-spacer
                  ><v-btn small icon
                    ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                  ></v-card-subtitle
                >
                <v-card-text class="py-0"
                  >Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Alias, earum. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Odio a neque deleniti officiis adipisci quia
                  quibusdam magnam sequi eius officia?</v-card-text
                >
                <v-card-actions
                  class="d-flex justify-space-around"
                  style="position: relative;"
                >
                  <!-- <v-chip
                    class="white black--text"
                    elevation="1"
                    style="position: absolute; top: 0; right: 0;"
                  >
                    <v-icon left>mdi-thumb-up</v-icon> 90
                  </v-chip> -->
                  <v-btn text width="45%" class="rounded-xl text-capitalize"
                    ><v-icon left>mdi-chat-outline</v-icon>(89)</v-btn
                  >
                  <v-divider vertical class="mx-2"></v-divider>
                  <v-btn text width="45%" class="rounded-xl text-capitalize"
                    ><v-icon left>mdi-heart-outline</v-icon>(5)</v-btn
                  >
                  <!-- <v-btn
                    absolute
                    color="blue"
                    class="white--text"
                    fab
                    small
                    right
                    top
                  >
                    <v-icon>mdi-thumb-up</v-icon>
                  </v-btn> -->
                </v-card-actions></v-card
              >
            </div>
            <!-- Existing Comment Reply -->
            <div class="d-flex align-start ml-16 mt-2">
              <v-avatar size="36" class="mr-2">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/lists/4.jpg"
                ></v-img>
              </v-avatar>
              <v-card
                elevation="0"
                style="width: 100%;"
                class="grey lighten-4 rounded-xl"
              >
                <v-card-subtitle
                  class="d-flex black--text pt-2 pb-1 pr-2 font-weight-bold"
                  ><span
                    >@username &middot;
                    <span class="font-weight-light">5m</span> </span
                  ><v-spacer></v-spacer
                  ><v-btn small icon
                    ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                  ></v-card-subtitle
                >
                <v-card-text class="py-0"
                  >Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Alias, earum. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Odio a neque deleniti officiis adipisci quia
                  quibusdam magnam sequi eius officia?</v-card-text
                >
                <v-card-actions
                  class="d-flex justify-space-around"
                  style="position: relative;"
                >
                  <!-- <v-chip
                    class="white black--text"
                    elevation="1"
                    style="position: absolute; top: 0; right: 0;"
                  >
                    <v-icon left>mdi-thumb-up</v-icon> 90
                  </v-chip> -->
                  <v-btn text width="45%" class="rounded-xl text-capitalize"
                    ><v-icon left>mdi-chat-outline</v-icon>(89)</v-btn
                  >
                  <v-divider vertical class="mx-2"></v-divider>
                  <v-btn width="45%" text class="rounded-xl text-capitalize"
                    ><v-icon left>mdi-heart-outline</v-icon>(5)</v-btn
                  >
                  <!-- <v-btn
                    absolute
                    color="blue"
                    class="white--text"
                    fab
                    small
                    right
                    top
                  >
                    <v-icon>mdi-thumb-up</v-icon>
                  </v-btn> -->
                </v-card-actions></v-card
              >
            </div>
            <!-- Reply to comment / comment reply -->
            <v-divider class="mt-4" inset></v-divider>
            <div class="d-flex align-start mb-0 ml-16 mt-4">
              <v-avatar size="36" class="mr-2">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/lists/5.jpg"
                ></v-img>
              </v-avatar>
              <v-textarea
                placeholder="Write a reply..."
                rows="1"
                auto-grow
                filled
                dense
                rounded
                append-icon="mdi-send"
                single-line
              ></v-textarea>
            </div>
            <!-- Write a Comment Text Field -->
            <v-divider class="mt-4"></v-divider>
            <div class="d-flex align-start mb-0 mt-4">
              <v-avatar size="40" class="mr-2">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/lists/5.jpg"
                ></v-img>
              </v-avatar>
              <v-textarea
                placeholder="Write a comment..."
                rows="1"
                auto-grow
                filled
                dense
                rounded
                append-icon="mdi-send"
                single-line
              ></v-textarea>
            </div>
          </v-card>
        </v-expand-transition>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style></style>
