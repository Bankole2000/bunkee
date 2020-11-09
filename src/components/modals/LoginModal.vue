<template>
  <div class="login-modal">
    <v-dialog v-model="show" persistent max-width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Log in</span>
          <v-spacer></v-spacer>
          <v-btn @click="closeModal($event)" text color="error" icon
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text class="pt-4">
          <LoginForm ref="loginForm" />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="closeModal($event)">
            <v-icon left>mdi-close</v-icon>
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';
import LoginForm from '../forms/Login';
export default {
  components: {
    LoginForm,
  },
  props: ['show'],
  data() {
    return {};
  },
  computed: {},
  methods: {
    closeModal(e) {
      console.log(e);
      this.$refs.loginForm.resetForm();
      this.$emit('closeModal');
    },
  },
};
</script>

<style></style>
