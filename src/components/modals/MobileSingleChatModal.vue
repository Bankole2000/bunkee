<template>
  <div class="mobile-single-chat-modal py-0 my-0">
    <v-list-item
      class="py-0 my-0"
      :class="dialog ? 'primary lighten-3' : ''"
      @click="dialog = true"
    >
      <v-badge bottom color="success accent-4" dot offset-x="28" offset-y="18">
        <v-list-item-avatar>
          <v-img :src="user.avatar"></v-img>
        </v-list-item-avatar>
      </v-badge>
      <v-list-item-content>
        <v-list-item-title v-text="user.title"></v-list-item-title>

        <v-list-item-subtitle v-text="user.subtitle"></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-list-item-action-text v-text="user.action"></v-list-item-action-text>
        <v-chip class="mb-2 ml-0" small color="primary">
          {{ Math.floor(Math.random() * 100) }}
        </v-chip>
      </v-list-item-action>
    </v-list-item>

    <!-- <v-divider></v-divider> -->

    <v-dialog
      v-model="dialog"
      max-width="450"
      :fullscreen="$vuetify.breakpoint.smAndDown"
      scrollable
      transition="dialog-bottom-transition"
      :class="{ 'rounded-xl': $vuetify.breakpoint.mdAndUp }"
    >
      <v-card
        class="px-0"
        :class="{ 'rounded-xl': $vuetify.breakpoint.mdAndUp }"
      >
        <v-card-title class="primary pa-0">
          <v-list-item>
            <MobileUserProfileModal />
            <v-list-item-content>
              <v-list-item-title class="subtitle-1 font-weight-bold">
                @ChatterUsername
              </v-list-item-title>
              <v-list-item-subtitle>online</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="dialog = false"
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </v-list-item-action>
          </v-list-item>
        </v-card-title>
        <v-card-text
          ref="chatWindow"
          class="chatWindow grey lighten-2 pt-4 pb-0 px-4 d-flex flex-column justify-start"
          :style="
            $vuetify.breakpoint.mdAndUp
              ? 'min-height: 450px; max-height: 450px;'
              : ''
          "
        >
          <!-- <v-list three-line subheader>
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
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Password</v-list-item-title>
                <v-list-item-subtitle
                  >Require password for purchase or use password to restrict
                  purchase</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list three-line subheader>
            <v-subheader>General</v-subheader>
            <v-list-item>
              <v-list-item-action>
                <v-checkbox v-model="notifications"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Notifications</v-list-item-title>
                <v-list-item-subtitle
                  >Notify me about updates to apps or games that I
                  downloaded</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <v-checkbox v-model="sound"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Sound</v-list-item-title>
                <v-list-item-subtitle
                  >Auto-update apps at any time. Data charges may
                  apply</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-for="n in 10" :key="n">
              <v-list-item-action>
                <v-checkbox v-model="widgets"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Auto-add widgets</v-list-item-title>
                <v-list-item-subtitle
                  >Automatically add home screen widgets</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list> -->
          <div
            class="px-4 py-2 my-2 text-center amber lighten-4 rounded-lg mx-auto caption"
          >
            This is the beginning of your chat with
            <span class="font-weight-bold">@ChatterUsername</span>
          </div>
          <div
            class="px-4 py-2 my-2 text-center blue lighten-4 rounded-lg mx-auto subtitle-2"
          >
            TODAY
          </div>
          <!-- <div
            class="px-4 py-2 my-2 text-left success lighten-2 rounded-bl-xl rounded-tr-xl rounded-tl-xl ml-8"
          >
            So here's a bunch of text that somebody sent
          </div> -->
          <div>
            <div>
              <div>
                <v-responsive
                  class="px-4 py-2 my-2 rounded-tr-xl rounded-tl-xl white"
                >
                  <div class=""></div>
                  <div>
                    <v-img
                      width="200"
                      aspect-ratio="1"
                      :src="require('@/assets/images/computerfamily.jpg')"
                    ></v-img>
                  </div>
                </v-responsive>
              </div>
            </div>
          </div>

          <v-slide-y-reverse-transition group>
            <div v-for="(message, i) in messages" :key="i">
              <div
                class="d-flex"
                :class="
                  messages.indexOf(message) % 2 == 0
                    ? 'justify-start'
                    : 'justify-end'
                "
              >
                <div>
                  <v-responsive
                    class="px-4 py-2 my-2 rounded-tr-xl rounded-tl-xl "
                    :class="
                      messages.indexOf(message) % 2 == 0
                        ? 'white rounded-br-xl mr-8'
                        : 'flex-row-reverse light-green accent-1 text-left rounded-bl-xl ml-8'
                    "
                  >
                    <div class="d-flex flex-nowrap align-end">
                      <p
                        class="black--text mb-0 subtitle-1"
                        style="word-break: break-all;"
                      >
                        {{ message.text }}
                      </p>
                      <span
                        class="caption grey--text ml-1 grow"
                        style="margin-bottom: 2px;"
                        :class="
                          messages.indexOf(message) % 2 == 0
                            ? 'text-left ml-4'
                            : 'text-right ml-4'
                        "
                        >{{ message.time }}
                        <v-icon
                          size="18"
                          class="mb-1"
                          v-if="messages.indexOf(message) % 2 == 1"
                          >mdi-check</v-icon
                        ></span
                      >
                    </div>
                  </v-responsive>
                </div>
              </div>
            </div>
          </v-slide-y-reverse-transition>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-1">
          <v-col cols="12">
            <v-text-field
              @keypress.enter="sendMessage"
              solo
              hint="Type a message"
              persistent-hint
              rounded
              class="mb-0 pb-n6"
              @click:append="sendMessage"
              @click:prepend="sendImageWithMessage"
              prepend-icon="mdi-camera-plus"
              append-icon="mdi-send"
              single-line
              placeholder="Type a message. Hit 'Enter' to send"
              v-model="chatMessage"
            ></v-text-field>
          </v-col>
          <!-- <v-spacer></v-spacer>
          <v-btn>Save</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import MobileUserProfileModal from './MobileUserProfileModal';
export default {
  props: ['user'],
  components: {
    MobileUserProfileModal,
  },
  sockets: {
    // connect: function() {
    //   console.log('Single Chat socket Connected');
    // },
    // chatMessage: function(data) {
    //   console.log(data);
    // },
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      chatMessage: '',
      messages: [],
      selected: '',
      sound: true,
      widgets: false,
    };
  },
  methods: {
    sendMessage() {
      const message = {};
      message.text = this.chatMessage;
      message.time = new Date(Date.now()).toLocaleString(['en-Us'], {
        hour: '2-digit',
        minute: '2-digit',
      });
      this.$socket.emit('chatMessage', message);
      this.messages.push(message);
      console.log({ message: this.chatMessage });
      this.chatMessage = '';
      console.log(this.$refs);

      // let i;
      // while (i < 200) {
      setTimeout(() => {
        // this.$refs.chatWindow.scrollTop += 1;
        this.$refs.chatWindow.scrollBy({
          top: this.$refs.chatWindow.offsetHeight,
          left: 0,
          behaviour: 'smooth',
        });
      }, 200);
      // i + 1;
    },
    sendImageWithMessage() {
      console.log('Send Image with message');
    },
  },
  mounted() {
    console.log(this.$socket.connect().connected);
  },
};
</script>

<style>
.chatWindow {
  scroll-behavior: smooth;
}
</style>
