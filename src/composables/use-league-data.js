import fleaFlickerAPI from "../../util/fleaflicker.js";
import {
  reactive,
  toRefs,
  // computed,
} from "@vue/composition-api";

export default function () {
  const leagueData = reactive({
    data: [],
  });

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

  const getLeagueData = async () => {
    await fleaFlickerAPI
      .getPlayoffData()
      .then((res) => (leagueData.data = res));
  }
  return {
    ...toRefs(leagueData),
    getLeagueData,
    // divisonOneMembers,
    // divisonTwoMembers,
    // nonDivisionRankings,
  }
}