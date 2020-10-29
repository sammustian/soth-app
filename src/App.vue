<template>
  <v-app>
    <!-- -->
    <v-app-bar app color="grey darken-3" dark>
      <v-btn class="mx-3" color="secondary" elevation="10" large :to="'/'"
        >Home</v-btn
      >
      <v-btn
        class="mx-3"
        color="secondary"
        elevation="10"
        large
        :to="'/rankings'"
        >Rankings</v-btn
      >
      <v-btn
        class="mx-3"
        color="secondary"
        elevation="10"
        large
        :to="'/roadmap'"
        >Roadmap</v-btn
      >
      <v-btn
        class="mx-3"
        color="secondary"
        elevation="10"
        large
        :to="'/playoffs'"
        >Playoffs</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        href="https://www.fleaflicker.com/nfl/leagues/199769/scores"
        target="_blank"
        text
      >
        <span class="mr-2">This weeks scores </span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
