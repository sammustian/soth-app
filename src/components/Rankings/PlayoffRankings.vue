<template>
<section class="playoff-standings">
    <v-progress-circular indeterminate color="purple"></v-progress-circular>
    <v-card width="auto">
        <v-toolbar color="dark" dark>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
        <v-list three-line>
            <!-- <template v-for="(item, index) in leagueData">
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
            </template> -->
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
            dataLoaded,
            api_status,
            getLeagueData,
            // selectedYearLeagueData,
            // nonDivisionRankings
        } = useLeagueData(props.selectedYear, {
            fetchImmediately: true
        });

        return {
            leagueData,
            dataLoaded,
            api_status,
            getLeagueData,
            // selectedYearLeagueData,
            // nonDivisionRankings
        };
    },
    data() {
        return {};
    },
};
</script>
