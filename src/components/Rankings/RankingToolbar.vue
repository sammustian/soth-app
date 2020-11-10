<template>
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
                <v-list-item v-for="(item, index) in weeks" :key="index+'_'+item">
                    <v-list-item-action>
                        <v-btn @click="changeSelectedWeek(item)">Week {{item}}</v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-menu open-on-hover offchange-y transition="scale-transition" origin="center center">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on">
                    {{selectedYear}}
                </v-btn>
            </template>
            <v-list depressed>
                <v-list-item v-for="(item, index) in years" :key="index+'_'+item">
                    <v-list-item-action>
                        <v-btn @click="changeSelectedYear(item)">{{item}}</v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-toolbar-items>
</v-toolbar>
</template>

<script>
export default {
    name: "RankingToolbar",

    data() {
        return {
            weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            years: [2017, 2018, 2019, 2020],
        };
    },
    methods: {
        changeSelectedWeek(week) {
            this.$store.dispatch('setSelectedWeek', week);
        },
        changeSelectedYear(year) {
            this.$store.dispatch('setSelectedYear', year);
        }
    },
    computed: {
        selectedYear() {
            return this.$store.getters.selectedYear;
        },
        selectedWeek() {
            return this.$store.getters.selectedWeek;
        }
    }
};
</script>
