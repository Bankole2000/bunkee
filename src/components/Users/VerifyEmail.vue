<template>
  <div
    class="verify-email text-center d-flex flex-column align-center justify-center"
    style="height: 100vh;"
  >
    <v-scale-transition origin="center center" leave-absolute>
      <p v-if="verifying" class="display-1 font-weight-light mb-6">
        Verifying Email
      </p>
    </v-scale-transition>
    <v-scale-transition origin="center center">
      <p v-if="error" class="display-1 font-weight-light mb-0">
        Invalid Token
      </p>
    </v-scale-transition>
    <v-scale-transition origin="center center">
      <p
        v-if="success || alreadyVerified"
        class="display-1 font-weight-light mb-0"
      >
        Verified
      </p>
    </v-scale-transition>
    <div class="d-flex">
      <v-scale-transition leave-absolute origin="center center">
        <v-progress-circular
          v-if="verifying"
          :size="100"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-scale-transition>
      <v-scale-transition origin="center center">
        <v-icon :size="120" v-if="error" color="error">
          mdi-close-circle-outline
        </v-icon>
      </v-scale-transition>
      <v-scale-transition origin="center center">
        <v-icon :size="120" v-if="success || alreadyVerified" color="success">
          mdi-check-circle-outline
        </v-icon>
      </v-scale-transition>
    </div>
    <v-slide-x-transition>
      <v-card
        elevation="0"
        :loading="success || alreadyVerified"
        v-if="success || error"
      >
        <!-- <p class="text-h5 font-weight-light">{{ message }}</p> -->
        <v-btn
          color="primary"
          v-if="error && !alreadyVerified"
          :to="newTokenPath"
          >Request a new token <v-icon right>mdi-open-in-new</v-icon></v-btn
        >
        <v-btn class="text-capitalize" color="info" text disabled v-if="success"
          >Email Verified! Redirecting...</v-btn
        >
        <v-btn
          color="info"
          class="text-capitalize"
          text
          disabled
          v-if="alreadyVerified"
          >Email Already Verified! Redirecting...</v-btn
        >
      </v-card>
    </v-slide-x-transition>
  </div>
</template>

<script>
import { config } from '../helpers/config';
import { mapActions } from 'vuex';
export default {
  created() {
    console.log(this.$route);
  },
  mounted() {
    this.verifyEmail();
  },
  data() {
    return {
      verifying: true,
      error: false,
      success: false,
      result: '',
      message: '',
      alreadyVerified: false,
      newTokenPath: config.newTokenPath,
      loginPath: config.loginPath,
    };
  },

  methods: {
    ...mapActions(['showToast']),
    verifyEmail() {
      setTimeout(async () => {
        const res = await fetch(
          `${config.serverURL}/users/verify/${this.$route.params.emailToken}`
        );
        const data = await res.json();
        console.log(data);
        if (data.hasErrors) {
          if (data.errors[0].message == 'Email is Already Verified') {
            console.log('already verified');
            this.verifying = false;
            this.alreadyVerified = true;
            setTimeout(() => {
              this.showToast({
                sclass: 'info',
                message: data.errors[0].message,
                timeout: 2000,
              }).then(() => {
                this.$router.replace(config.loginPath);
              });
              return;
            }, 800);
          } else {
            setTimeout(() => {
              this.showToast({
                sclass: 'error',
                message: data.errors[0].message,
              }).then(() => {
                this.verifying = false;
                this.error = true;
                this.message = data.errors[0].message;
              });
            }, 2000);
          }
        } else {
          this.success = true;
          this.verifying = false;
          this.showToast({
            sclass: 'success',
            message: 'Email Verified. Redirecting...',
          }).then(() => {
            setTimeout(() => {
              this.$router.replace(config.loginPath);
            }, 2000);
          });
        }
      }, 1500);
    },
  },
  computed: {},
};
</script>

<style></style>
