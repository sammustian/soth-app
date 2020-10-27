<template>
  <v-container v-show="leagueMembers">
    <v-row justify="space-around">
      <DivisionRankings
        :title="'Top Jake'"
        :division="divisonOneMembers"
      ></DivisionRankings>
      <DivisionRankings
        :title="'Bottom Jake'"
        :division="divisonTwoMembers"
      ></DivisionRankings>
    </v-row>
    <v-row justify="center" class="mt-5">
      <PlayoffStandings
        :title="'Playoff Rankings'"
        :rankings="playoffRankings"
      ></PlayoffStandings>
    </v-row>
  </v-container>
</template>

<script>
import fleaFlickerAPI from "../../util/fleaflicker.js";
import DivisionRankings from "../components/DivisionRankings.vue";
import PlayoffStandings from "../components/PlayoffStandings.vue";

export default {
  name: "Home",
  components: { DivisionRankings, PlayoffStandings },
  data() {
    return {
      leagueMembers: {},
      console: "",
    };
  },
  mounted() {
    this.getPlayoffData("2020");
  },

  methods: {
    async getPlayoffData(year) {
      await fleaFlickerAPI
        .getPlayoffData(year)
        .then((res) => (this.leagueMembers = res));
    },
  },
  computed: {
    divisonOneMembers() {
      return this.leagueMembers
        .filter((x) => x.division.id == 590406)
        .sort((a, b) =>
          a.wins / a.losses == b.wins / a.losses
            ? a.pointsFor.value < b.pointsFor.value
            : a.wins / a.losses < b.wins / a.losses
        );
    },
    divisonTwoMembers() {
      return this.leagueMembers
        .filter((x) => x.division.id == 590407)
        .sort((a, b) =>
          a.wins / a.losses == b.wins / a.losses
            ? a.pointsFor.value < b.pointsFor.value
            : a.wins / a.losses < b.wins / a.losses
        );
    },
    playoffRankings() {
      let sorted = this.leagueMembers.slice().sort((a, b) => {
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
      
      // let divOneCount = 0;
      // let divTwoCount = 0;
      
      
      return sorted;
    },
  },
};
</script>
