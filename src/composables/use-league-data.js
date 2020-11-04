import fleaFlickerAPI from '../../util/fleaflicker.js'
import { computed } from '@vue/composition-api'
import Vue from 'vue'

const state = Vue.observable({
  leagueData: [],
  dataLoaded: false,
})

const getLeagueData = async () => {
  await fleaFlickerAPI.getPlayoffData().then((res) => {
    state.leagueData = res
    state.dataLoaded = true
  })
}
const selectedYearLeagueData = (year) => {
  return state.leagueData.filter((x) => x.year == year)[0]
}
const divisionOneMembers = (year) => {
  return selectedYearLeagueData(year)
    .leagueData.filter((x) => x.division.id == 590406)
    .sort((a, b) =>
      a.wins / a.losses == b.wins / a.losses
        ? a.pointsFor.value < b.pointsFor.value
        : a.wins / a.losses < b.wins / a.losses,
    )
}
const divisionTwoMembers = (year) => {
  return selectedYearLeagueData(year)
    .leagueData.filter((x) => x.division.id == 590407)
    .sort((a, b) =>
      a.wins / a.losses == b.wins / a.losses
        ? a.pointsFor.value < b.pointsFor.value
        : a.wins / a.losses < b.wins / a.losses,
    )
}
const nonDivisionRankings = (year) => {
  let sorted = selectedYearLeagueData(year)
    .leagueData.slice()
    .sort((a, b) => {
      let aRatio = a.wins / a.losses
      let bRatio = b.wins / b.losses
      if (aRatio == bRatio) {
        if (a.pointsFor.value < b.pointsFor.value) {
          return 1
        } else {
          return -1
        }
      } else if (aRatio > bRatio) {
        return -1
      } else if (aRatio < bRatio) {
        return 1
      }
    })
  return sorted
}

export function useLeagueData(year) {
  return {
    state: state,
    leagueData: computed(() => state.leagueData),
    dataLoaded: computed(() => state.dataLoaded),
    getLeagueData: getLeagueData(),
    selectedYearLeagueData: computed(() => selectedYearLeagueData(year)),
    divisionOneMembers: computed(() => divisionOneMembers(year)),
    divisionTwoMembers: computed(() => divisionTwoMembers(year)),
    nonDivisionRankings: computed(() => nonDivisionRankings(year)),
  }
}

// export default function () {
//   const ffObj = reactive({
//     leagueData: [],
//   })

//   const getLeagueData = async () => {
//     await fleaFlickerAPI
//       .getPlayoffData()
//       .then((res) => (ffObj.leagueData = res))
//   }
//   return {
//     ...toRefs(ffObj),
//     getLeagueData,
//   }
// }
