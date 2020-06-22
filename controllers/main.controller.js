var testModel = require('../models/test.model')
var request = require('request');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var csvHeader = [
    { id: 'name', title: "Jugador" },
    { id: 'current_team_name', title: "Mi Base de datos" },
    { id: 'leagues', title: "Current League Name" },
    { id: 'positions', title: "Posición específica" },
    { id: 'age', title: "Edad" },
    { id: 'market_value', title: "Valor de mercado" },
    { id: 'contract_expires', title: "Vencimiento contrato" },
    { id: 'total_matches', title: "Partidos jugados" },
    { id: 'minutes_on_field', title: "Minutos jugados" },
    { id: 'goals', title: "Goles" },
    { id: 'xg_shot', title: "xG" },
    { id: 'assists', title: "Asistencias" },
    { id: 'xg_assist', title: "xA" },
    { id: 'birth_country_name', title: "País de nacimiento" },
    { id: 'passport_country_names', title: "Pasaporte" },
    { id: 'foot', title: "Pie" },
    { id: 'height', title: "Altura" },
    { id: 'weight', title: "Peso" },
    { id: 'on_loan', title: "En préstamo" },
    { id: 'successful_defensive_actions_avg', title: "Acciones defensivas logradas en los 90" },
    { id: 'defensive_duels_avg', title: "Duelos defensivos en los 90" },
    { id: 'defensive_duels_won', title: "Duelos defensivos ganados %" },
    { id: 'aerial_duels_avg', title: "Duelos aéreos en los 90" },
    { id: 'aerial_duels_won', title: "Title" },
    { id: 'tackle_avg', title: "Title" },
    { id: 'possession_adjusted_tackle', title: "Title" },
    { id: 'shot_block_avg', title: "Title" },
    { id: 'interceptions_avg', title: "Title" },
    { id: 'possession_adjusted_interceptions', title: "Title" },
    { id: 'fouls_avg', title: "Title" },
    { id: 'yellow_cards', title: "Title" },
    { id: 'yellow_cards_avg', title: "Title" },
    { id: 'red_cards', title: "Title" },
    { id: 'red_cards_avg', title: "Title" },
    { id: 'successful_attacking_actions_avg', title: "Title" },
    { id: 'goals_avg', title: "Title" },
    { id: 'non_penalty_goal', title: "Title" },
    { id: 'non_penalty_goal_avg', title: "Title" },
    { id: 'xg_shot_avg', title: "Title" },
    { id: 'head_goals', title: "Title" },
    { id: 'head_goals_avg', title: "Title" },
    { id: 'shots', title: "Title" },
    { id: 'shots_avg', title: "Title" },
    { id: 'shots_on_target_percent', title: "Title" },
    { id: 'goal_conversion_percent', title: "Title" },
    { id: 'assists_avg', title: "Title" },
    { id: 'crosses_avg', title: "Title" },
    { id: 'accurate_crosses_percent', title: "Title" },
    { id: 'cross_from_left_avg', title: "Title" },
    { id: 'successful_cross_from_left_percent', title: "Title" },
    { id: 'cross_from_right_avg', title: "Title" },
    { id: 'successful_cross_from_right_percent', title: "Title" },
    { id: 'cross_to_goalie_box_avg', title: "Title" },
    { id: 'dribbles_avg', title: "Title" },
    { id: 'successful_dribbles_percent', title: "Title" },
    { id: 'offensive_duels_avg', title: "Title" },
    { id: 'offensive_duels_won', title: "Title" },
    { id: 'touch_in_box_avg', title: "Title" },
    { id: 'progressive_run_avg', title: "Title" },
    { id: 'passes_avg', title: "Title" },
    { id: 'accurate_passes_percent', title: "Title" },
    { id: 'forward_passes_avg', title: "Title" },
    { id: 'successful_forward_passes_percent', title: "Title" },
    { id: 'back_passes_avg', title: "Title" },
    { id: 'successful_back_passes_percent', title: "Title" },
    { id: 'vertical_passes_avg', title: "Title" },
    { id: 'successful_vertical_passes_percent', title: "Title" },
    { id: 'short_medium_pass_avg', title: "Title" },
    { id: 'accurate_short_medium_pass_percent', title: "Title" },
    { id: 'long_passes_avg', title: "Title" },
    { id: 'successful_long_passes_percent', title: "Title" },
    { id: 'average_pass_length', title: "Title" },
    { id: 'average_long_pass_length', title: "Title" },
    { id: 'xg_assist_avg', title: "Title" },
    { id: 'pre_assist_avg', title: "Title" },
    { id: 'pre_pre_assist_avg', title: "Title" },
    { id: 'smart_passes_avg', title: "Title" },
    { id: 'accurate_smart_passes_percent', title: "Title" },
    { id: 'key_passes_avg', title: "Title" },
    { id: 'passes_to_final_third_avg', title: "Title" },
    { id: 'accurate_passes_to_final_third_percent', title: "Title" },
    { id: 'pass_to_penalty_area_avg', title: "Title" },
    { id: 'accurate_pass_to_penalty_area_percent', title: "Title" },
    { id: 'through_passes_avg', title: "Title" },
    { id: 'successful_through_passes_percent', title: "Title" },
    { id: 'deep_completed_pass_avg', title: "Title" },
    { id: 'deep_completed_cross_avg', title: "Title" },
    { id: 'progressive_pass_avg', title: "Title" },
    { id: 'successful_progressive_pass_percent', title: "Title" },
    { id: 'conceded_goals', title: "Title" },
    { id: 'conceded_goals_avg', title: "Title" },
    { id: 'shots_against', title: "Title" },
    { id: 'shots_against_avg', title: "Title" },
    { id: 'clean_sheets', title: "Title" },
    { id: 'save_percent', title: "Title" },
    { id: 'xg_save', title: "Title" },
    { id: 'xg_save_avg', title: "Title" },
    { id: 'back_pass_to_gk_avg', title: "Title" },
    { id: 'goalkeeper_exits_avg', title: "Title" },
    { id: 'goalkeeper_punch_avg', title: "Title" },
    { id: 'goalkeeper_punch_accuracy', title: "Title" },
    { id: 'goalkeeper_claim_avg', title: "Title" },
    { id: 'goalkeeper_claim_to_punch', title: "Title" },
    { id: 'gk_aerial_duels_avg', title: "Title" },
    { id: 'gk_aerial_duels_won', title: "Title" },
    { id: 'free_kicks_taken_avg', title: "Title" },
    { id: 'direct_free_kicks_taken_avg', title: "Title" },
    { id: 'direct_free_kicks_on_target_percent', title: "Title" },
    { id: 'corners_taken_avg', title: "Title" },
    { id: 'penalties_taken', title: "Title" },
    { id: 'penalties_conversion_percent', title: "Title" },
]
var scraping = false;
var token = 'a6e7278996032034fdcfbe7e985873617a2b1914';
class mainController {
    async index(req, res) {
        console.log('cosaisndex', csvHeader.length);
        res.send('value');
    }
    async start(req, res) {
        if (!scraping) {
            scraping = true;
            // let page_size = 500;
            let page_current = 13;
            let page_count = 3621;
            let chunck = 0;
            let part = 2;
            let data = {}
            let searchCountry = [
                'ARM',
                'ABW',
                'AUS',
                'AUT',
                'AZE',
                'BHS',
            ]
            let searchCountryString = ''
            for (let i = 0; i < searchCountry.length; i++) {
                searchCountryString += `&search%5Bbirth_country_code%5D%5B%5D=${searchCountry[i]}`
            }
            while (page_current < page_count) {
                console.log(page_current)
                let url = `https://searchapi.wyscout.com/api/v1/search/results.json?search%5Btime_frame%5D=default&search%5Byouth_stats%5D=false&sort=market_value+desc&language=en&groupId=432&subgroupId=1865${searchCountryString}&count=500&page=${page_current}&columns=name%2Cid%2Cimage%2Ccurrent_team_logo%2Ccurrent_team_color%2Cbirth_country_name%2Cpassport_country_names%2Ccurrent_team_name%2Cmarket_value%2Ctotal_matches%2Cminutes_on_field%2Cpositions%2Cage%2Ccontract_expires%2Cgoals%2Cxg_shot%2Cassists%2Cxg_assist%2Cfoot%2Cheight%2Cweight%2Con_loan%2Csuccessful_defensive_actions_avg%2Cdefensive_duels_avg%2Cdefensive_duels_won%2Caerial_duels_avg%2Caerial_duels_won%2Ctackle_avg%2Cpossession_adjusted_tackle%2Cshot_block_avg%2Cinterceptions_avg%2Cpossession_adjusted_interceptions%2Cfouls_avg%2Cyellow_cards%2Cyellow_cards_avg%2Cred_cards%2Cred_cards_avg%2Csuccessful_attacking_actions_avg%2Cgoals_avg%2Cnon_penalty_goal%2Cnon_penalty_goal_avg%2Cxg_shot_avg%2Chead_goals%2Chead_goals_avg%2Cshots%2Cshots_avg%2Cshots_on_target_percent%2Cgoal_conversion_percent%2Cassists_avg%2Ccrosses_avg%2Caccurate_crosses_percent%2Ccross_from_left_avg%2Csuccessful_cross_from_left_percent%2Ccross_from_right_avg%2Csuccessful_cross_from_right_percent%2Ccross_to_goalie_box_avg%2Cdribbles_avg%2Csuccessful_dribbles_percent%2Coffensive_duels_avg%2Coffensive_duels_won%2Ctouch_in_box_avg%2Cprogressive_run_avg%2Cpasses_avg%2Caccurate_passes_percent%2Cforward_passes_avg%2Csuccessful_forward_passes_percent%2Cback_passes_avg%2Csuccessful_back_passes_percent%2Cvertical_passes_avg%2Csuccessful_vertical_passes_percent%2Cshort_medium_pass_avg%2Caccurate_short_medium_pass_percent%2Clong_passes_avg%2Csuccessful_long_passes_percent%2Caverage_pass_length%2Caverage_long_pass_length%2Cxg_assist_avg%2Cpre_assist_avg%2Cpre_pre_assist_avg%2Csmart_passes_avg%2Caccurate_smart_passes_percent%2Ckey_passes_avg%2Cpasses_to_final_third_avg%2Caccurate_passes_to_final_third_percent%2Cpass_to_penalty_area_avg%2Caccurate_pass_to_penalty_area_percent%2Cthrough_passes_avg%2Csuccessful_through_passes_percent%2Cdeep_completed_pass_avg%2Cdeep_completed_cross_avg%2Cprogressive_pass_avg%2Csuccessful_progressive_pass_percent%2Cconceded_goals%2Cconceded_goals_avg%2Cshots_against%2Cshots_against_avg%2Cclean_sheets%2Csave_percent%2Cxg_save%2Cxg_save_avg%2Cback_pass_to_gk_avg%2Cgoalkeeper_exits_avg%2Cgoalkeeper_punch_avg%2Cgoalkeeper_punch_accuracy%2Cgoalkeeper_claim_avg%2Cgoalkeeper_claim_to_punch%2Cgk_aerial_duels_avg%2Cgk_aerial_duels_won%2Cfree_kicks_taken_avg%2Cdirect_free_kicks_taken_avg%2Cdirect_free_kicks_on_target_percent%2Ccorners_taken_avg%2Cpenalties_taken%2Cpenalties_conversion_percent&token=${token}`
                data = await getData(url);
                if (data && data.players) {
                    data = data.players
                    let csvWriter = createCsvWriter({
                        path: `${searchCountry}.csv`,
                        header: csvHeader,
                        append: true
                    });
                    for (let i = 0; i < data.length; i++) {
                        if (page_current < 15) {
                            let item = data[i];
                            let id = item.id;
                            console.log("i, id -> ", page_current, i, id, item.name);
                            let cookie = '_ga=GA1.2.18893143.1589800820; _mkto_trk=id:180-PAY-466&token:_mch-wyscout.com-1589800823985-64128; wy_fingerprint=wnm4NSw9sePB4JDJeYEW3mmCqO36qqsD; aengine_remember_username=0; ajs_user_id=282762; ajs_anonymous_id=%22684f2fc6-6918-49ff-b6fe-ea9a073336a1%22; wy_analytics_prod=%7B%22personId%22:%22282762%22,%22platform%22:%22web%22,%22previousEvent%22:%22Test%20Event%20Tracked%22,%22theme%22:%22light%22,%22version%22:%22v1.3.0%22,%22personName%22:%22Wyscout3%20RC%20DEPORTIVO%22,%22email%22:%22wyscout3@rcdeportivo.es%22,%22groupId%22:%22432%22,%22groupName%22:%22Deportivo%20la%20Coruna%22,%22subgroupId%22:%221865%22,%22subgroupName%22:%22Team%22,%22language%22:%22es%22,%22activeSubscriptionsIds%22:%5B%5D,%22activeSubscriptionsProviders%22:%5B%5D,%22paidSubscriptionsIds%22:%5B%5D,%22features%22:%5B%5D,%22products%22:%5B%5D,%22noOfAccounts%22:0,%22groupType%22:%22Club%22,%22groupCountry%22:%22Spain%22,%22isInternal%22:false%7D; aengine_dtk=a6e7278996032034fdcfbe7e985873617a2b1914; aengine_dtk_refresh=f676414641f511f5c1278c777a7a04bba574b8f9; AWSALB=+yuQaHy/9ttsSPC7x5031MKwKfus7OqKReE/ULG4qFQNcKF3ER7ysULwpLaoQOhmb9KRy2n0eNUAF2FE0NnSwXBytkp6umxKwyrM7E675TtBuP8dzeeQzb5x4h3Z; AWSALBCORS=+yuQaHy/9ttsSPC7x5031MKwKfus7OqKReE/ULG4qFQNcKF3ER7ysULwpLaoQOhmb9KRy2n0eNUAF2FE0NnSwXBytkp6umxKwyrM7E675TtBuP8dzeeQzb5x4h3Z'
                            let query = `{ "obj": "player", "act": "career", "params": { "key": 0, "id": ${id}, "onlyActive": true, "target": "detail_0_player_active_competitions" }, "navi": { "component": "detail_0_player_active_competitions" } }`
                            let playerInfo = await getPlayInfo(cookie, query);
                            let { list } = playerInfo;
                            let leagues = [];
                            for (let j = 0; j < list.length; j++) {
                                leagues.push(list[j]['competitionName'])
                            }
                            console.log("leagues -> ", leagues)
                            data[i]['leagues'] = leagues
                        } else {
                            data[i]['leagues'] = ['-']
                        }
                    }
                    await csvWriter.writeRecords(data)       // returns a promise
                        .then(() => {
                            console.log(page_current, 'added');
                        });
                    page_current++;
                    chunck += 100;
                    if (chunck == 10000) { chunck = 0; part++; }
                } else {
                    break;
                }
            }
            scraping = false;
            if (page_current == page_count) {
                console.log('---------------- all done -------------');
                res.send('OK');
            } else {
                console.log('--unauthorized--', page_current)
                res.send(data);
            }
        }
    }
}

function getPlayInfo(cookie, query) {
    let options = {
        method: "POST",
        url: 'https://platform.wyscout.com/app/aengine-service.php',
        headers: {
            cookie: cookie
        },
        formData: {
            query: query
        }
    }

    return new Promise((resolve, reject) => {
        request(options, function (err, response, body) {
            if (err) throw new Error(err);
            resolve(JSON.parse(body))
        })
    })
}
function getData(url) {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': url,
            'headers': {
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            resolve(JSON.parse(response.body))
        });
    })

}

module.exports = mainController;