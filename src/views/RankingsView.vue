<template>
<div>
    <v-container>
        <RankingToolbar />
        <v-row justify="center">
            <v-col>
                <PlayoffRankings :selectedYear="selectedYear" :selectedWeek="selectedWeek" :title="'Playoff Rankings'"></PlayoffRankings>
            </v-col>
            <!-- <v-col>
                <DivisionRankings class="ma-5 mt-0" :title="divisionOneTitle" :division="divisionOneMembers"></DivisionRankings>
                <DivisionRankings class="ma-5" :title="divisionTwoTitle" :division="divisionTwoMembers"></DivisionRankings>
            </v-col> -->
        </v-row>
    </v-container>

</div>
</template>

<script>
// import DivisionRankings from "../components/Rankings/DivisionRankings.vue";
import PlayoffRankings from "../components/Rankings/PlayoffRankings.vue";
import RankingToolbar from "../components/Rankings/RankingToolbar";
// import {
//     useLeagueData
// } from '../composables/use-league-data.js';

export default {
    props: {

    },
    data() {
        return {}
    },
    name: "RankingsView",
    components: {
        // DivisionRankings,
        PlayoffRankings,
        RankingToolbar
    },

    methods: {},
    computed: {
        selectedYear() {
            return this.$store.getters.selectedYear;
        },
        selectedWeek() {
            return this.$store.getters.selectedWeek;
        }
        // divisionOneTitle() {
        //     return this.divisionOneMembers[0].division.name;
        // },
        // divisionTwoTitle() {
        //     return this.divisionTwoMembers[0].division.name;
        // },
        // avaliableYears() {
        //     return this.leagueData.map(x => x.year);
        // },
    },
};
</script>
