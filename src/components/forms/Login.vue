<template>
  <div class="login-form">
    <v-form ref="loginForm">
      <v-text-field
        label="Email or Username"
        :loading="loggingIn"
        v-model="emailOrUsername"
        @blur="checkEmailOrUsername()"
        @focus="emailOrUsernameIsOkay = null"
        :error="emailOrUsernameIsOkay == false"
        :success="emailOrUsernameIsOkay == true"
        outlined
        placeholder="john.doe@gmail.com / @john_doe"
      >
      </v-text-field>
      <v-text-field
        outlined
        v-model="password"
        :loading="loggingIn"
        :error="passwordIsOkay == false"
        :success="passwordIsOkay == true"
        label="Password"
        @focus="passwordIsOkay = null"
        :type="show1 ? 'text' : 'password'"
        :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="show1 = !show1"
        placeholder="your password"
      ></v-text-field>
      <v-btn
        :loading="loggingIn"
        :disabled="loggingIn"
        large
        @click="login"
        color="primary"
        block
        >Sign in</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { config, validators } from '../helpers/config';
export default {
  data() {
    return {
      emailOrUsername: '',
      password: '',
      show1: false,
      loggingIn: false,
      emailOrUsernameIsOkay: null,
      passwordIsOkay: null,
    };
  },
  methods: {
    ...mapActions([
      'showToast',
      'setUser',
      'getCurrentUserContacts',
      'getCurrentUserListings',
    ]),
    async checkEmailOrUsername() {
      if (
        !validators.isEmail(this.emailOrUsername) &&
        !validators.isValidUsername(this.emailOrUsername)
      ) {
        this.emailOrUsernameIsOkay = false;
        this.showToast({
          sclass: 'error',
          message: 'Invalid email or username',
        });
        return;
      }
      if (validators.isEmail(this.emailOrUsername)) {
        const res = await fetch(`${config.serverURL}/users/checkemail`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: this.emailOrUsername }),
        });
        const data = await res.json();
        console.log(data);
        if (data.taken) {
          this.emailOrUsernameIsOkay = true;
        } else {
          this.showToast({
            sclass: 'error',
            message: 'This email is not registered',
          });
          this.emailOrUsernameIsOkay = false;
        }
      } else if (validators.isValidUsername(this.emailOrUsername)) {
        const res = await fetch(`${config.serverURL}/users/checkusername`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: this.emailOrUsername }),
        });
        const data = await res.json();
        console.log(data);
        if (data.taken) {
          this.emailOrUsernameIsOkay = true;
        } else {
          this.showToast({
            sclass: 'error',
            message: 'This username is not registered',
          });
          this.emailOrUsernameIsOkay = false;
        }
      }
    },
    async login() {
      this.logginIn = true;
      const payload = { email: this.emailOrUsername, password: this.password };
      const res = await fetch(`${config.serverURL}/users/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.hasErrors) {
        console.log(data);
        this.showToast({
          sclass: 'error',
          message: data.errors[0].message,
        });
        this.emailOrUsernameIsOkay = false;
        this.passwordIsOkay = false;
        console.log(data.errors);
        this.logginIn = false;
      } else {
        this.emailOrUsernameIsOkay = true;
        this.passwordIsOkay = true;
        console.log(data.user, data.token);
        this.logginIn = false;
        this.showToast({
          sclass: 'success',
          message: data.message,
        }).then(async () => {
          this.setUser({ ...data.user, token: data.token });
          this.getCurrentUserContacts();
          this.getCurrentUserListings();
          this.resetForm();
          // TODO: redirect, store token in Local storage ?
          // get IP address, search for listings based on current user location;
          const geoRes = await fetch('http://www.geoplugin.net/json.gp');
          const geoData = await geoRes.json();
          console.log(geoRes, geoData);
          this.$socket.emit('login', { user: data.user });
        });
      }
    },
    resetForm() {
      this.$refs.loginForm.reset();
      this.emailOrUsernameIsOkay = null;
      this.passwordIsOkay = null;
    },
  },
};
</script>

<style></style>
