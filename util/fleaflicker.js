const leagueID = 199769;

export default class fleaFlickerAPI {
    constructor() {


    }

    static async callEndPoint(route, options = {}) {
        options.league_id = leagueID;
        const params = new URLSearchParams(options);
        let query = `/api/${route}?${params.toString()}`
        let results;
        await fetch(query)
            .then((response) => response.json())
            .then((responseData => {
                results = responseData;
            }))
            .catch(e => console.warn(e));
        return results;
    }

    static async getRankingTeams() {
        await this.callEndPoint("FetchLeagueStandings", {
            season: "2019",
        }).then(res => {
            console.log(res);
            return res;
        });
    }

    static async getLeagueMembers() {
        let leagueMembers = [];
        let rosters = await this.callEndPoint("FetchLeagueRosters", {
            season: "2019",
            scoring_period: 12
        }).then(res => res.rosters);

        rosters.forEach((roster) => {
            let obj = {
                id: roster.team.id,
                initials: roster.team.initials,
                name: roster.team.name,
                games: {}
            }
            leagueMembers.push(obj);
        });
        //get divisons
        let leagueInfo = await this.callEndPoint("FetchLeagueStandings", {
            season: "2019"
        }).then(res => res);
        for (let member of leagueMembers) {
            //leagueInfo.divisons[0]
        }
    }

    static async buildPlayerStandingsDataStructure() {
        console.log('here');
        let leagueMembers = await this.getLeagueMembers();
        console.log(leagueMembers);
        let weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
         for (let week of weeks) {
                await this.callEndPoint("FetchLeagueScoreboard", {
                    season: "2019",
                    scoring_period: week
                }).then(res => {
                    console.log(res)
                });
                break;
        }

    }

    static async getPlayoffData() {
        let standings = {};
        //await this.getRankingTeams();
        //let weeksNumbers = [13, 14, 15, 16];

        //build player standings data
        this.buildPlayerStandingsDataStructure();

        //order teams by current rankings 1 - 4
        //get player standings @ week 12


        //sort player standings into top 4 and bottom 4
        //get players matchups


        // for (const week of weeksNumbers) {
        //     console.log(week)
        //     await this.callEndPoint("FetchLeagueScoreboard", {
        //         season: "2019",
        //         scoring_period: week
        //     }).then(res => {
        //         console.log(res)
        //     });

        // }

        return standings;
    }

}
