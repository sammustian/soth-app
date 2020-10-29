import fleaFlickerAPI from "../../util/fleaflicker.js";
import {
  reactive,
  toRefs,
  computed,
  ref
} from "@vue/composition-api";

export default function () {
  const leagueData = reactive({
    members: [],
  });

  let defaultWeek = ref(0);
  let availableWeeks = ref([]);

  const divisonOneMembers = computed(() => {
    return leagueData.members
      .filter((x) => x.division.id == 590406)
      .sort((a, b) =>
        a.wins / a.losses == b.wins / a.losses ?
        a.pointsFor.value < b.pointsFor.value :
        a.wins / a.losses < b.wins / a.losses
      );
  });

  const divisonTwoMembers = computed(() => {
    return leagueData.members
      .filter((x) => x.division.id == 590407)
      .sort((a, b) =>
        a.wins / a.losses == b.wins / a.losses ?
        a.pointsFor.value < b.pointsFor.value :
        a.wins / a.losses < b.wins / a.losses
      );
  });

  const nonDivisionRankings = computed(() => {
    let sorted = leagueData.members.slice().sort((a, b) => {
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
  });

  const getLeagueData = async (year = 2020) => {
    await fleaFlickerAPI
      .getPlayoffData(year)
      .then((res) => {
        // console.log(res);
        leagueData.members = res.leagueData
        defaultWeek.value = res.defaultWeek
        availableWeeks.value = Array.from({length: res.defaultWeek}, (_, i) => i + 1)        
        return {defaultWeek, leagueData}
      });
  }
  return {
    ...toRefs(leagueData),
    getLeagueData,
    divisonOneMembers,
    divisonTwoMembers,
    nonDivisionRankings,
    defaultWeek,
    availableWeeks
  }
}