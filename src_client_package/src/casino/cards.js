import methods from "../modules/methods";

const cards = {};
const suits = ['Крести', 'Буби', 'Черви', 'Пики']
const symbols = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const values = [999, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
const models = [
    `vw_prop_vw_club_char_a_a`,
    `vw_prop_vw_club_char_02a`,
    `vw_prop_vw_club_char_03a`,
    `vw_prop_vw_club_char_04a`,
    `vw_prop_vw_club_char_05a`,
    `vw_prop_vw_club_char_06a`,
    `vw_prop_vw_club_char_07a`,
    `vw_prop_vw_club_char_08a`,
    `vw_prop_vw_club_char_09a`,
    `vw_prop_vw_club_char_10a`,
    `vw_prop_vw_club_char_j_a`,
    `vw_prop_vw_club_char_q_a`,
    `vw_prop_vw_club_char_k_a`,

    `vw_prop_vw_dia_char_a_a`,
    `vw_prop_vw_dia_char_02a`,
    `vw_prop_vw_dia_char_03a`,
    `vw_prop_vw_dia_char_04a`,
    `vw_prop_vw_dia_char_05a`,
    `vw_prop_vw_dia_char_06a`,
    `vw_prop_vw_dia_char_07a`,
    `vw_prop_vw_dia_char_08a`,
    `vw_prop_vw_dia_char_09a`,
    `vw_prop_vw_dia_char_10a`,
    `vw_prop_vw_dia_char_j_a`,
    `vw_prop_vw_dia_char_q_a`,
    `vw_prop_vw_dia_char_k_a`,

    `vw_prop_vw_hrt_char_a_a`,
    `vw_prop_vw_hrt_char_02a`,
    `vw_prop_vw_hrt_char_03a`,
    `vw_prop_vw_hrt_char_04a`,
    `vw_prop_vw_hrt_char_05a`,
    `vw_prop_vw_hrt_char_06a`,
    `vw_prop_vw_hrt_char_07a`,
    `vw_prop_vw_hrt_char_08a`,
    `vw_prop_vw_hrt_char_09a`,
    `vw_prop_vw_hrt_char_10a`,
    `vw_prop_vw_hrt_char_j_a`,
    `vw_prop_vw_hrt_char_q_a`,
    `vw_prop_vw_hrt_char_k_a`,

    `vw_prop_vw_spd_char_a_a`,
    `vw_prop_vw_spd_char_02a`,
    `vw_prop_vw_spd_char_03a`,
    `vw_prop_vw_spd_char_04a`,
    `vw_prop_vw_spd_char_05a`,
    `vw_prop_vw_spd_char_06a`,
    `vw_prop_vw_spd_char_07a`,
    `vw_prop_vw_spd_char_08a`,
    `vw_prop_vw_spd_char_09a`,
    `vw_prop_vw_spd_char_10a`,
    `vw_prop_vw_spd_char_j_a`,
    `vw_prop_vw_spd_char_q_a`,
    `vw_prop_vw_spd_char_k_a`
]


cards.bjDealerCardOffset = [
    { pos: new mp.Vector3(0.0356, 0.2105, 0.94885), heading: 178.92 },
    { pos: new mp.Vector3(-0.0436, 0.21205, 0.948875), heading: -180.0 },
    { pos: new mp.Vector3(-0.0636, 0.213825, 0.9496), heading: -178.92 },
    { pos: new mp.Vector3(-0.0806, 0.2137, 0.950225), heading: -177.12 },
    { pos: new mp.Vector3(-0.1006, 0.21125, 0.950875), heading: 180.0 },
    { pos: new mp.Vector3(-0.1256, 0.21505, 0.951875), heading:  178.56 },
    { pos: new mp.Vector3(-0.1416, 0.21305, 0.953), heading: 180.0 },
    { pos: new mp.Vector3(-0.1656, 0.21205, 0.954025), heading: 178.2 },
    { pos: new mp.Vector3(-0.1836, 0.21255, 0.95495), heading: -177.12 },
    { pos: new mp.Vector3(-0.2076, 0.21105, 0.956025), heading: 180.0 },
    { pos: new mp.Vector3(-0.2246, 0.21305, 0.957), heading:  178.56 }
]


cards.bjPlayerCardOffset = [
    [
        { pos: new mp.Vector3(0.5737, 0.2376, 0.948025), heading: 69.12 },
        { pos: new mp.Vector3(0.562975, 0.2523, 0.94875), heading: 67.8 },
        { pos: new mp.Vector3(0.553875, 0.266325, 0.94955), heading: 66.6 },
        { pos: new mp.Vector3(0.5459, 0.282075, 0.9501), heading: 70.44 },
        { pos: new mp.Vector3(0.536125, 0.29645, 0.95085), heading: 70.84 },
        { pos: new mp.Vector3(0.524975, 0.30975, 0.9516), heading: 67.88 },
        { pos: new mp.Vector3(0.515775, 0.325325, 0.95235), heading: 69.56 }
    ],
    [
        { pos: new mp.Vector3(0.2325, -0.1082, 0.94805), heading: 22.11 },
        { pos: new mp.Vector3(0.23645, -0.0918, 0.949), heading: 22.32 },
        { pos: new mp.Vector3(0.2401, -0.074475, 0.950225), heading: 20.8 },
        { pos: new mp.Vector3(0.244625, -0.057675, 0.951125), heading: 19.8 },
        { pos: new mp.Vector3(0.249675, -0.041475, 0.95205), heading: 19.44 },
        { pos: new mp.Vector3(0.257575, -0.0256, 0.9532), heading: 26.28 },
        { pos: new mp.Vector3(0.2601, -0.008175, 0.954375), heading: 22.68 }
    ],
    [
        { pos: new mp.Vector3(-0.2359, -0.1091, 0.9483), heading: -21.43 },
        { pos: new mp.Vector3(-0.221025, -0.100675, 0.949), heading: -20.16 },
        { pos: new mp.Vector3(-0.20625, -0.092875, 0.949725), heading: -16.92 },
        { pos: new mp.Vector3(-0.193225, -0.07985, 0.950325), heading: -23.4 },
        { pos: new mp.Vector3(-0.1776, -0.072, 0.951025), heading: -21.24 },
        { pos: new mp.Vector3(-0.165, -0.060025, 0.951825), heading: -23.76 },
        { pos: new mp.Vector3(-0.14895, -0.05155, 0.95255), heading: -19.44 }
    ],
    [
        { pos: new mp.Vector3(-0.5765, 0.2229, 0.9482), heading: -67.03 },
        { pos: new mp.Vector3(-0.558925, 0.2197, 0.949175), heading: -69.12 },
        { pos: new mp.Vector3(-0.5425, 0.213025, 0.9499), heading: -64.44 },
        { pos: new mp.Vector3(-0.525925, 0.21105, 0.95095), heading: -67.68 },
        { pos: new mp.Vector3(-0.509475, 0.20535, 0.9519), heading: -63.72 },
        { pos: new mp.Vector3(-0.491775, 0.204075, 0.952825), heading: -68.4 },
        { pos: new mp.Vector3(-0.4752, 0.197525, 0.9543), heading: -64.44 }
    ],
]


cards.GetRandomCard = () => {
    // const model = 
    const random_card_number = Math.floor(Math.random()*models.length)
    // const random_card_id = 
    return {
        id: random_card_number,
        model: models[random_card_number],
        suit: Math.floor((random_card_number + 13) / 13) + 1,
        symbol: random_card_number%13,
        suit_name: suits[Math.floor((random_card_number+13) / 13)-1],
        symbol_name: symbols[random_card_number%13],
        value: values[random_card_number%13]
    }
}


cards.getCardByID = (card_id) => {
    try {
        // const model =
        const random_card_number = card_id
        // const random_card_id =
        return {
            id: random_card_number,
            model: models[random_card_number],
            suit: Math.floor((random_card_number + 13) / 13) + 1,
            symbol: random_card_number%13,
            suit_name: suits[Math.floor((random_card_number+13) / 13)-1],
            symbol_name: symbols[random_card_number%13],
            value: values[random_card_number%13]
        }
    }
    catch (e) {
        methods.error(`catch in cards.getCardByID`,e.toString())
    }
}

cards.getSumm = (cards) => {
    try {
        if(!cards || !cards.length) return 0
        let cards_summ = 0
        for(let i = 0; i < cards.length; i++) {
            let val = cards[i].value
            if(val == 999) {
                if((cards_summ+11) > 21) val = 1
                else val = 11
            }
            cards_summ += val
        }
        return cards_summ
    }
    catch (e) {    }
}



export default cards;