import fleaFlickerAPI from '../util/fleaflicker.js'
import { toRefs, reactive, computed } from '@vue/composition-api'

export default function useLeagueData(selectedYear, options = {}) {
  const state = reactive({
    leagueData: [],
    api_status: '',
  })

  const getLeagueData = async (selectedYear) => {
    try {
      state.api_status = 'FETCHING'
      console.log(state.api_status);
      await fleaFlickerAPI.getPlayoffData(selectedYear).then((res) => {
        state.leagueData = res
      })
      state.api_status = 'FETCHING_SUCCESS'
      console.log(state.api_status);
    } catch (error) {
      state.api_status = 'FETCHING_ERROR'
    }
  }

  if (
    Object.hasOwnProperty.call(options, 'fetchImmediately') &&
    options.fetchImmediately
  ) {
    getLeagueData()
  }

  const selectedYearLeagueData = computed(({ selectedYear }) => {
    return state.leagueData.filter((x) => x.year == selectedYear)[0]
  })
  const divisionOneMembers = computed(() => {
    return selectedYearLeagueData.leagueData
      .filter((x) => x.division.id == 590406)
      .sort((a, b) =>
        a.wins / a.losses == b.wins / a.losses
          ? a.pointsFor.value < b.pointsFor.value
          : a.wins / a.losses < b.wins / a.losses,
      )
  })
  const divisionTwoMembers = computed(() => {
    return selectedYearLeagueData.leagueData
      .filter((x) => x.division.id == 590407)
      .sort((a, b) =>
        a.wins / a.losses == b.wins / a.losses
          ? a.pointsFor.value < b.pointsFor.value
          : a.wins / a.losses < b.wins / a.losses,
      )
  })
  const nonDivisionRankings = computed(({ selectedYearLeagueData }) => {
    let sorted = selectedYearLeagueData.leagueData.slice().sort((a, b) => {
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
  })

  return {
    ...toRefs(state),
    getLeagueData,
    selectedYearLeagueData,
    divisionOneMembers,
    divisionTwoMembers,
    nonDivisionRankings,
  }
}
