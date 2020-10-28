import fleaFlickerAPI from "../../util/fleaflicker.js";
import {ref, reactive, toRefs} from "@vue/composition-api";

export default function() {
    const year = ref(null);
    const leagueData = reactive({
      members: []
    });
    const getPlayoffData = async () => {           
       await fleaFlickerAPI
        .getPlayoffData(year.value)
        .then((res) => (leagueData.members = res));
    }
    return { ...toRefs(leagueData), year, getPlayoffData }
}