<template>
  <div class="test-two">
    <!-- <SignupForm /> -->
    <!-- <VerifyEmail /> -->
    <Places />
    <FilterListing />
    <div style="height:200px;"></div>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/forms/Login';
import Places from '../components/forms/Places';
import FilterListing from '../components/forms/FilterListing';
// import VerifyEmail from '../components/Users/VerifyEmail';
// import SignupForm from '../components/forms/Signup';
export default {
  components: {
    FilterListing,
    LoginForm,
    Places,
    // SignupForm,
    // VerifyEmail,
  },
};
</script>

<style></style>
