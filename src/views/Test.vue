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
                <v-list-item-title v-html="item.title"></v-list-item-title>
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
      clipped-right
      color="grey"
      style="background-image: linear-gradient( to right, rgba(255,10,25,.43), rgba(25,10,255,.7));"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click.stop="drawerRight = !drawerRight"
      ></v-app-bar-nav-icon>
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
      :class="{ 'mx-4': drawerRight, 'mt-n2': true, 'mx-auto': !drawerRight }"
      :min-width="
        drawerRight
          ? $vuetify.breakpoint.width / 2
          : $vuetify.breakpoint.width / 1.3
      "
      :max-width="$vuetify.breakpoint.width / 1.2"
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
      <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
        <v-slide-item
          v-for="n in 15"
          :key="n"
          v-slot:default="{ active, toggle }"
        >
          <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            class="ma-4"
            height="200"
            width="100"
            @click="toggle"
          >
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
          </v-card>
        </v-slide-item>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet v-if="model != null" color="grey lighten-4" height="200" tile>
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
            <div class="subheading">Jonathan Lee</div>
            <div class="body-1">heyfromjonathan@gmail.com</div>
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
      <span>Vuetify</span>
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
    isSearchingChat: false,
    chatSearch: '',
    model: null,
    drawer: null,
    drawerRight: true,
    right: false,
    left: false,
    farRight: false,
    items: [
      { header: 'Today', title: 'test', divider: true, inset: false },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        isOnline: true,
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        isOnline: true,
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui',
        isOnline: false,
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift',
        isOnline: true,
        subtitle:
          "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Recipe to try',
        isOnline: false,
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ 2 <span class="grey--text text--lighten-1">4</span>',
        isOnline: true,
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui 2',
        isOnline: false,
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift 2',
        isOnline: true,
        subtitle:
          "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Recipe to try 2',
        isOnline: false,
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ 3 <span class="grey--text text--lighten-1">4</span>',
        isOnline: true,
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui 3',
        isOnline: false,
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift 3',
        isOnline: true,
        subtitle:
          "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },
      { title: 'test', divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Recipe to try 3',
        isOnline: false,
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
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
