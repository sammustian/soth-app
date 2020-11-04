<template>
<div>
    <v-container v-if="!dataLoaded" class="fill-height" fluid>
        <v-row justify="center" align="center">
            <v-col class="shrink">
                <v-progress-circular indeterminate color="purple"></v-progress-circular>
            </v-col>
        </v-row>
    </v-container>
    <v-container v-if="dataLoaded">
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
                <PlayoffStandings :title="'Playoff Rankings'" :rankings="selectedYearLeagueData.leagueData"></PlayoffStandings>
            </v-col>
            <v-col>
                <DivisionRankings class="ma-5 mt-0" :title="divisionOneTitle" :division="divisionOneMembers"></DivisionRankings>
                <DivisionRankings class="ma-5" :title="divisionTwoTitle" :division="divisionTwoMembers"></DivisionRankings>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import DivisionRankings from "../components/DivisionRankings.vue";
import PlayoffStandings from "../components/PlayoffStandings.vue";
import {
    useLeagueData
} from '../composables/use-league-data.js';

export default {
    props: {},
    data() {
        return {
            selectedYear: 2020,
            selectedWeek: null,
            availableWeeks: []
        }
    },
    name: "Rankings",
    components: {
        DivisionRankings,
        PlayoffStandings
    },
    setup() {
        return useLeagueData(2020);
    },

    methods: {
        async changeYear(year) {
            this.dataLoaded = false;
            await this.getLeagueData(year);
            this.selectedYear = year;
            this.selectedWeek = this.defaultWeek;
            this.dataLoaded = true;
        }
    },
    computed: {
        divisionOneTitle() {
            return this.divisionOneMembers[0].division.name;
        },
        divisionTwoTitle() {
            return this.divisionTwoMembers[0].division.name;
        },
        avaliableYears() {
            return this.leagueData.map(x => x.year);
        },
    },
};
</script>
