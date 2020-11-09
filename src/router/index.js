import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Test from '../views/Test.vue';
import TestTwo from '../views/TestTwo.vue';
import VerifyEmail from '../components/Users/VerifyEmail.vue';
import Verify from '../views/Verify.vue';
import Signup from '@/components/Users/SignupView.vue';
import Login from '@/components/Users/LoginView.vue';
import Profile from '@/components/Users/Profile.vue';
import Listings from '@/views/Listings.vue';
import Rentals from '@/views/Rentals.vue';
import Offers from '@/views/Offers.vue';
import Coops from '@/views/Coops.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/two',
    name: 'TestTwo',
    component: TestTwo,
  },
  {
    path: '/verify/:emailToken',
    name: 'Verify',
    component: VerifyEmail,
  },
  {
    path: '/verify',
    name: 'Verify',
    component: Verify,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
  {
    path: '/rentals',
    name: 'Rentals',
    component: Rentals,
  },
  {
    path: '/listings',
    name: 'Listings',
    component: Listings,
  },
  {
    path: '/coops',
    name: 'Cooperatives',
    component: Coops,
  },
  {
    path: '/offers',
    name: 'Offers',
    component: Offers,
  },
  {
    path: '/listings/add',
    name: 'Add Listing',
    component: Test,
  },
  {
    path: '/rentals/add',
    name: 'Add Rental',
    component: Test,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
