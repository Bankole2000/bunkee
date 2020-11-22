<template>
  <div class="test-two">
    <v-container>
      <p>We're connected to the server!</p>
      <p>Message from server:"</p>
      <button>Ping Server</button>
      <v-btn @click="pingServer()">Ping Server</v-btn>
      <p></p>
    </v-container>
    <!-- <SignupForm /> -->
    <!-- <VerifyEmail /> -->
    <Places />
    <FilterListing />
    <div style="height:200px;"></div>
    <!-- <LoginForm /> -->
  </div>
</template>

<script>
// import LoginForm from '../components/forms/Login';
import Places from '../components/forms/Places';
import FilterListing from '../components/forms/FilterListing';
// import VerifyEmail from '../components/Users/VerifyEmail';
// import SignupForm from '../components/forms/Signup';
// import io from 'socket.io-client';
export default {
  components: {
    FilterListing,
    // LoginForm,
    Places,
    // SignupForm,
    // VerifyEmail,
  },
  sockets: {
    connect: function() {
      console.log('socket connected');
    },
    // customEmit: function(data) {
    //   console.log(data);
    //   console.log(
    //     'this method was fired by the socket server. eg: io.emit("customEmit", data)'
    //   );
    // },
    // like: function(data) {
    //   console.log(data);
    // },
  },
  data() {
    return {
      socket: {},
    };
  },

  methods: {
    pingServer() {
      this.$socket.emit('like', { message: 'Server Pinged' });
    },
  },
  created() {
    // this.socket = io('http://localhost:3000');
  },
  mounted() {
    //   this.socket.on('position', (data) => {
    //     console.log(data);
    //   });
  },
};
</script>

<style></style>
