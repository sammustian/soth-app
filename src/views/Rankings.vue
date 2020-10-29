<template>
  <v-container v-show="members">
    <v-row justify="center" class="ma-5">
      <PlayoffStandings
        v-if="nonDivisionRankings"
        :title="'Playoff Rankings'"
        :rankings="nonDivisionRankings"
      ></PlayoffStandings>
    </v-row>
    <v-row justify="center">
      <DivisionRankings
        class="ma-5"
        :title="'Top Jake'"
        :division="divisonOneMembers"
      ></DivisionRankings>
      <DivisionRankings class="ma-5"
        :title="'Bottom Jake'"
        :division="divisonTwoMembers"
      ></DivisionRankings>
    </v-row>
  </v-container>
</template>

<script>

import DivisionRankings from "../components/DivisionRankings.vue";
import PlayoffStandings from "../components/PlayoffStandings.vue";
import useLeagueData from '../composables/use-league-data.js';


export default {
  name: "Rankings",
  components: { DivisionRankings, PlayoffStandings },
  setup() {
    const {members, year, getPlayoffData} = useLeagueData();
    return {members, year, getPlayoffData};
  },
  mounted() {
    this.year = 2020;
    this.getPlayoffData(this.year);
  },

  methods: {
  },
  computed: {
    divisonOneMembers() {
      return this.members
        .filter((x) => x.division.id == 590406)
        .sort((a, b) =>
          a.wins / a.losses == b.wins / a.losses
            ? a.pointsFor.value < b.pointsFor.value
            : a.wins / a.losses < b.wins / a.losses
        );
    },
    divisonTwoMembers() {
      return this.members
        .filter((x) => x.division.id == 590407)
        .sort((a, b) =>
          a.wins / a.losses == b.wins / a.losses
            ? a.pointsFor.value < b.pointsFor.value
            : a.wins / a.losses < b.wins / a.losses
        );
    },
    nonDivisionRankings() {
      let sorted = this.members.slice().sort((a, b) => {
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
    // topFour() {
    //   return this.nonDivisionRankings().splice(0, 4);
    // },
    // bottomFour() {
    //   return this.nonDivisionRankings().splice(3, 4);
    // },
  },
};
</script>
