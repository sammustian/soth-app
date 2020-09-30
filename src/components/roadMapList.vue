<template lang="html">

  <section class="road-map-list">
    <h1>road-map-list Component</h1>
    <v-row>
      <v-col v-for="(item, idx) in roadMapItems" :key="idx">
        <v-card shaped elevation="2" width="400px">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{item}}</v-list-item-title>
          </v-list-item-content>
             <v-btn
              class="mx-2"
              fab
              dark
              small
              color="primary"
              @click="removeItem(idx)"
            >
            <v-icon dark>
              mdi-minus
            </v-icon>
          </v-btn>
        </v-list-item>
        </v-card>
      </v-col>
    </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="input"
            label="Add roadmap idea"
            clearable
          ></v-text-field>
        </v-col>
        <v-col>
           <v-btn

              class="mx-2"
              fab
              dark
              color="indigo"
              @click="addItem(input)"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
        </v-col>
      </v-row>
  </section>

</template>

<script lang="js">
import { mapActions } from 'vuex';
  export default  {
    name: 'road-map-list',
    props: [],
    mounted () {

    },
    data () {
      return {
        input: "",
      }
    },
    methods: {
      ...mapActions({
        add: 'addItem',
        remove: 'removeItem'
      })
    },
    computed: {
      roadMapItems() {
        return this.$store.getters.getRoadMapItems;
      }
    }
}


</script>

<style scoped lang="scss">
.road-map-list {
}
</style>
