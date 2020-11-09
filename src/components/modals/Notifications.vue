<template>
  <div class="notifications">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [
        {
          title: 'Notification 1',
          type: 'chat',
          from: '@name321user',
          time: '3m ago',
          userAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        },
        {
          title: 'Notification 2',
          type: 'news',
          from: '@ladyUser',
          time: '2d ago',
          userAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        },
        {
          title: 'Notification 3',
          type: 'update',
          from: '@AppName',
          time: '1w ago',
          userAvatar: 'https://cdn.vuetifyjs.com/images/logos/v.png',
        },
        {
          title: 'Notification 4',
          type: 'listing',
          from: '@name321user',
          time: '24 Aug',
          userAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        },
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
    };
  },
};
</script>

<style></style>
