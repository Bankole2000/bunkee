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
            <v-col cols="6" v-for="n in 8" :key="n">
              <v-badge bordered overlap content="6">
                <v-avatar size="50">
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/john.png"
                  ></v-img>
                </v-avatar>
              </v-badge>
              <p>Messages</p>
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
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style></style>
