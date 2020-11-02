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

  const getLeagueData = async () => {
    await fleaFlickerAPI
      .getPlayoffData()
      .then((res) => (leagueData.data = res));
  }
  return {
    ...toRefs(leagueData),
    getLeagueData,
  }
}