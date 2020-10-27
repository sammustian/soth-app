<template>
  <section class="playoff-standings">
      <v-card width="500">
      <v-toolbar color="dark" dark>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>Week: {{rankings[0].games.length}}</v-toolbar-title>
      </v-toolbar>
      <v-list three-line>
        <template v-for="(item, index) in rankings">
          <v-list-item :key="item.id">
            <v-list-item-avatar>
              <v-img :src="item.logoUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                >{{ index + 1 }}. {{ item.name }}
              </v-list-item-title>
              <v-list-item-subtitle
                >({{ item.wins }} - {{ item.losses }}) -
                {{ item.pointsFor.value }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </section>
</template>

<script>
export default {
  name: "PlayoffStandings",
  // *----------------------- P r o p s ----------------------------------------------------------
  props: {
      rankings: Array,
      title: String
  },
  // *----------------------- D a t a -----------------------------------------------------------
  data() {
    return {};
  },
  // *----------------------- C o m p u t e d ---------------------------------------------------
  computed: {},
  // *----------------------- L i f e   c i r c l e ---------------------------------------------
  created() {},
  // *----------------------- M e t h o d s -----------------------------------------------------
  methods: {},
  // *----------------------- W a t c h ---------------------------------------------------------
  watch: {},
};
</script>