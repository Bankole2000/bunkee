<template>
  <div class="mobile-single-chat-modal py-0 my-0">
    <v-list-item
      class="py-0 my-0"
      :class="dialog ? 'primary lighten-3' : ''"
      @click="dialog = true"
    >
      <v-badge
        bottom
        :color="chattee.isOnline ? 'success' : 'grey'"
        dot
        offset-x="28"
        offset-y="18"
      >
        <v-list-item-avatar>
          <v-img :src="chattee.profileImageUrl"></v-img>
        </v-list-item-avatar>
      </v-badge>
      <v-list-item-content>
        <v-list-item-title v-text="chattee.username"></v-list-item-title>

        <v-list-item-subtitle v-text="chattee.isOnline"></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-list-item-action-text
          ><v-btn small fab v-if="isInviter" text color="info">
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn small fab v-if="isInvitee" text color="success">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn></v-list-item-action-text
        >
        <!-- <v-chip class="mb-2 ml-0" small color="primary">
          {{ Math.floor(Math.random() * 100) }}
        </v-chip> -->
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
            <ProfileModal :user="chattee" />
            <v-list-item-content>
              <v-list-item-title class="subtitle-1 font-weight-bold">
                @{{ chattee.username }}
              </v-list-item-title>
              <v-list-item-subtitle>{{
                chattee.isOnline
                  ? `online`
                  : `offline - Last seen ${chattee.lastSeen}`
              }}</v-list-item-subtitle>
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
          id="chatWindow"
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
            <span class="font-weight-bold">@{{ chattee.username }}</span>
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
          <!-- <div>
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
          </div> -->

          <v-slide-y-reverse-transition group>
            <div v-for="(message, i) in messages" :key="i">
              <div
                class="d-flex"
                :class="
                  message.senderId !== loggedInUser.id
                    ? 'justify-start'
                    : 'justify-end'
                "
              >
                <div>
                  <v-responsive
                    class="px-4 py-2 my-2 rounded-tr-xl rounded-tl-xl "
                    :class="
                      message.senderId !== loggedInUser.id
                        ? 'white rounded-br-xl mr-8'
                        : 'flex-row-reverse light-green accent-1 text-left rounded-bl-xl ml-8'
                    "
                  >
                    <div class="d-flex flex-nowrap align-end">
                      <p
                        class="black--text mb-0 subtitle-1"
                        style="word-break: break-all;"
                        v-html="message.messageText"
                      >
                        {{ message.messageText }}
                      </p>
                      <span
                        class="caption grey--text ml-1 grow"
                        style="margin-bottom: 2px;"
                        :class="
                          message.senderId !== loggedInUser.id
                            ? 'text-left ml-4'
                            : 'text-right ml-4'
                        "
                        >{{
                          new Date(message.createdAt).toLocaleString(
                            ['en-US'],
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            }
                          )
                        }}
                        <v-icon
                          size="18"
                          class="mb-1"
                          :class="{ 'info--text': message.hasBeenRead }"
                          v-if="message.senderId == loggedInUser.id"
                          >{{
                            message.hasBeenDelivered
                              ? ' mdi-check-all'
                              : 'mdi-check'
                          }}</v-icon
                        ></span
                      >
                    </div>
                  </v-responsive>
                </div>
              </div>
            </div>
          </v-slide-y-reverse-transition>
          <div
            v-if="
              !contact.hasBeenAccepted &&
                !contact.hasBeenDeclined &&
                !contact.isBlocked
            "
            style="width: 100%;"
            class="px-4 pt-2 pb-0 my-2 text-center blue lighten-4 rounded-lg mx-auto subtitle-2"
          >
            <p class="mb-0 mt-2 subtitle-1" v-if="isInviter">
              You sent a chat invite to
              <span class="font-weight-black"
                >@{{ contact.invitee.username }}</span
              >
            </p>
            <p class="mb-0 mt-2 subtitle-1" v-if="isInvitee">
              <span class="font-weight-black"
                >@{{ contact.inviter.username }}</span
              >
              sent you an invite to chat
            </p>
            <v-row
              v-if="isInvitee"
              class="d-flex pa-4 align-center justify-space-around"
            >
              <v-btn
                @click="declineInvite(contact.id)"
                :loading="isLoadingCancel"
                :disabled="buttonsBusy"
                text
                color="error"
                class="text-capitalize"
              >
                <v-icon left>mdi-cancel</v-icon>
                Decline
              </v-btn>

              <v-btn
                @click="acceptInvite(contact.id)"
                :loading="isLoadingAccept"
                :disabled="buttonsBusy"
                text
                color="success"
                class="text-capitalize"
              >
                <v-icon left>mdi-check</v-icon>
                Accept
              </v-btn>
            </v-row>
            <v-row
              v-if="isInviter"
              class="d-flex pa-4 align-center justify-space-around"
            >
              <v-btn
                @click="cancelInvite(contact.id)"
                :loading="isLoadingCancel"
                :disabled="buttonsBusy"
                text
                color="error"
                class="text-capitalize"
              >
                <v-icon left>mdi-cancel</v-icon>
                Cancel
              </v-btn>

              <v-btn
                @click="pingContact(contact.id, chattee.id)"
                :loading="isLoadingPing"
                :disabled="buttonsBusy"
                text
                color="info"
                class="text-capitalize"
              >
                <v-icon left>mdi-bell-ring</v-icon>
                Ping
                <!-- <span class="font-weight-black"
                    >@{{ contact.invitee.username }}</span
                  > -->
              </v-btn>
            </v-row>
            <!-- Pending Chat Invite - waiting to be accepted or declined -->
          </div>
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
import ProfileModal from './ProfileModal';
import { mapGetters, mapActions } from 'vuex';
export default {
  props: ['contact'],
  components: {
    ProfileModal,
  },
  sockets: {
    chatMessage: function(data) {
      this.messages.push(data);
      if (this.dialog) {
        setTimeout(() => {
          console.log(this.$refs);
          this.$refs.chatWindow.scrollBy({
            top: this.$refs.chatWindow.scrollHeight + 200,
            left: 0,
            behaviour: 'smooth',
          });
        }, 200);
      }
      this.$socket.emit('allRead', {
        contactId: this.contact.id,
        senderId: data.senderId,
        hasBeenDelivered: true,
        hasBeenRead: this.dialog ? true : false,
        socketId: this.chattee.currentSocketId,
      });
    },
    pingMessage: function(data) {
      this.messages.push(data);
      // console.log(this.dialog);
      // console.log(this.$refs);
      if (this.dialog) {
        setTimeout(() => {
          console.log(this.$refs);
          this.$refs.chatWindow.scrollBy({
            top: this.$refs.chatWindow.scrollHeight + 200,
            left: 0,
            behaviour: 'smooth',
          });
        }, 200);
      }
      this.$socket.emit('allRead', {
        contactId: this.contact.id,
        senderId: data.senderId,
        hasBeenDelivered: true,
        hasBeenRead: this.dialog,
        socketId: this.chattee.currentSocketId,
      });

      // this.$refs.chatWindow.scrollTop += 1;
    },
    allRead: function(data) {
      this.messages.forEach((message) => {
        if (!message.hasBeenDelivered || !message.hasBeenRead) {
          message.hasBeenDelivered = data.hasBeenDelivered;
          message.hasBeenRead = data.hasBeenRead;
        }
      });
    },
    // chatMessage: function(data) {
    //   console.log(data);
    // },
  },
  data() {
    return {
      dialog: false,
      buttonsBusy: false,
      isLoadingCancel: false,
      isLoadingAccept: false,
      isLoadingPing: false,
      notifications: false,
      chatMessage: '',
      messages: [],
      selected: '',
      sound: true,
      widgets: false,
      isInviter: null,
      isInvitee: null,
    };
  },
  watch: {
    dialog: function(newValue /*, oldValue*/) {
      // console.log({ oldValue, newValue });

      if (newValue) {
        this.$socket.emit('allRead', {
          contactId: this.contact.id,
          senderId: this.chattee.id,
          hasBeenDelivered: true,
          hasBeenRead: true,
          socketId: this.chattee.currentSocketId,
        });
        setTimeout(() => {
          console.log(this.$refs);
          this.$refs.chatWindow.scrollBy({
            top: this.$refs.chatWindow.scrollHeight + 200,
            left: 0,
            behaviour: 'smooth',
          });
        }, 200);
      }
    },
  },
  methods: {
    ...mapActions([
      'deleteInvite',
      'showToast',
      'pingInvitee',
      'getContactMessages',
      'sendChatMessage',
    ]),
    cancelInvite(id) {
      this.buttonsBusy = true;
      this.isLoadingCancel = true;
      // console.log(id);
      this.deleteInvite({ contactId: id })
        .then(() => {
          this.dialog = false;
          this.$socket.emit('deleteContact', {
            contactId: id,
            socketId: this.chattee.currentSocketId,
          });
          this.showToast({
            sclass: 'info',
            message: 'Invite Canceled',
            timeout: 1500,
          });
          this.isLoadingCancel = false;
          this.buttonsBusy = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoadingCancel = false;
          this.buttonsBusy = false;
        });
    },
    pingContact(id, inviteeId) {
      this.buttonsBusy = true;
      this.isLoadingPing = true;
      this.pingInvitee({ contactId: id, inviteeId }).then((data) => {
        this.$socket.emit('pingMessage', { chattee: this.chattee, data });
        console.log(data);
        this.messages.push(data.pingMessage);
        setTimeout(() => {
          console.log(this.$refs);
          this.$refs.chatWindow.scrollBy({
            top: this.$refs.chatWindow.scrollHeight + 200,
            left: 0,
            behaviour: 'smooth',
          });
        }, 200);
        this.isLoadingPing = false;
        this.buttonsBusy = false;
      });
      // console.log(id);
      // setTimeout(() => {
      // }, 1000);
    },
    acceptInvite(id) {
      this.buttonsBusy = true;
      this.isLoadingAccept = true;
      console.log(id);
      setTimeout(() => {
        this.isLoadingAccept = false;
        this.buttonsBusy = false;
      }, 1000);
    },
    declineInvite(id) {
      this.buttonsBusy = true;
      this.isLoadingCancel = true;
      console.log(id);
      setTimeout(() => {
        this.isLoadingCancel = false;
        this.buttonsBusy = false;
      }, 1000);
    },
    sendMessage() {
      const message = {};
      message.messageText = this.chatMessage;
      // message.createdAt = new Date(Date.now());
      // message.senderId = this.loggedInUser.id;
      // message.recieverId = this.chattee.id;
      // message.contactId = this.contact.id;
      // message.hasBeenDelivered = false;
      // message.hasBeenRead = false;
      this.sendChatMessage({
        messageText: message.messageText,
        senderId: this.loggedInUser.id,
        recieverId: this.chattee.id,
        conversationId: this.contact.id,
      }).then((message) => {
        this.messages.push(message);

        this.$socket.emit('chatMessage', { message, chattee: this.chattee });
      });
      // console.log({ message: this.chatMessage });
      this.chatMessage = '';
      // console.log(this.$refs);

      // let i;
      // while (i < 200) {
      setTimeout(() => {
        console.log(this.$refs);
        // this.$refs.chatWindow.scrollTop += 1;
        this.$refs.chatWindow.scrollBy({
          top: this.$refs.chatWindow.scrollHeight + 200,
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
  computed: {
    ...mapGetters(['loggedInUser']),
    chattee() {
      if (this.contact.inviterId == this.loggedInUser.id) {
        return this.contact.invitee;
      } else {
        return this.contact.inviter;
      }
    },
    chatter() {
      if (this.contact.inviterId == this.loggedInUser.id) {
        return this.contact.inviter;
      } else {
        return this.contact.invitee;
      }
    },
  },
  mounted() {
    // console.log(this.$props);
    // console.log(this.$socket.connect().connected);
  },
  async created() {
    if (this.contact.inviterId == this.loggedInUser.id) {
      this.isInviter = true;
    } else {
      this.isInvitee = true;
    }
    this.getContactMessages({ contactId: this.contact.id }).then((data) => {
      this.messages = data;
    });
  },
};
</script>

<style>
.chatWindow {
  scroll-behavior: smooth;
}
</style>
