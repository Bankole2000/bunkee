<template>
  <div class="announcements">
    <!-- <v-toolbar dark>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-reply</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar> -->
    <div
      class="text-center pa-4"
      :class="{ 'white--text black': $vuetify.breakpoint.smAndUp }"
    >
      <p class="mb-0">
        We need you -
        <a
          href="https://google.com"
          target="_blank"
          class="text-decoration-underline"
        >
          Take the survey
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
