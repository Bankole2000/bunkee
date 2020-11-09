<template>
  <div class="login-modal">
    <v-dialog v-model="show" persistent max-width="500">
      <v-card>
        <v-card-title class="headline"
          ><span class="headline">Create an Account</span>
          <v-spacer></v-spacer>
          <v-btn @click="closeModal($event)" text color="error" icon
            ><v-icon>mdi-close</v-icon></v-btn
          ></v-card-title
        >
        <v-divider></v-divider>
        <v-card-text class="pt-0 pb-1">
          <SignupForm ref="signupForm" />
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
import SignupForm from '../forms/Signup';
export default {
  components: {
    SignupForm,
  },
  props: ['show'],
  data() {
    return {};
  },
  computed: {},
  methods: {
    closeModal(e) {
      console.log(e);
      this.$refs.signupForm.resetForm();
      this.$emit('closeModal');
    },
  },
};
</script>

<style></style>
