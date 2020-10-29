<template>
  <div>
    <v-container v-if="!dataReady" class="fill-height" fluid>
         <v-row justify="center" align="center">
             <v-col class="shrink">
                  <v-progress-circular
                    indeterminate
                    color="purple"
                  ></v-progress-circular>
            </v-col>
         </v-row>
    </v-container>
  <v-container v-if="dataReady">
      <v-toolbar class="mb-10" dense>
      <v-toolbar-title>Filters</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
          <v-menu open-on-hover offset-y transition="scale-transition" origin="center center">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on">
                        {{selectedYear}}
                    </v-btn>
                </template>
                <v-list depressed>
                    <v-list-item v-for="(item, index) in avaliableYears" :key="index">
                       <v-list-item-action>
                          <v-btn @click="changeYear(item)">{{item}}</v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-row justify="center">
      <v-col>
        <PlayoffStandings
          :title="'Playoff Rankings'"
          :rankings="nonDivisionRankings"
        ></PlayoffStandings>
      </v-col>
      <v-col>
        <DivisionRankings
          class="ma-5 mt-0"
          :title="divisionOneTitle"
          :division="divisonOneMembers"
        ></DivisionRankings>
        <DivisionRankings class="ma-5"
          :title="divisionTwoTitle"
          :division="divisonTwoMembers"
        ></DivisionRankings>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>

import DivisionRankings from "../components/DivisionRankings.vue";
import PlayoffStandings from "../components/PlayoffStandings.vue";
import useLeagueData from '../composables/use-league-data.js';

export default {
  data () {
    return {
      dataReady: false,
      avaliableWeeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      avaliableYears: [2017, 2018, 2019, 2020],
      selectedYear: 2020
    }
  },
  name: "Rankings",
  components: { DivisionRankings, PlayoffStandings },
  setup() {
    const {members, year, getLeagueData, divisonOneMembers, divisonTwoMembers, nonDivisionRankings} = useLeagueData();
    return {members, year, getLeagueData, divisonOneMembers, divisonTwoMembers, nonDivisionRankings};
  },
  async mounted() { 
    await this.getLeagueData(this.selectedYear);
    this.dataReady = true;
  },

  methods: {
   async changeYear(year) {
      this.dataReady = false;
      await this.getLeagueData(year);
      this.selectedYear = year;
      this.dataReady = true;
    }
  },
  computed: {
    divisionOneTitle() {
      return this.divisonOneMembers[0].division.name;
    },
    divisionTwoTitle() {
      return this.divisonTwoMembers[0].division.name;
    },
    
  },
};
</script>
