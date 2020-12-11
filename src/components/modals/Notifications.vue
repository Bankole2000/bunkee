<template>
  <div class="notifications">
    <v-menu
      :max-height="$vuetify.breakpoint.height / 1.2"
      style="overflow-y: scroll;"
      v-model="menu"
      bottom
      right
      offset-y
      :close-on-click="false"
      :close-on-content-click="false"
      transition="slide-x-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text icon class="mr-4" dark v-bind="attrs" v-on="on">
          <v-badge
            :content="
              recievedNotifications.filter((notif) => !notif.hasBeenRead).length
            "
            :value="
              recievedNotifications.filter((notif) => !notif.hasBeenRead).length
            "
            color="primary"
            overlap
          >
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card max-width="320" class="px-0 rounded-xl">
        <v-toolbar style="width: 100%;" elevation="0">
          <v-toolbar-title>Notifications</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu transition="slide-x-transition" bottom left :offset-y="true">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="markAllAsRead()">
                <v-list-item-icon>
                  <v-icon>mdi-check-all</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Mark all as read</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="clearAllNotifications()">
                <v-list-item-icon>
                  <v-icon>mdi-delete</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Clear All Notifications</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!-- <v-list-item v-for="(item, i) in items" :key="i" @click="">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item> -->
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-divider inset></v-divider>
        <v-card-text class="pa-0">
          <div>
            <v-list three-line class="py-0">
              <v-list-item
                v-for="notif in notificationsToShow"
                :key="notif.uuid"
                @click="handleNotif(notif)"
                class="pl-0"
              >
                <v-badge
                  overlap
                  bordered
                  bottom
                  :icon="
                    notif.notificationType == 'chatInvite'
                      ? 'mdi-forum'
                      : 'mdi-home-account'
                  "
                  offset-x="30"
                  offset-y="30"
                  :color="
                    notif.notificationType == 'chatInvite' ? 'primary' : 'blue'
                  "
                >
                  <v-list-item-avatar size="48" v-if="notif.sender">
                    <v-img :src="notif.sender.profileImageUrl"></v-img>
                  </v-list-item-avatar>
                </v-badge>
                <v-list-item-content>
                  <v-list-item-title
                    class="text-subtitle-2 mb-n2 grey--text text--darken-2"
                    >{{ camelToTitle(notif.notificationType) }}
                    <span class="text-subtitle-2 grey--text"
                      >&middot; {{ notif.createdAt | moment('from') }}</span
                    ></v-list-item-title
                  >
                  <v-list-item-subtitle
                    class="text--primary"
                    :class="
                      !notif.hasBeenRead
                        ? 'font-weight-black'
                        : 'font-weight-light'
                    "
                    ><span class="font-weight-bold primary--text"
                      >@{{ notif.sender.username }} </span
                    ><span
                      :class="
                        !notif.hasBeenRead
                          ? 'font-weight-black'
                          : 'font-weight-light'
                      "
                      >{{ notif.notificationText }}</span
                    >
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon
                  v-if="!notif.hasBeenRead"
                  style="position: relative;"
                >
                  <v-icon
                    color="primary"
                    size="18"
                    style="position: absolute; top: 20px;"
                    class="ma-0 "
                    >mdi-circle</v-icon
                  >
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn block color="primary" rounded>
            View All Notifications
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      menu: false,
    };
  },
  methods: {
    ...mapActions([
      'setNotificationHasBeenRead',
      'markAllAsRead',
      'clearAllNotifications',
    ]),

    handleNotif(notification) {
      if (!notification.hasBeenRead) {
        this.setNotificationHasBeenRead({
          hasBeenRead: true,
          notificationId: notification.id,
        }).then(() => {
          this.$emit('readNotification');
        });
      }
      if (notification.notificationType == 'listingInvite') {
        this.$router.push(notification.notificationUrl).then(() => {
          this.menu = false;
        });
      }
      if (notification.notificationType == 'chatInvite') {
        this.$emit('openContactsModal');
        this.menu = false;
      }
      // console.log(notification);
    },
    camelToTitle(camelCase) {
      return camelCase
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase());
    },
  },
  computed: {
    notificationsToShow() {
      return this.recievedNotifications
        .slice()
        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    },
    ...mapGetters(['recievedNotifications']),
  },
};
</script>

<style></style>
