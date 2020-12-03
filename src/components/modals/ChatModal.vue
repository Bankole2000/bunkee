<template>
  <div class="mobile-single-chat-modal py-0 my-0">
    <v-list-item
      class="py-0 my-0"
      :class="dialog ? 'primary lighten-3' : ''"
      @click="dialog = true"
    >
      <v-badge
        bottom
        :color="chattee.isOnline ? 'success lighten-2' : 'grey'"
        dot
        :bordered="chattee.isOnline"
        offset-x="28"
        offset-y="18"
      >
        <v-list-item-avatar>
          <v-img :src="chattee.profileImageUrl"></v-img>
        </v-list-item-avatar>
      </v-badge>
      <v-list-item-content>
        <v-list-item-title v-text="chattee.username"></v-list-item-title>

        <v-list-item-subtitle>
          <span v-if="!isTyping"
            ><span v-if="chattee.isOnline" class="primary--text text--lighten-1"
              >Online</span
            ><span v-else
              >Last seen -
              <span class="font-weight-bold">{{
                chattee.lastSeen | moment('from')
              }}</span></span
            ></span
          >
          <span v-if="isTyping" class="success--text">
            - <em>is typing...</em></span
          >
        </v-list-item-subtitle>
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
              <v-list-item-subtitle v-if="chattee.isOnline"
                >online
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else class="font-weight-light"
                >Last seen -
                <span class="font-weight-bold">{{
                  chattee.lastSeen | moment('from')
                }}</span></v-list-item-subtitle
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
          ref="chatWindow"
          id="chatWindow"
          class="chatWindow grey lighten-2 pt-4 pb-4 px-4 d-flex flex-column justify-start"
          :style="
            $vuetify.breakpoint.mdAndUp
              ? 'min-height: 450px; max-height: 450px;'
              : ''
          "
        >
          <div
            style="max-width:150px;"
            class="px-4 py-2 my-2 text-center blue lighten-4 rounded-lg mx-auto subtitle-2 text-uppercase"
          >
            {{
              contact.createdAt
                | moment('calendar', null, {
                  sameDay: '[Today]',

                  lastDay: '[Yesterday]',
                  lastWeek: '[Last] dddd',
                  sameElse: 'DD/MM/YYYY',
                })
            }}
            <!--
                  Moment Js Options
                   {
                      sameDay: '[Today]',
                      nextDay: '[Tomorrow]',
                      nextWeek: 'dddd',
                      lastDay: '[Yesterday]',
                      lastWeek: '[Last] dddd',
                      sameElse: 'DD/MM/YYYY',
                    } -->
          </div>

          <v-slide-y-reverse-transition group>
            <div v-for="(message, i) in messages" :key="i">
              <div
                v-if="groupByDate(message.createdAt)"
                style="max-width:150px;"
                class="px-4 py-2 my-2 text-center blue lighten-4 rounded-lg mx-auto subtitle-2 text-uppercase"
              >
                {{
                  message.createdAt
                    | moment('calendar', null, {
                      sameDay: '[Today]',

                      lastDay: '[Yesterday]',
                      lastWeek: '[Last] dddd',
                      sameElse: 'DD/MM/YYYY',
                    })
                }}
                <!--
                  Moment Js Options
                   {
                      sameDay: '[Today]',
                      nextDay: '[Tomorrow]',
                      nextWeek: 'dddd',
                      lastDay: '[Yesterday]',
                      lastWeek: '[Last] dddd',
                      sameElse: 'DD/MM/YYYY',
                    } -->
              </div>
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
                        style="word-break: break-word;"
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
                @click="respondToInvite(contact.id, false)"
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
                @click="respondToInvite(contact.id, true)"
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
              class="d-flex px-4 pb-4 pt-0 align-center justify-space-around"
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
                Cancel Invite
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
              </v-btn>
            </v-row>
          </div>
          <div
            v-if="contact.hasBeenAccepted"
            class="px-4 py-2 my-2 text-center amber lighten-4 rounded-lg mx-auto caption"
          >
            This is the beginning of your chat with
            <span class="font-weight-bold">@{{ chattee.username }}</span>
          </div>

          <div class="d-flex justify-start"></div>
        </v-card-text>
        <v-expand-transition>
          <v-alert text color="success" v-show="isTyping" class="mb-0 py-2"
            ><v-icon class="mdi-spin success-text" left>mdi-loading</v-icon
            ><em
              ><span class="font-weight-bold"> @{{ chattee.username }} </span>
              is typing...
            </em></v-alert
          >
        </v-expand-transition>
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
    // isTyping: function(data) {
    //   if (data.contactId == this.contact.id) this.isTyping = data.isTyping;
    // },
    userLogout: function(data) {
      if (data.id == this.chattee.id) {
        this.isTyping = false;
      }
    },
    chatMessage: function(data) {
      this.messages.push(data);
      this.isTyping = false;
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
    },
    allRead: function(data) {
      this.messages.forEach((message) => {
        if (!message.hasBeenDelivered || !message.hasBeenRead) {
          message.hasBeenDelivered = data.hasBeenDelivered;
          message.hasBeenRead = data.hasBeenRead;
        }
      });
    },
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
      isTyping: false,
      temp: {
        old_unique_date: null,
      },
    };
  },
  watch: {
    dialog: function(newValue /*, oldValue*/) {
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
      'sendInviteResponse',
    ]),
    groupByDate(date) {
      var old_date = this.temp.old_unique_date;
      var new_date = new Date(date).getDate();
      if (old_date != new_date) {
        this.temp.old_unique_date = new_date;
        return true;
      }
      return false;
    },
    showTyping() {
      this.$socket.emit('isTyping', {
        chattee: this.chattee,
        chatter: this.chatter,
        contactId: this.contact.id,
        isTyping: true,
      });
    },
    cancelInvite(id) {
      this.buttonsBusy = true;
      this.isLoadingCancel = true;
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
    },
    respondToInvite(id, response) {
      this.buttonsBusy = true;
      response ? (this.isLoadingAccept = true) : (this.isLoadingCancel = true);
      console.log(id, response);
      this.sendInviteResponse({ contactId: id, response });

      setTimeout(() => {
        this.isLoadingCancel = false;
        this.isLoadingAccept = false;
        this.buttonsBusy = false;
      }, 1000);
    },
    blockChattee(id, blocked) {
      this.buttonsBusy = true;
      console.log(id, blocked);
    },
    sendMessage() {
      const message = {};
      message.messageText = this.chatMessage;
      this.sendChatMessage({
        messageText: message.messageText,
        senderId: this.loggedInUser.id,
        recieverId: this.chattee.id,
        conversationId: this.contact.id,
      })
        .then((message) => {
          this.messages.push(message);

          this.$socket.emit('chatMessage', { message, chattee: this.chattee });
        })
        .then(() => {
          // this.$socket.emit('isTyping', {
          //   chattee: this.chattee,
          //   chatter: this.chatter,
          //   contactId: this.contact.id,
          //   isTyping: false,
          // });
        });
      this.chatMessage = '';
      setTimeout(() => {
        console.log(this.$refs);
        this.$refs.chatWindow.scrollBy({
          top: this.$refs.chatWindow.scrollHeight + 200,
          left: 0,
          behaviour: 'smooth',
        });
      }, 200);
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
  created() {
    this.getContactMessages({ contactId: this.contact.id }).then((data) => {
      this.messages = data;
    });
    if (this.contact.inviterId == this.loggedInUser.id) {
      this.isInviter = true;
    } else {
      this.isInvitee = true;
    }
  },
  beforeCreate() {},
};
</script>

<style>
.chatWindow {
  scroll-behavior: smooth;
}
</style>
