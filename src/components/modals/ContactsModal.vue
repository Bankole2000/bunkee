<template>
  <div class="chat-modal" style="max-width: 500px;">
    <v-badge bordered overlap dot offset-x="20" offset-y="20">
      <v-btn icon @click="dialog = true">
        <v-icon>mdi-chat</v-icon>
      </v-btn>
    </v-badge>

    <v-dialog
      max-width="500"
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      scrollable
      persistent
      transition="dialog-bottom-transition"
      :class="{ 'rounded-xl': $vuetify.breakpoint.mdAndUp }"
    >
      <v-card
        max-width="500"
        :class="{ 'rounded-xl': $vuetify.breakpoint.mdAndUp }"
      >
        <v-card-title class="primary pa-0" elevation="1">
          <v-list-item>
            <v-list-item-avatar color="grey">
              <v-img :src="loggedInUser.profileImageUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="subtitle-1 font-weight-bold"
                >@{{ loggedInUser.username }}</v-list-item-title
              >
              <v-list-item-subtitle
                >Joined
                {{
                  new Date(loggedInUser.createdAt).toLocaleString(['en-US'], {
                    month: 'short',
                    day: '2-digit',
                    weekday: 'short',
                    year: 'numeric',
                  })
                }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="dialog = false"
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </v-list-item-action>
          </v-list-item>
        </v-card-title>

        <v-card-text
          class="pa-0"
          :style="
            $vuetify.breakpoint.mdAndUp
              ? 'min-height: 550px; max-height: 550px;'
              : ''
          "
        >
          <v-window v-model="step">
            <v-window-item :value="0">
              <!-- <MobileSingleChatModal class="mt-4" /> -->
              <v-card elevation="0" class="d-flex align-center justify-center"
                ><p class="mb-0 text-h5 font-weight-light pa-4">
                  Your Contacts
                </p>
              </v-card>
              <v-divider></v-divider>
              <v-list subheader class="mb-0 pb-0">
                <v-subheader class="headline font-weight-light pl-0 ml-8" inset
                  >Invites</v-subheader
                >
              </v-list>
              <v-list
                subheader
                class="py-0"
                v-for="contact in invites"
                :key="contact.id"
              >
                <ChatModal :contact="contact" :key="contactModalKey" />
              </v-list>

              <v-list subheader class="mb-0 pb-0">
                <v-divider></v-divider>
                <v-subheader class="headline font-weight-light pl-0 ml-8" inset
                  >Contacts</v-subheader
                >
              </v-list>
              <v-list
                subheader
                class="py-0"
                v-for="contact in contacts"
                :key="contact.id"
              >
                <ChatModal :contact="contact" :key="contactModalKey" />
              </v-list>
              <v-list class="py-0" subheader>
                <v-divider></v-divider>

                <v-subheader class="headline font-weight-light pl-0 ml-8" inset
                  >Blocked</v-subheader
                >
              </v-list>
              <!-- <v-list
                subheader
                class="py-0"
                v-for="(item, i) in items"
                :key="i"
              >
                <MobileSingleChatModal :user="item" />
                <v-divider v-if="i == 2"></v-divider>
                <v-subheader
                  v-if="i == 2"
                  class="headline font-weight-light pl-0 ml-8"
                  inset
                  >Contacts</v-subheader
                >
                <v-divider v-if="i == 7"></v-divider>
                <v-subheader
                  v-if="i == 7"
                  class="headline font-weight-light pl-0 ml-8"
                  inset
                  >Blocked</v-subheader
                >
              </v-list> -->

              <!-- <v-list two-line>
            <template v-for="(item, index) in items">
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

              <v-list-item v-else :key="item.title">
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="item.subtitle"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text
                    v-text="item.action"
                  ></v-list-item-action-text>

                  <v-icon color="yellow">
                    mdi-star
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
            </template>
            <v-divider></v-divider>
          </v-list>
          <v-list three-line subheader>
            <v-subheader>User Controls</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Content filtering</v-list-item-title>
                <v-list-item-subtitle
                  >Set the content filtering level to restrict apps that can be
                  downloaded</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list> -->
              <v-divider></v-divider>
            </v-window-item>
            <v-window-item :value="1">
              <v-card elevation="0" class="d-flex align-center justify-center"
                ><p class="mb-0 text-h5 font-weight-light pa-4">
                  Chat Rooms
                </p>
              </v-card>
              <v-divider></v-divider>
            </v-window-item>
            <v-window-item :value="2">
              <v-card elevation="0" class="d-flex align-center justify-center"
                ><p class="mb-0 text-h5 font-weight-light pa-4">
                  User Directory
                </p>
              </v-card>
              <v-divider></v-divider>
            </v-window-item>
          </v-window>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions
          style="height:70px;"
          class="align-center justify-center"
        >
          <v-btn-toggle
            v-model="step"
            class="d-flex"
            active-class="primary"
            rounded
          >
            <v-btn class="px-auto" @click="step = 1">
              <v-icon left>mdi-chat</v-icon>
              Contacts
            </v-btn>

            <v-btn class="px-auto" @click="step = 3">
              <v-icon left>mdi-map-marker</v-icon>
              Rooms
            </v-btn>
            <v-btn class="px-4" @click="step = 2">
              <v-icon left>mdi-account-group</v-icon>
              Users
            </v-btn>
            <!-- <v-btn>
              <v-icon>mdi-format-align-justify</v-icon>
            </v-btn> -->
          </v-btn-toggle>

          <!-- <v-spacer></v-spacer>
          <v-btn>Save</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ChatModal from '../modals/ChatModal';
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    ChatModal,
  },

  data() {
    return {
      selected: [2],
      step: 0,
      contactModalKey: 0,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          action: '15 min',
          headline: 'Brunch this weekend?',
          title: 'Ali Connors',
          subtitle:
            "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          action: '2 hr',
          headline: 'Summer BBQ',
          title: 'me, Scrott, Jennifer',
          subtitle: "Wish I could come, but I'm out of town this weekend.",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          action: '6 hr',
          headline: 'Oui oui',
          title: 'Sandra Adams',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          action: '12 hr',
          headline: 'Birthday gift',
          title: 'Trevor Hansen',
          subtitle:
            'Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          action: '18hr',
          headline: 'Recipe to try',
          title: 'Britta Holt',
          subtitle:
            'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          action: '15 min',
          headline: 'Brunch this weekend?',
          title: 'Ali Connors',
          subtitle:
            "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          action: '2 hr',
          headline: 'Summer BBQ',
          title: 'me, Scrott, Jennifer',
          subtitle: "Wish I could come, but I'm out of town this weekend.",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          action: '6 hr',
          headline: 'Oui oui',
          title: 'Sandra Adams',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          action: '12 hr',
          headline: 'Birthday gift',
          title: 'Trevor Hansen',
          subtitle:
            'Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          action: '18hr',
          headline: 'Recipe to try',
          title: 'Britta Holt',
          subtitle:
            'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          action: '15 min',
          headline: 'Brunch this weekend?',
          title: 'Ali Connors',
          subtitle:
            "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          action: '2 hr',
          headline: 'Summer BBQ',
          title: 'me, Scrott, Jennifer',
          subtitle: "Wish I could come, but I'm out of town this weekend.",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          action: '6 hr',
          headline: 'Oui oui',
          title: 'Sandra Adams',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          action: '12 hr',
          headline: 'Birthday gift',
          title: 'Trevor Hansen',
          subtitle:
            'Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          action: '18hr',
          headline: 'Recipe to try',
          title: 'Britta Holt',
          subtitle:
            'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['updateUserContacts']),
    forceRerender() {
      this.contactModalKey += 1;
    },
  },
  sockets: {
    // newLogin: function(data) {
    //   if (this.currentUserContacts) {
    //     this.currentUserContacts.forEach((contact) => {
    //       if (data.uuid == contact.inviter.uuid) {
    //         this.updateUserContacts({
    //           uuid: data.uuid,
    //           status: data.isOnline,
    //           lastSeen: data.lastSeen,
    //           contactId: contact.id,
    //         });
    //       }
    //     });
    //   }
    //   console.log(data);
    //   this.forceRerender();
    // },
    // userLogout: function(data) {
    //   console.log(this.currentUserContacts);
    //   this.currentUserContacts
    //     .forEach((contact) => {
    //       if (data.uuid == contact.inviter.uuid) {
    //         this.updateUserContacts({
    //           uuid: data.uuid,
    //           status: data.isOnline,
    //           lastSeen: data.lastSeen,
    //           contactId: contact.id,
    //         });
    //       }
    //     })
    //     .then(() => {
    //       this.forceRerender();
    //     });
    //   console.log(data);
    // },
  },
  computed: {
    ...mapGetters(['loggedInUser', 'currentUserContacts']),
    invites() {
      return this.currentUserContacts.filter(
        (contact) =>
          !contact.hasBeenAccepted &&
          !contact.hasBeenDeclined &&
          !contact.isBlocked
      );
    },
    contacts() {
      return this.currentUserContacts.filter(
        (contact) =>
          contact.hasBeenAccepted &&
          !contact.isBlocked &&
          !contact.hasBeenDeclined
      );
    },
  },
  beforeMount() {
    this.forceRerender();
  },
  mounted() {
    console.log(this.invites);
  },
};
</script>

<style></style>
