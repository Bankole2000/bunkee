<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :width="
        $vuetify.breakpoint.mdAndUp ? $vuetify.breakpoint.width / 4 : '320'
      "
      :style="{
        maxWidth: $vuetify.breakpoint.mdAndUp
          ? $vuetify.breakpoint.width / 3
          : '350'
      }"
      v-model="drawerRight"
      app
      right
      :permanent="drawerRight"
      :temporary="$vuetify.breakpoint.smAndDown"
    >
      <v-toolbar absolute style="width: 100%;">
        <v-btn icon @click.stop="drawerRight = !drawerRight">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <!-- <v-toolbar-title>Title</v-toolbar-title> -->
        <v-slide-x-reverse-transition duration="1" mode="out-in">
          <v-text-field
            v-if="isSearchingChat"
            hide-details
            single-line
            v-model="chatSearch"
          ></v-text-field>
          <v-toolbar-title v-if="!isSearchingChat">Your Chats</v-toolbar-title>
        </v-slide-x-reverse-transition>
        <v-spacer></v-spacer>
        <v-btn
          icon
          :color="isSearchingChat ? 'primary' : 'secondary'"
          @click="isSearchingChat = !isSearchingChat"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list dense>
        <v-list-item @click.stop="drawerRight = !drawerRight">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Close Chat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div style="overflow-y: scroll;">
        <v-list two-line>
          <template v-for="(item, index) in chat">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              v-text="item.header"
            ></v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-item
              class="pl-0"
              v-else
              :key="item.title"
              @click.stop="right = !right"
            >
              <v-badge
                bordered
                bottom
                dot
                offset-x="25"
                offset-y="25"
                :color="item.isOnline ? 'green accent-4' : 'grey lighten-2'"
              >
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
              </v-badge>

              <v-list-item-content>
                <!-- <v-list-item-title v-html="item.title"></v-list-item-title> -->
                <v-list-item-title
                  >{{ item.title }}
                  <v-chip
                    class="px-1"
                    v-if="item.isVerified"
                    x-small
                    color="blue"
                  >
                    <v-icon x-small class="white--text"
                      >mdi-check-decagram</v-icon
                    ></v-chip
                  >
                  <!-- <v-chip
                    class="px-1"
                    v-if="item.isHost"
                    x-small
                    color="primary"
                  >
                    <v-icon x-small class="white--text"
                      >mdi-home</v-icon
                    ></v-chip
                  > -->
                  <!-- <v-btn
                    icon
                    class="px-1"
                    v-if="item.isSeeking"
                    x-small
                    color="amber darken-3"
                  >
                    <v-icon x-small class="amber--text text--darken-3"
                      >mdi-account-multiple-plus</v-icon
                    ></v-btn
                  > -->
                  <v-chip
                    class="ml-1 px-1"
                    v-if="item.isSupport"
                    x-small
                    color="red accent-2"
                  >
                    <v-icon x-small class="white--text"
                      >mdi-shield-account</v-icon
                    ></v-chip
                  >
                  <span class="grey--text text--lighten-1">
                    &middot; {{ item.time }}</span
                  ></v-list-item-title
                >
                <v-list-item-subtitle
                  v-html="item.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar
      elevate-on-scroll
      app
      clipped
      color="grey"
      style="background-image: linear-gradient( to right, rgba(255,10,25,.43), rgba(25,10,255,.7));"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>App Name</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        v-model="profileMenu"
        bottom
        right
        transition="slide-x-transition"
        offset-y
        origin="top left"
      >
        <template v-slot:activator="{ on }">
          <v-chip pill class="transparent" v-on="on">
            <v-avatar left>
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-avatar>
            <span v-if="$vuetify.breakpoint.smAndUp">@username</span>
          </v-chip>
        </template>
        <v-card width="300">
          <v-list dark>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>@username</v-list-item-title>
                <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="menu = false">
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item @click="() => {}">
              <v-list-item-action>
                <v-icon>mdi-briefcase</v-icon>
              </v-list-item-action>
              <v-list-item-subtitle>john@gmail.com</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <v-menu
        :max-height="$vuetify.breakpoint.height / 1.2"
        style="overflow-y: scroll;"
        bottom
        right
        offset-y
        transition="slide-x-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn text icon class="mr-4" dark v-bind="attrs" v-on="on">
            <v-badge content="3" value="3" color="primary" overlap>
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card max-width="300" class="px-0">
          <v-toolbar style="width: 100%;" elevation="0">
            <v-toolbar-title>Notifications</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider inset></v-divider>
          <v-card-text class="pa-0">
            <div>
              <v-list three-line class="py-0">
                <v-list-item
                  v-for="(notif, index) in notifications"
                  :key="index"
                  @click="notifClick($event)"
                  class="pl-0"
                >
                  <v-badge
                    overlap
                    bordered
                    bottom
                    :icon="
                      notif.type == 'chat' ? 'mdi-forum' : 'mdi-home-account'
                    "
                    offset-x="25"
                    offset-y="25"
                    :color="notif.type == 'chat' ? 'primary' : 'blue'"
                  >
                    <v-list-item-avatar size="48">
                      <v-img :src="notif.userAvatar"></v-img>
                    </v-list-item-avatar>
                  </v-badge>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      class="text--primary"
                      v-if="notif.type == 'chat'"
                      ><span class="font-weight-bold">{{ notif.from }}</span>
                      sent you an invitation to chat
                      <span class="text-subtitle-2 grey--text"
                        >&middot; {{ notif.time }}</span
                      >
                    </v-list-item-subtitle>
                    <v-list-item-subtitle v-else class="text--primary">
                      <span class="font-weight-bold">{{ notif.from }}</span>
                      sent you another thing
                      <span class="text-subtitle-2 grey--text"
                        >&middot; {{ notif.time }}</span
                      >
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn block color="primary">
              View All Notifications
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>

      <v-btn text icon class="mr-4" @click.stop="drawerRight = !drawerRight">
        <v-badge content="3" value="3" color="primary" overlap>
          <v-icon>mdi-forum</v-icon>
        </v-badge></v-btn
      >
    </v-app-bar>
    <v-app-bar
      clipped
      app
      color="#fcb69f"
      dark
      :height="$vuetify.breakpoint.height / 3.5"
      shrink-on-scroll
      elevation="0"
      style="z-index: 0;"
      class="mt-14 d-flex justify-center"
      src="https://picsum.photos/1920/1080?random"
      ><v-toolbar-title :class="{ 'float-left': drawerRight }"
        >Page Title</v-toolbar-title
      >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to right, rgba(255,10,25,.33), rgba(25,10,255,.7)"
        ></v-img>
      </template>
    </v-app-bar>
    <v-card
      :class="{
        'mx-4': $vuetify.breakpoint.width > 450,
        'mt-n2': true,
        'mx-0': $vuetify.breakpoint.width < 450
      }"
      :min-width="
        drawerRight
          ? $vuetify.breakpoint.width / 2
          : $vuetify.breakpoint.width / 1.3
      "
      :max-width="$vuetify.breakpoint.width"
    >
      <v-toolbar flat>
        <!-- <v-toolbar-title class="grey--text">Title</v-toolbar-title> -->
        <v-text-field
          class="mt-7"
          rounded
          solo
          autofocus
          name="placeSearch"
          label="Search by Location, City, or State"
          id="test"
        ></v-text-field>
        <!-- <v-spacer></v-spacer> -->

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>

      <v-divider></v-divider>
      <v-slide-group
        v-model="model"
        class="py-4 px-0"
        center-active
        show-arrows
      >
        <v-slide-item
          v-for="n in 15"
          :key="n"
          v-slot:default="{ active, toggle }"
        >
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                @click="toggle"
                :elevation="active ? '4' : '2'"
                class="ma-4"
                :style="active ? 'scale: 1.05' : 'scale: 1'"
                max-width="300"
              >
                <v-img
                  class="white--text align-end"
                  height="200px"
                  gradient="to top, #00000033, #00000000"
                  src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                >
                  <v-card-title>Top 10 Australian beaches</v-card-title>
                </v-img>
                <v-list-item class="pl-0">
                  <v-badge
                    bordered
                    bottom
                    dot
                    offset-x="25"
                    offset-y="20"
                    color="green accent-4"
                  >
                    <v-list-item-avatar>
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
                        gradient="to top, #00000033, #00000000"
                      ></v-img>
                    </v-list-item-avatar>
                  </v-badge>

                  <v-list-item-content>
                    <v-list-item-title>@username123</v-list-item-title>
                    <v-list-item-subtitle
                      ><v-rating small :value="0" dense></v-rating
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-card-subtitle class="py-0">Number 10</v-card-subtitle>

                <v-card-text class="text--primary">
                  <div>Whitehaven Beach</div>

                  <div>Whitsunday Island, Whitsunday Islands</div>
                </v-card-text>

                <v-card-actions class="pa-0">
                  <v-card-title class="pt-0">
                    <v-rating
                      :value="4"
                      dense
                      color="orange"
                      background-color="orange"
                      hover
                      class="mr-2"
                    ></v-rating>
                    <span class="mt-2 float-right"
                      ><span class="font-weight-black">&#8358;5k </span>
                      <span class="font-weight-light">/ night</span></span
                    >
                  </v-card-title>
                </v-card-actions>
                <v-fade-transition>
                  <v-overlay
                    v-if="hover"
                    :opacity="0.05"
                    absolute
                    color="#036358EE"
                  >
                    <v-btn @click="active = true">See more info</v-btn>
                  </v-overlay>
                </v-fade-transition>
              </v-card>
            </template>
          </v-hover>
          <!-- <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            class="ma-4"
            height="270"
            width="180"
            @click="toggle">
            <v-row class="fill-height" align="center" justify="center">
              <v-scale-transition>
                <v-icon
                  v-if="active"
                  color="white"
                  size="48"
                  v-text="'mdi-close-circle-outline'"
                ></v-icon>
              </v-scale-transition>
            </v-row>
          </v-card> -->
        </v-slide-item>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet v-if="model != null" color="grey lighten-4" height="300" tile>
          <v-row class="fill-height" align="center" justify="center">
            <h3 class="title">Selected {{ model }}</h3>
          </v-row>
        </v-sheet>
      </v-expand-transition>
    </v-card>

    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item @click.stop="left = !left">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Open Temporary Drawer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-img
        :aspect-ratio="$vuetify.breakpoint.smAndUp ? 16 / 14.2 : 16 / 9"
        gradient="to top, rgba(255,10,25,.33), rgba(25,10,255,.7)"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      >
        <v-row align="end" class="lightbox white--text pa-2 fill-height">
          <v-col>
            <v-list-item-avatar size="62" class="mx-2">
              <img src="https://randomuser.me/api/portraits/men/81.jpg" />
            </v-list-item-avatar>
            <div class="subheading">@jonathan_lee</div>
            <div class="body-1">jonathan@gmail.com</div>
          </v-col>
        </v-row>
      </v-img>

      <v-list>
        <template v-for="(item, i) in leftItems">
          <v-divider v-if="item.divider" :key="i"></v-divider>
          <v-list-item v-else :key="item.title">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="left" fixed temporary></v-navigation-drawer>

    <!-- <v-main>
      <v-container class="fill-height" style="height: 200vw;" fluid>
        <v-row justify="center" align="center">
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn :href="source" icon large target="_blank" v-on="on">
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-main> -->

    <v-navigation-drawer
      v-model="right"
      :permanent="farRight"
      fixed
      right
      :width="
        $vuetify.breakpoint.mdAndUp ? $vuetify.breakpoint.width / 4 : '320'
      "
    >
      <v-list>
        <v-list-item two-line class="">
          <v-badge
            bordered
            bottom
            offset-x="27"
            offset-y="34"
            color="grey lighten-2"
          >
            <v-list-item-avatar size="62" class="mx-2">
              <img src="https://cdn.vuetifyjs.com/images/lists/ali.png" />
            </v-list-item-avatar>
          </v-badge>

          <v-list-item-content>
            <v-list-item-title class="text-h6"
              ><v-icon class="blue--text">mdi-check-decagram</v-icon>
              <v-icon class="amber--text">mdi-star</v-icon>
              <v-icon class="primary--text">mdi-shield-account</v-icon>
              @username123</v-list-item-title
            >
            <v-list-item-subtitle
              ><v-chip class="ma-1" small color="primary" outlined pill>
                <v-icon left small>mdi-home</v-icon>
                host
              </v-chip>
              <v-chip class="ma-1" small color="accent" outlined pill>
                <v-icon left small>mdi-account-group</v-icon>
                Seeker
              </v-chip>
              <v-chip class="ma-1" small color="blue" outlined pill>
                <v-icon left small>mdi-face-agent</v-icon>
                Agent
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item></v-list
      >
      <v-list dense>
        <v-list-item @click.stop="right = !right">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Close Chat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense>
        <v-list-item @click.stop="farRight = !farRight">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Open Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      fixed
      right
      :width="
        $vuetify.breakpoint.mdAndUp ? $vuetify.breakpoint.width / 4 : '320'
      "
      v-model="farRight"
    >
      <v-card tile max-width="375" elevation="0" class="mx-auto">
        <v-img
          gradient="to top, rgba(255,10,25,.33), rgba(25,10,255,.7)"
          src="https://cdn.vuetifyjs.com/images/lists/ali.png"
          height="292px"
          dark
        >
          <v-row class="fill-height pt-0">
            <v-card-title class="pt-0 mt-n0">
              <v-btn dark large icon @click.stop="farRight = !farRight">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn dark icon large class="mr-4">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn dark large icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title class="white--text pl-12 pt-16">
              <div class="display-1 pl-12 pt-16">Ali Conners</div>
            </v-card-title>
          </v-row>
        </v-img>

        <v-list two-line>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">mdi-phone</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>(650) 555-1234</v-list-item-title>
              <v-list-item-subtitle>Mobile</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>mdi-message-text</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item>
            <v-list-item-action></v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>(323) 555-6789</v-list-item-title>
              <v-list-item-subtitle>Work</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>mdi-message-text</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">mdi-email</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>aliconnors@example.com</v-list-item-title>
              <v-list-item-subtitle>Personal</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-action></v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>ali_connors@example.com</v-list-item-title>
              <v-list-item-subtitle>Work</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">mdi-map-marker</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>1400 Main Street</v-list-item-title>
              <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-footer
      inset
      app
      style="background-image: linear-gradient( to right, rgba(255,10,25,.43), rgba(25,10,255,.7));"
      color="blue-grey"
      class="white--text"
    >
      <span>App Name</span>
      <v-spacer></v-spacer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  methods: {
    notifClick(e) {
      console.log(e);
    }
  },
  computed: {
    chat() {
      if (this.chatSearch.trim()) {
        return this.items.filter((item) =>
          item.title.includes(this.chatSearch)
        );
      } else {
        return this.items;
      }
    }
  },
  data: () => ({
    profileMenu: false,
    notifications: [
      {
        title: 'Notification 1',
        type: 'chat',
        from: '@name321user',
        time: '3m ago',
        userAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
      },
      {
        title: 'Notification 2',
        type: 'news',
        from: '@ladyUser',
        time: '2d ago',
        userAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
      },
      {
        title: 'Notification 3',
        type: 'update',
        from: '@AppName',
        time: '1w ago',
        userAvatar: 'https://cdn.vuetifyjs.com/images/logos/v.png'
      },
      {
        title: 'Notification 4',
        type: 'listing',
        from: '@name321user',
        time: '24 Aug',
        userAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'
      }
      // {
      //   title: 'Notification 1',
      //   type: 'chat',
      //   from: '@name321user',
      //   time: '3m ago',
      //   userAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
      // },
      // {
      //   title: 'Notification 2',
      //   type: 'news',
      //   from: '@ladyUser',
      //   time: '2d ago',
      //   userAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
      // },
      // {
      //   title: 'Notification 3',
      //   type: 'update',
      //   from: '@AppName',
      //   time: '1w ago',
      //   userAvatar: 'https://cdn.vuetifyjs.com/images/logos/v.png'
      // },
      // {
      //   title: 'Notification 4',
      //   type: 'listing',
      //   from: '@name321user',
      //   time: '24 Aug',
      //   userAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'
      // },
      // {
      //   title: 'Notification 1',
      //   type: 'chat',
      //   from: '@name321user',
      //   time: '3m ago',
      //   userAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
      // },
      // {
      //   title: 'Notification 2',
      //   type: 'news',
      //   from: '@ladyUser',
      //   time: '2d ago',
      //   userAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
      // },
      // {
      //   title: 'Notification 3',
      //   type: 'update',
      //   from: '@AppName',
      //   time: '1w ago',
      //   userAvatar: 'https://cdn.vuetifyjs.com/images/logos/v.png'
      // }
    ],
    isSearchingChat: false,
    chatSearch: '',
    model: 0,
    drawer: null,
    drawerRight: true,
    right: false,
    left: false,
    farRight: false,
    cards: [
      {
        image: 'https://picsum.photos/1920/1080?random',
        title: 'Cool stay place',
        shortDesc: '',
        userAvatar: '',
        userUsername: '',
        placeRating: ''
      }
    ],
    items: [
      { header: 'Today', title: 'test', divider: true, inset: false },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: '@username234',
        time: '1s',
        isHost: true,
        isSeeking: true,
        isREA: false,
        isSupport: true,
        isOnline: true,
        subtitle:
          "&mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: '@user567',
        time: '2m',
        isOnline: true,
        isSeeking: true,
        isREA: false,
        isSupport: true,
        subtitle: "&mdash; Wish I could come, but I'm out of town this weekend."
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: '@ladyuser13',
        time: '10m',
        isHost: true,
        isVerified: true,
        isSeeking: true,
        isREA: false,
        isSupport: true,
        isOnline: false,
        subtitle:
          '&mdash; Do you have Paris recommendations? Have you ever been?'
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: '@person_yo',
        time: '1h',
        isHost: true,
        isVerified: true,
        isSeeking: true,
        isREA: false,
        isSupport: true,
        isOnline: true,
        subtitle:
          '&mdash; Have any ideas about what we should get Heidi for her birthday?'
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: '@individualist',
        time: '2h',
        isHost: true,
        isVerified: true,
        isSeeking: true,
        isREA: false,
        isSupport: true,
        isOnline: false,
        subtitle:
          '&mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: '@summertimeguy',
        time: '4h',
        isHost: true,
        isSeeking: true,
        isVerified: true,
        isREA: false,
        isSupport: true,
        isOnline: true,
        subtitle: "&mdash; Wish I could come, but I'm out of town this weekend."
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: '@ilovecake',
        time: '5h',
        isHost: true,
        isSeeking: true,
        isREA: false,
        isVerified: true,
        isSupport: true,
        isOnline: false,
        subtitle:
          '&mdash; Do you have Paris recommendations? Have you ever been?'
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: '@the_ghosted',
        time: '1d',
        isHost: true,
        isSeeking: true,
        isVerified: true,
        isREA: false,
        isSupport: true,
        isOnline: true,
        subtitle:
          '&mdash; Have any ideas about what we should get Heidi for her birthday?'
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: '@someonespecial',
        time: '2d',
        isHost: true,
        isSeeking: true,
        isVerified: true,
        isREA: false,
        isSupport: true,
        isOnline: false,
        subtitle:
          '&mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: '@user_name50',
        time: '2d',
        isHost: false,
        isSeeking: true,
        isREA: false,
        isVerified: true,
        isSupport: true,
        isOnline: true,
        subtitle: "&mdash; Wish I could come, but I'm out of town this weekend."
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: '@micheal_john',
        time: '01 Sep',
        isHost: true,
        isSeeking: true,
        isREA: false,
        isVerified: true,
        isSupport: true,
        isOnline: false,
        subtitle:
          '&mdash; Do you have Paris recommendations? Have you ever been?'
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: '@tony_zed',
        time: '31 Aug',
        isHost: true,
        isSeeking: true,
        isREA: false,
        isVerified: true,
        isSupport: true,
        isOnline: true,
        subtitle:
          '&mdash; Have any ideas about what we should get Heidi for her birthday?'
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: '@john_oliver',
        time: '30 Aug',
        isHost: true,
        isSeeking: true,
        isVerified: true,
        isREA: false,
        isSupport: true,
        isOnline: false,
        subtitle:
          '&mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
      }
    ],
    leftItems: [
      { icon: 'mdi-inbox', title: 'Inbox' },
      { icon: 'mdi-star', title: 'Starred' },
      { icon: 'mdi-send', title: 'Sent mail' },
      { icon: 'mdi-email-open', title: 'Drafts' },
      { divider: true },
      { icon: 'mdi-mail', title: 'All mail' },
      { icon: 'mdi-delete', title: 'Trash' },
      { icon: 'mdi-alert-circle', title: 'Spam' }
    ]
  })
};
</script>
