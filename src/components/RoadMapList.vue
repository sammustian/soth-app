<template lang="html">

  <section class="road-map-list">
    <h1>road-map-list Component</h1>
    <v-row>
      <v-col v-for="(item, idx) in roadMapItems" :key="idx">
        <v-card shaped elevation="2" width="400px">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{item.text}}</v-list-item-title>
          </v-list-item-content>
             <v-btn
              class="mx-2"
              fab
              dark
              small
              color="primary"
              @click="remove(item.id)"
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
              @click="add(input)"
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
import { mapActions, mapState } from 'vuex';
  export default  {
    name: 'road-map-list',
    props: [],
    mounted () {
      this.load();
    },
    data () {
      return {
        input: "",
      }
    },
    methods: {
      ...mapActions({
        load: 'bindRoadMapItemsRef',
        addItem: 'bindAddRoadMapItemRef',
        removeItem: 'bindRemoveRoadMapItemRef'
        // add: 'addItem',
        // remove: 'removeItem'
      }),
      add(item) {
        this.addItem(item);
        this.input = "";
      },
      remove(id) {
        this.removeItem(id);
      }
    },
    computed: mapState(['roadMapItems'])
    // roadMapItems() {
    //   return this.$store.getters.getRoadMapItems;
    // }
    
}


</script>

<style scoped lang="scss">
.road-map-list {
}
</style>
