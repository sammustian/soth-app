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

    static async getLeagueMembers(year) {

        //get members
        let leagueMembers = [];
        let rosters = await this.callEndPoint("FetchLeagueRosters", {
            season: year,
            // scoring_period: 12
        }).then(res => res.rosters);

        rosters.forEach((roster) => {
            let obj = {
                id: parseInt(roster.team.id),
                initials: roster.team.initials,
                name: roster.team.name,
                games: [],
                pointsFor: roster.team.pointsFor,
                pointsAgainst: roster.team.pointsAgainst,
                streak: roster.team.streak,
                waiverPosition: roster.team.waiverPostion,
                logoUrl: roster.team.logoUrl ? roster.team.logoUrl : 'https://pkimgcdn.peekyou.com/c88f18e64d9814b3ce14fb4b18ef0f59.jpeg'
            }
            leagueMembers.push(obj);
        });

        //get divisions

        let leagueInfo = await this.callEndPoint("FetchLeagueStandings", {
            season: year
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

    static async buildPlayerStandingsDataStructure(year) {
        let leagueMembers = await this.getLeagueMembers(year);
        let weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        for (let week of weeks) {
            let games = await this.callEndPoint("FetchLeagueScoreboard", {
                season: year,
                scoring_period: week
            }).then(res => res.games);


            for (let game of games) {
                if (parseInt(game.awayScore.score.formatted) !== 0 && parseInt(game.homeScore.score.formatted) !== 0) {
                    let homeMemberIndex = leagueMembers.findIndex((member) => member.id == game.home.id);
                    let awayMemberIndex = leagueMembers.findIndex((member) => member.id == game.away.id);
                    //@note: add win conditions for games not played and games in progress
                    //  console.log(leagueMembers[awayMemberIndex]);
                    let awayMatchup = {
                        name: leagueMembers[awayMemberIndex].name,
                        id: leagueMembers[awayMemberIndex].id,
                        score: game.awayScore.score,
                        isDivisional: (game.isDivisional ? true : false),
                        gameInProgress: (game.isInProgress ? true : false)

                    };
                    let homeMatchup = {
                        name: leagueMembers[homeMemberIndex].name,
                        id: leagueMembers[homeMemberIndex].id,
                        score: game.homeScore.score,
                        isDivisional: (game.isDivisional ? true : false),
                        gameInProgress: (game.isInProgress ? true : false)
                    };

                    leagueMembers[homeMemberIndex].games.push({
                        id: game.id,
                        week: week,
                        home: true,
                        away: false,
                        win: (game.isInProgress ? null : (game.homeResult == "WIN" ? true : false)),
                        matchup: awayMatchup,
                        score: game.homeScore,
                        isDivisional: (game.isDivisional ? true : false),
                        gameInProgress: (game.isInProgress ? true : false)
                    });

                    leagueMembers[awayMemberIndex].games.push({
                        id: game.id,
                        week: week,
                        home: false,
                        away: true,
                        win: (game.isInProgress ? null : (game.awayResult == "WIN" ? true : false)),
                        matchup: homeMatchup,
                        score: game.awayScore,
                        isDivisional: (game.isDivisional ? true : false),
                        gameInProgress: (game.isInProgress ? true : false)
                    });

                } else {
                    break;
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

        return leagueMembers;
    }

    static async getPlayoffData(year) {
        return await this.buildPlayerStandingsDataStructure(year);

    }

}
