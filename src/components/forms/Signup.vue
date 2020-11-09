<template>
  <div class="signup-form">
    <v-card class="ma-0 pa-0" elevation="0">
      <v-card-title class="title font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="24"
          v-text="step"
        ></v-avatar>
      </v-card-title>

      <v-window v-model="step" touchless>
        <v-window-item :value="1">
          <v-card-text class="pa-0">
            <v-text-field
              outlined
              v-model="email"
              name="email"
              label="Email"
              :loading="checkingEmail"
              @focus="emailIsOkay = null"
              @blur="checkEmailIsUnique()"
              :error="emailIsOkay == false"
              :success="emailIsOkay == true"
              placeholder="e.g. john.doe@gmail.com"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="username"
              label="Username"
              name="username"
              :loading="checkingUsername"
              @focus="usernameIsOkay = null"
              @blur="checkUsernameIsTaken()"
              :error="usernameIsOkay == false"
              :success="usernameIsOkay == true"
              placeholder="e.g. @john_doe"
            ></v-text-field>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="dob"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  outlined
                  v-model="dob"
                  label="Date of Birth"
                  name="dob"
                  prepend-icon="mdi-calendar"
                  placeholder="2000-01-01"
                  :error="ageIsOkay == false"
                  :success="ageIsOkay == true"
                  @focus="ageIsOkay == null"
                  @blur="checkAge()"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="dob" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false"
                  >Cancel</v-btn
                >
                <v-btn text color="primary" @click="setDate(dob)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text class="pa-0">
            <v-text-field
              label="First Name"
              outlined
              name="firstname"
              v-model="firstname"
              @blur="checkName(firstname)"
              @focus="firstnameIsOkay = null"
              :error="firstnameIsOkay == false"
              :success="firstnameIsOkay == true"
              placeholder="e.g. John"
            ></v-text-field>
            <v-text-field
              outlined
              name="lastname"
              @focus="lastnameIsOkay = null"
              v-model="lastname"
              @blur="checkName(lastname)"
              :error="lastnameIsOkay == false"
              :success="lastnameIsOkay == true"
              label="Last Name"
              placeholder="e.g. Doe"
            ></v-text-field>
            <v-select
              outlined
              name="gender"
              v-model="gender"
              @change="checkGender()"
              :items="genders"
              :error="genderIsOkay == false"
              :success="genderIsOkay == true"
              menu-props="auto"
              label="Select"
              :prepend-icon="genderIcon"
              single-line
            ></v-select>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="3">
          <v-card-text class="pa-0">
            <v-text-field
              label="Password"
              outlined
              name="password"
              v-model="password"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-text-field
              outlined
              name="confirmPassword"
              v-model="confirmPassword"
              :error="passwordsMatch == false"
              :success="passwordsMatch == true"
              label="Confirm Password"
              :type="show2 ? 'text' : 'password'"
              :append-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="show2 = !show2"
              @input="checkPasswordsMatch()"
            ></v-text-field>
            <v-checkbox v-model="tos" name="tos" color="success" class="mt-0">
              <template v-slot:label>
                <div>
                  I have read and agree to the
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <a
                        target="_blank"
                        href="http://vuetifyjs.com"
                        @click.stop
                        v-on="on"
                      >
                        Terms and conditions
                      </a>
                    </template>
                    of this application
                  </v-tooltip>
                  is awesome
                </div>
              </template>
            </v-checkbox>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="4">
          <div class="pa-4 text-center py-0">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="title font-weight-light mb-2">Welcome to Bunkee</h3>
            <span class="caption grey--text">Thanks for signing up!</span><br />
            <span class="caption grey--text"
              >We sent you an email to verify your account. </span
            ><br />
            <span class="caption grey--text "
              ><em>(You can't login without it)</em></span
            >
          </div>
        </v-window-item>
      </v-window>

      <v-card-actions class="pt-0" v-if="step < 4">
        <v-btn
          :disabled="step === 1"
          text
          @click="step--"
          :class="$vuetify.breakpoint.smAndUp ? 'px-12' : 'px-6'"
        >
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="checkingStep"
          :loading="checkingStep"
          color="primary"
          :class="$vuetify.breakpoint.smAndUp ? 'px-12' : 'px-6'"
          @click="moveToNextStep(step)"
        >
          <v-fade-transition>
            <span v-if="step < 3">
              Next
            </span>
          </v-fade-transition>
          <v-fade-transition>
            <span v-if="step === 3">
              Sign up
            </span>
          </v-fade-transition>
        </v-btn>
      </v-card-actions>

      <v-card-actions v-if="step == 4">
        <v-btn block color="primary" large>Login</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { config, validators, helpers } from '../helpers/config';

export default {
  data() {
    return {
      step: 1,
      email: '',
      username: '',
      gender: '',
      firstname: '',
      lastname: '',
      dob: '',
      password: '',
      confirmPassword: '',
      tos: null,
      genders: ['Male', 'Female'],
      modal: false,
      show1: false,
      show2: false,
      emailIsOkay: null,
      usernameIsOkay: null,
      checkingEmail: false,
      checkingUsername: false,
      ageIsOkay: null,
      checkingStep: false,
      firstnameIsOkay: null,
      lastnameIsOkay: null,
      genderIsOkay: null,
      passwordsMatch: null,
    };
  },

  computed: {
    genderIcon() {
      return this.gender == 'Female' ? 'mdi-gender-female' : 'mdi-gender-male';
    },
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'Sign-up';
        case 2:
          return 'Add A little Bio';
        case 3:
          return 'Create a password';
        default:
          return 'Verify Your Email';
      }
    },
  },
  methods: {
    ...mapActions(['showToast', 'showLoader']),
    async moveToNextStep(step) {
      this.checkingStep = true;
      console.log(step);
      if (step === 1) {
        console.log({
          email: this.email,
          username: this.username,
          dob: this.dob,
        });
        await this.checkEmailIsUnique();
        await this.checkUsernameIsTaken();
        this.checkAge();
        if (this.ageIsOkay && this.usernameIsOkay && this.emailIsOkay) {
          setTimeout(() => {
            this.step++;
            this.checkingStep = false;
          }, 1500);
        } else {
          this.checkingStep = false;
        }
      }
      if (step === 2) {
        if (!validators.isValidName(this.firstname)) {
          this.firstnameIsOkay = false;
          this.showToast({
            sclass: 'error',
            message: 'First name is invalid',
          });
          this.checkingStep = false;
        }
        if (!validators.isValidName(this.lastname)) {
          this.lastnameIsOkay = false;
          this.showToast({
            sclass: 'error',
            message: 'Last name is invalid',
          });
          this.checkingStep = false;
        }
        if (!this.genders.includes(this.gender)) {
          this.genderIsOkay = false;
          this.showToast({
            sclass: 'error',
            message: 'Please select a gender',
          });
          this.checkingStep = false;
        }
        if (
          this.firstnameIsOkay &&
          this.lastnameIsOkay &&
          ['Male', 'Female'].includes(this.gender)
        ) {
          this.step++;
          this.checkingStep = false;
        }
      }
      if (step === 3) {
        this.checkPasswordsMatch();
        if (!this.passwordsMatch) {
          this.showToast({
            sclass: 'error',
            message: 'Passwords do not match',
          });
          this.checkingStep = false;
        }
        if (!this.tos) {
          this.showToast({
            sclass: 'error',
            message: 'Please Accept the terms and conditions',
          });
          this.checkingStep = false;
        }

        if (this.passwordsMatch && this.tos) {
          // Sign user up here
          // Send post request
          // Generate gravatar Url?
          const profileImageUrl = helpers.makeGravatarUrl(this.email);
          const userDetails = {
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.username,
            password: this.password,
            dob: this.dob,
            gender: this.gender.toLowerCase(),
            tos: this.tos,
            profileImageUrl,
          };
          console.log({
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            username: this.username,
            password: this.password,
            dob: this.dob,
            gender: this.gender,
            tos: this.tos,
            profileImageUrl,
          });
          const res = await fetch(`${config.serverURL}/users/signup`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
          });
          const data = await res.json();
          console.log(data);
          if (data.success) {
            this.showToast({
              sclass: 'success',
              message: 'Sign up successful',
              timeout: 2000,
            }).then(() => {
              this.checkingStep = false;
              this.step++;
            });
          } else {
            this.showToast({
              sclass: 'error',
              message: 'Network Connection error',
            });
            this.checkingStep = false;
          }
        }
      }
    },
    checkName(name) {
      if (!validators.isValidName(name)) {
        if (name == this.$data.firstname) {
          this.firstnameIsOkay = false;
        }
        if (name == this.$data.lastname) {
          this.lastnameIsOkay = false;
        }
      } else {
        if (name == this.$data.firstname) {
          this.firstnameIsOkay = true;
        }
        if (name == this.$data.lastname) {
          this.lastnameIsOkay = true;
        }
      }
    },
    setDate(dob) {
      this.$refs.dialog.save(dob);
      this.checkAge();
    },
    checkGender() {
      ['Male', 'Female'].includes(this.gender)
        ? (this.genderIsOkay = true)
        : (this.genderIsOkay = false);
    },
    async checkEmailIsUnique() {
      this.checkingEmail = true;
      if (!validators.isEmail(this.email)) {
        this.showToast({
          sclass: 'error',
          message: 'Email is invalid',
        });
        this.emailIsOkay = false;
        this.checkingEmail = false;

        return;
      } else {
        const res = await fetch(`${config.serverURL}/users/checkemail`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: this.email }),
        });
        const data = await res.json();
        console.log(data);
        if (data.taken) {
          this.showToast({
            sclass: 'error',
            message: `${this.email} is already taken`,
          });
          this.emailIsOkay = false;
          this.checkingEmail = false;
        } else {
          this.checkingEmail = false;
          this.emailIsOkay = true;
        }
      }
    },
    async checkUsernameIsTaken() {
      this.checkingUsername = true;
      if (!validators.isValidUsername(this.username)) {
        this.showToast({
          sclass: 'error',
          message: 'Username is Invalid',
        });
        this.checkingUsername = false;
        this.usernameIsOkay = false;
      } else {
        const res = await fetch(`${config.serverURL}/users/checkusername`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: this.username }),
        });
        const data = await res.json();
        console.log(data);
        if (data.taken) {
          this.usernameIsOkay = false;
          this.showToast({
            sclass: 'error',
            message: `${this.username} is already taken`,
          });
          this.checkingUsername = false;
        } else {
          this.usernameIsOkay = true;

          this.checkingUsername = false;
        }
      }
    },
    checkAge() {
      if (validators.isOfAge(this.dob) < 18) {
        this.showToast({
          sclass: 'error',
          message: `Must be over 18yrs old`,
        });
        this.ageIsOkay = false;
      } else {
        this.ageIsOkay = true;
      }
    },
    checkPasswordsMatch() {
      this.password === this.confirmPassword
        ? (this.passwordsMatch = true)
        : (this.passwordsMatch = false);
    },
    resetForm() {
      this.emailIsOkay = null;
      this.usernameIsOkay = null;
      this.checkingEmail = false;
      this.checkingUsername = false;
      this.ageIsOkay = null;
      this.checkingStep = false;
      this.firstnameIsOkay = null;
      this.lastnameIsOkay = null;
      this.genderIsOkay = null;
      this.passwordsMatch = null;
      this.email = '';
      this.username = '';
      this.gender = '';
      this.firstname = '';
      this.lastname = '';
      this.dob = '';
      this.password = '';
      this.confirmPassword = '';
      this.tos = null;
      this.step = 1;
    },
  },
};
</script>

<style></style>
