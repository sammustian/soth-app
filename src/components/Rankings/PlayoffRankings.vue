<template>
<section class="playoff-standings">
    <v-progress-circular v-show="api_status === 'FETCHING'" indeterminate color="purple"></v-progress-circular>
    <v-card v-show="api_status === 'FETCHING_SUCCESS'" width="auto">
        <v-toolbar color="dark" dark>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <v-list three-line>
            <template v-for="(item, index) in nonDivisionRankings">
                <v-list-item :key="item.id">
                    <v-list-item-avatar>
                        <v-img :src="item.logoUrl"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>{{ index + 1 }}. {{ item.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>({{ item.wins }} - {{ item.losses }}) -
                            {{ item.pointsFor.value }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-card>
</section>
</template>

<script>
import useLeagueData from '../../composables/use-league-data.js';
export default {
    name: "PlayoffRankings",
    props: {
        title: String,
        selectedYear: {
            type: Number,
            default: 2020,
            required: true
        },
    },
    setup(props) {
        const {
            leagueData,
            api_status,
            selectedYearLeagueData,
            nonDivisionRankings,
        } = useLeagueData(props.selectedYear, {
            fetchImmediately: true
        });

        return {
            leagueData,
            api_status,
            selectedYearLeagueData,
            nonDivisionRankings,
        };
    },
    data() {
        return {};
    },
};
</script>
