<template>
  <div class="home">
    <Announcements />
    <HomeHero />

    <v-container>
      <PlacesAround />
      <Actions />
    </v-container>
    <NewStuff />
    <v-container>
      <HostWithUs />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Announcements from '../components/shared/Announcements';
// import Navbar from '../components/shared/Navbar';
import HomeHero from '../components/sections/HomeHero';
import PlacesAround from '../components/sections/PlacesAround';
import NewStuff from '../components/sections/NewStuff';
import Actions from '../components/sections/Actions';
import HostWithUs from '../components/sections/HostWithUs';
export default {
  name: 'Home',
  components: {
    Announcements,
    HomeHero,
    // Navbar,
    PlacesAround,
    NewStuff,
    Actions,
    HostWithUs,
  },
};
</script>
