<template>
  <section class="division-rankings">
    <v-card width="500">
      <v-toolbar color="dark" dark>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-list three-line>
        <template v-for="(item, index) in division">
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

<script lang="js">

  export default  {
    name: 'DivisionRankings',
    props: ['division', 'title'],
    mounted () {
    },
    data () {
      return {
      }
    },
    methods: {
    },    
}


</script>

<style scoped lang="scss">
</style>
