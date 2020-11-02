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
                      Week {{selectedWeek}}
                  </v-btn>
              </template>
              <v-list depressed>
                  <v-list-item v-for="(item, index) in availableWeeks" :key="index+'_'+item">
                      <v-list-item-action>
                        <v-btn @click="changeYear(item)">Week {{item}}</v-btn>
                      </v-list-item-action>
                  </v-list-item>
              </v-list>
          </v-menu>
          <v-menu open-on-hover offset-y transition="scale-transition" origin="center center">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on">
                        {{selectedYear}}
                    </v-btn>
                </template>
                <v-list depressed>
                    <v-list-item v-for="(item, index) in avaliableYears" :key="index+'_'+item">
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
          :rankings="selectedYearLeagueData.leagueData"
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
      selectedYear: 2020,
      selectedWeek: null,
      availableWeeks:[]
    }
  },
  name: "Rankings",
  components: { 
    DivisionRankings, 
    PlayoffStandings 
    },
  setup() {

    const {
      data, 
      getLeagueData, 
      } = useLeagueData();

    return {
        data,
        getLeagueData, 
      };
  },
  async mounted() { 
    await this.getLeagueData();
    this.dataReady = true;
  },

  methods: {
   async changeYear(year) {
      this.dataReady = false;
      await this.getLeagueData(year);      
      this.selectedYear = year;
      this.selectedWeek = this.defaultWeek;
      this.dataReady = true;
    }
  },
  computed: {
  divisonOneMembers() {
    return this.selectedYearLeagueData.leagueData
      .filter((x) => x.division.id == 590406)
      .sort((a, b) =>
        a.wins / a.losses == b.wins / a.losses ?
        a.pointsFor.value < b.pointsFor.value :
        a.wins / a.losses < b.wins / a.losses
      );
  },

  divisonTwoMembers() {
    return this.selectedYearLeagueData.leagueData
      .filter((x) => x.division.id == 590407)
      .sort((a, b) =>
        a.wins / a.losses == b.wins / a.losses ?
        a.pointsFor.value < b.pointsFor.value :
        a.wins / a.losses < b.wins / a.losses
      );
  },

  nonDivisionRankings() {
    let sorted = this.selectedYearLeagueData.leagueData.slice().sort((a, b) => {
      let aRatio = a.wins / a.losses;
      let bRatio = b.wins / b.losses;

      if (aRatio == bRatio) {
        if (a.pointsFor.value < b.pointsFor.value) {
          return 1;
        } else {
          return -1;
        }
      } else if (aRatio > bRatio) {
        return -1;
      } else if (aRatio < bRatio) {
        return 1;
      }
    });
    return sorted;
  },
    divisionOneTitle() {
      return this.divisonOneMembers[0].division.name;
    },
    divisionTwoTitle() {
      return this.divisonTwoMembers[0].division.name;
    },
    avaliableYears() {
      return this.data.map(x => x.year);
    },
    selectedYearLeagueData() {
      return this.data.filter(x => x.year == this.selectedYear)[0];
    }
  },
};


/***COMMENTED CODE */

// const divisonOneMembers = computed(() => {
  //   return leagueData.members
  //     .filter((x) => x.division.id == 590406)
  //     .sort((a, b) =>
  //       a.wins / a.losses == b.wins / a.losses ?
  //       a.pointsFor.value < b.pointsFor.value :
  //       a.wins / a.losses < b.wins / a.losses
  //     );
  // });

  // const divisonTwoMembers = computed(() => {
  //   return leagueData.members
  //     .filter((x) => x.division.id == 590407)
  //     .sort((a, b) =>
  //       a.wins / a.losses == b.wins / a.losses ?
  //       a.pointsFor.value < b.pointsFor.value :
  //       a.wins / a.losses < b.wins / a.losses
  //     );
  // });

  // const nonDivisionRankings = computed(() => {
  //   let sorted = leagueData.members.slice().sort((a, b) => {
  //     let aRatio = a.wins / a.losses;
  //     let bRatio = b.wins / b.losses;

  //     if (aRatio == bRatio) {
  //       if (a.pointsFor.value < b.pointsFor.value) {
  //         return 1;
  //       } else {
  //         return -1;
  //       }
  //     } else if (aRatio > bRatio) {
  //       return -1;
  //     } else if (aRatio < bRatio) {
  //       return 1;
  //     }
  //   });
  //   return sorted;
  // });
</script>


