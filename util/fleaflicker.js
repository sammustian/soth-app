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

        //get members

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
                games: []
            }
            leagueMembers.push(obj);
        });

        //get divisions

        let leagueInfo = await this.callEndPoint("FetchLeagueStandings", {
            season: "2020"
        }).then(res => res);
        for (let member of leagueMembers) {
            let match = leagueInfo.divisions[0].teams.some((divisionTeam) => {
                return divisionTeam.id == member.id
            });
            if (match) {
                member.division = {
                    id: leagueInfo.divisions[0].id,
                    name: leagueInfo.divisions[0].name
                }
            } else {
                member.division = {
                    id: leagueInfo.divisions[1].id,
                    name: leagueInfo.divisions[1].name
                }
            }
        }
        return leagueMembers;
    }

    static async buildPlayerStandingsDataStructure() {
        let leagueMembers = await this.getLeagueMembers();
        let weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        for (let week of weeks) {
            let games = await this.callEndPoint("FetchLeagueScoreboard", {
                season: "2020",
                scoring_period: week
            }).then(res => res.games);
            //console.log(games);


            for (let game of games) {
                if (parseInt(game.awayScore.score.formatted) !== 0 && parseInt(game.homeScore.score.formatted) !== 0 ) {
                    let homeMemberIndex = leagueMembers.findIndex((member) => member.id == game.home.id);
                    let awayMemberIndex = leagueMembers.findIndex((member) => member.id == game.away.id);
                    //@note: add win conditions for games not played and games in progress
                    
                    leagueMembers[homeMemberIndex].games.push({
                        id: game.id,
                        week: week,
                        win: (game.isInProgress ? null : (game.homeResult == "WIN" ? true : false)),
                        matchup: leagueMembers[awayMemberIndex],
                        score: game.homeScore,
                        isDivisional: (game.isDivisional ? true : false),
                        gameInProgress: (game.isInProgress ? true : false)
                    });

                    leagueMembers[awayMemberIndex].games.push({
                        id: game.id,
                        week: week,
                        win: (game.isInProgress ? null : (game.awayResult == "WIN" ? true : false)),
                        matchup: leagueMembers[homeMemberIndex],
                        score: game.awayScore,
                        isDivisional: (game.isDivisional ? true : false),
                        gameInProgress: (game.isInProgress ? true : false)
                    });

                }
            }
            //break;

            //record game to leagueMember
            leagueMembers.forEach((member, index) => {
                let wins = 0;
                let losses = 0;
                //console.log(member);
                member.games.forEach((game) => {
                    if (game.win == true) {
                        wins++;
                    } else if (game.win == false) {
                        losses++;
                    }
                });

                //console.log(member.name, wins, losses);
                leagueMembers[index].standings = `${wins}-${losses}`;
                leagueMembers[index].wins = wins;
                leagueMembers[index].losses = losses;
            });
        }
        console.log(leagueMembers);
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
