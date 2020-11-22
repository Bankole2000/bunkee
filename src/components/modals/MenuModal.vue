<template>
  <div class="menu-modal">
    <v-dialog v-model="dialog" persistent scrollable max-width="320px">
      <template v-slot:activator="{ on, attrs }">
        <v-badge bordered overlap dot offset-x="20" offset-y="20">
          <v-btn icon dark v-bind="attrs" v-on="on">
            <v-icon>mdi-apps</v-icon>
          </v-btn>
        </v-badge>
      </template>
      <v-card>
        <v-card-title
          >App Menu <v-spacer></v-spacer>
          <v-btn @click="dialog = false" text small fab color="error"
            ><v-icon>mdi-close</v-icon></v-btn
          ></v-card-title
        >
        <v-divider></v-divider>
        <v-card-text style="height: 300px;" class="pb-0">
          <v-row class="text-center mt-6">
            <v-col cols="6" @click="logout">
              <v-badge bordered overlap content="6">
                <v-avatar size="50" tile>
                  <v-img :src="require('@/assets/icons/email.svg')"></v-img>
                </v-avatar>
              </v-badge>
              <p>Messages</p>
            </v-col>
            <v-col cols="6" @click="goTo('/user/notifications')">
              <v-badge bordered overlap content="6">
                <v-avatar size="50" tile>
                  <v-img :src="require('@/assets/icons/bell.svg')"></v-img>
                </v-avatar>
              </v-badge>
              <p>Notifications</p>
            </v-col>
            <v-col cols="6" @click="goTo('/user/chat')">
              <v-badge bordered overlap content="6">
                <v-avatar size="50" tile>
                  <v-img :src="require('@/assets/icons/chat.svg')"></v-img>
                </v-avatar>
              </v-badge>
              <p>Chat</p>
            </v-col>
            <v-col cols="6" @click="goTo('/user/listings')">
              <v-badge avatar bordered overlap icon="mdi-plus">
                <v-avatar size="50" tile>
                  <v-img :src="require('@/assets/icons/house1.svg')"></v-img>
                </v-avatar>
              </v-badge>
              <p>My Listings</p>
            </v-col>
            <v-col cols="6" @click="goTo('/user/bookings')">
              <v-badge bordered overlap content="6">
                <v-avatar size="50" tile>
                  <v-img :src="require('@/assets/icons/calendar.svg')"></v-img>
                </v-avatar>
              </v-badge>
              <p>My Bookings</p>
            </v-col>
            <v-col cols="6" @click="goTo('/user/rentals')">
              <v-badge bordered overlap content="6">
                <v-avatar size="50" tile>
                  <v-img
                    :src="require('@/assets/icons/realestate.svg')"
                  ></v-img>
                </v-avatar>
              </v-badge>
              <p>My Rentals</p>
            </v-col>
            <v-col cols="6" @click="goTo('/user/dashboard')">
              <v-badge bordered overlap content="6">
                <v-avatar size="50" tile>
                  <v-img
                    :src="require('@/assets/icons/businessreport.svg')"
                  ></v-img>
                </v-avatar>
              </v-badge>
              <p>Dashboard</p>
            </v-col>

            <v-col cols="6" @click="goTo('/user/listings')">
              <v-badge bordered overlap content="6">
                <v-avatar size="50" tile>
                  <v-img :src="require('@/assets/icons/employee.svg')"></v-img>
                </v-avatar>
              </v-badge>
              <p>My Cooperatives</p>
            </v-col>
            <v-col cols="6" @click="goTo('/support')">
              <v-badge bordered overlap content="6">
                <v-avatar size="50" tile>
                  <v-img
                    :src="require('@/assets/icons/technicalsupport.svg')"
                  ></v-img>
                </v-avatar>
              </v-badge>
              <p>Support / Feedback</p>
            </v-col>
            <v-col cols="6" @click="goTo('/info')">
              <v-badge bordered overlap content="6">
                <v-avatar size="50" tile>
                  <v-img
                    :src="require('@/assets/icons/information.svg')"
                  ></v-img>
                </v-avatar>
              </v-badge>
              <p>Help & Info</p>
            </v-col>
            <v-col cols="6" @click="goTo('/user/listings')">
              <v-badge bordered overlap content="6">
                <v-avatar size="50" tile>
                  <v-img :src="require('@/assets/icons/handshake.svg')"></v-img>
                </v-avatar>
              </v-badge>
              <p>Offers</p>
            </v-col>
            <v-col cols="6" @click="goTo('/user/transactions')">
              <v-badge bordered overlap content="6">
                <v-avatar size="50" tile>
                  <v-img :src="require('@/assets/icons/cash.svg')"></v-img>
                </v-avatar>
              </v-badge>
              <p>Transactions</p>
            </v-col>

            <v-col cols="6" @click="goTo('/user/likes')">
              <v-badge bordered overlap content="6">
                <v-avatar size="50" tile>
                  <v-img :src="require('@/assets/icons/love.svg')"></v-img>
                </v-avatar>
              </v-badge>
              <p>My Favorites</p>
            </v-col>
            <v-col cols="6" @click="goTo('/profile/listings')">
              <v-badge bordered overlap content="6" v-if="loggedInUser">
                <v-avatar size="50" tile>
                  <v-img
                    v-if="['male', 'Male'].includes(loggedInUser.gender)"
                    :src="require('@/assets/icons/man.svg')"
                  ></v-img>
                  <v-img
                    v-if="['female', 'Female'].includes(loggedInUser.gender)"
                    :src="require('@/assets/icons/woman.svg')"
                  ></v-img>
                </v-avatar>
              </v-badge>
              <v-badge bordered overlap content="6" v-else>
                <v-avatar size="50" tile>
                  <v-img :src="require('@/assets/icons/person.svg')"></v-img>
                </v-avatar>
              </v-badge>
              <p v-if="loggedInUser">My Profile</p>
              <p v-else>Login</p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false"
            ><v-icon>mdi-close</v-icon> Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  methods: {
    ...mapActions(['logOut', 'showToast']),
    goTo(path) {
      this.$router.push(path);
      this.dialog = false;
    },
    logout() {
      this.$socket.emit('logout', this.loggedInUser);
      this.logOut();
      this.showToast({
        sclass: 'info',
        message: 'Logged Out',
      });
    },
  },
};
</script>

<style></style>
