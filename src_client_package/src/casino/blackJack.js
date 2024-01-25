
// import Container from '../modules/data';
import methods from '../modules/methods';
import ui from '../modules/ui';
import user from '../user';
import cards from './cards';
import dealerPed from './dealer_peds';
import Misc from "./misc";
import new_events from "../check_events";

let blackJack = {}
/** @type BlackJackTable */
blackJack.currentTable = null
/** @type boolean */
blackJack.active = false
/** @type BlackJackTable[] */
let allTables = []
let lastCamMode = 0

let resolution = mp.game.graphics.getScreenActiveResolution(0, 0)
const updateResolution = () => { resolution = mp.game.graphics.getScreenActiveResolution(0, 0) }

const BLACKJACK_STATES = {
    WAIT_FIRST_BET: 0,
    WAIT_TIME_START: 1,
    GAME_STARTED: 2,
    GAME_END: 3,
    GAME_PLAYER_MOVE: 4
}

const sharedAnimDict = 'anim_casino_b@amb@casino@games@shared@player@'
const playerAnimDict = 'anim_casino_b@amb@casino@games@blackjack@player'

const dealerSharedDict = 'anim_casino_b@amb@casino@games@shared@dealer@'
const dealerAnimDict = 'anim_casino_b@amb@casino@games@blackjack@dealer'

const shufflerOffset = new mp.Vector3(0.526, 0.571, 0.963)


const ANIM_EVENTS = {
    ATTACH_CARD: -1345695206,
    DETACH_CARD: 585557868
}

const BLACKJACK_SERVER_TIME_STOP = 1500
let lastBlackjackServerCall = new Date().getTime()

const betOffsets = [
    (new mp.Vector3(0.712625, 0.170625, 0.95)),
    (new mp.Vector3(0.278125, -0.2571, 0.95)),
    (new mp.Vector3(-0.30305, -0.2464, 0.95)),
    (new mp.Vector3(-0.72855, 0.17345, 0.95))
];

const tablesData = [
    {
        id: 1,
        modelHash: `vw_prop_casino_blckjack_01`,
        pos: new mp.Vector3(1148.837, 269.747, -52.8409),
        heading: -134.69,
        seats: [
            { pos: new mp.Vector3(1148.08, 268.9354, -52.84095), heading: 25.30935 },
            { pos: new mp.Vector3(1148.075, 269.8671, -52.84095), heading: 335.3093 },
            { pos: new mp.Vector3(1148.708, 270.5051, -52.84095), heading: 295.3094 },
            { pos: new mp.Vector3(1149.651, 270.502, -52.84095), heading: 245.3094 },
        ]
    },
    {
        id: 2,
        modelHash: `vw_prop_casino_blckjack_01`,
        pos: new mp.Vector3(1151.84, 266.747, -52.8409),
        heading: 45.31,
        seats: [
            { pos: new mp.Vector3(1152.597, 267.5587, -52.84095), heading: 205.3094 },
            { pos: new mp.Vector3(1152.602, 266.6269, -52.84095), heading: 155.3093 },
            { pos: new mp.Vector3(1151.969, 265.9889, -52.84095), heading: 115.3094 },
            { pos: new mp.Vector3(1151.026, 265.9921, -52.84095), heading: 65.30935 },
        ]
    },
    {
        id: 3,
        modelHash: `vw_prop_casino_blckjack_01b`,
        pos: new mp.Vector3(1129.406, 262.3578, -52.041),
        heading: 135.31,
        seats: [
            { pos: new mp.Vector3(1128.595, 263.1143, -52.041), heading: 295.3094 },
            { pos: new mp.Vector3(1129.527, 263.1194, -52.041), heading: 245.3094 },
            { pos: new mp.Vector3(1130.165, 262.4864, -52.041), heading: 205.3095 },
            { pos: new mp.Vector3(1130.161, 261.5438, -52.041), heading: 155.3094 },
        ]
    },
    {
        id: 4,
        modelHash: `vw_prop_casino_blckjack_01b`,
        pos: new mp.Vector3(1144.429, 247.3352, -52.041),
        heading: 135.31,
        seats: [
            { pos: new mp.Vector3(1143.617, 248.0918, -52.041), heading: 295.3094 },
            { pos: new mp.Vector3(1144.549, 248.0968, -52.041), heading: 245.3094 },
            { pos: new mp.Vector3(1145.187, 247.4638, -52.041), heading: 205.3095 },
            { pos: new mp.Vector3(1145.184, 246.5213, -52.041), heading: 155.3094 },
        ]
    },
]


blackJack.casinoEnter = () => {
    try {
        methods.callRemote('server:blackJack:newData', 'need_data_on_enter')
        allTables.map(table => {
            dealerPed.fixComponents(table.dealerPed, table.dealerType)
        })
    }
    catch (e) {
        methods.error(`catch in blackJack.casinoEnter`, e.toString())
    }
}

/* ЗАТЕСТИТЬ СТРИМ АНИМКИ


mp.game.streaming.requestAnimDict('anim_casino_b@amb@casino@games@shared@player@')


/eval ( () => { 
    let { x, y, z } = mp.players.local.position;
    let rot = 0.0;
    let sceneId = mp.game.ped.createSynchronizedScene(x, y, z, 0, 0, rot, 2);
    mp.players.local.taskSynchronizedScene(sceneId, 'anim_casino_b@amb@casino@games@shared@player@', 'sit_enter_left_side', 3.0, -3.0, 13, 16, 2.0, 0); 
} )()



/eval ( () => {
    let { x, y, z } = mp.players.local.position;
    let rot = 0.0;
    let sceneId = mp.game.ped.createSynchronizedScene(x, y, z, 0, 0, rot, 2);
    mp.players.atRemoteId(1).taskSynchronizedScene(sceneId, 'anim_casino_b@amb@casino@games@shared@player@', 'sit_enter_left_side', 3.0, -3.0, 13, 16, 2.0, 0);
} )()

/eval ( () => {
mp.players.local.taskPlayAnim('anim_casino_b@amb@casino@games@blackjack@player', "decline_card_001", 3.0, 1.0, -1, 2, 0, false, false, false)
})()

/eval ( () => {
    try {
        const pos = mp.players.local.position;
        return `int is ${mp.game.interior.getInteriorAtCoords(pos.x, pos.y, pos.z)}`
    }
    catch(e) { }
})()



mp.players.local.taskPlayAnim("anim_casino_b@amb@casino@games@shared@player@", "idle_cardgames", 1000.0, -2.0, -1, 2, 1148846080, false, false, false)



*/

new_events.add('render', () => {
    try {
        // mp.game.graphics.drawText(`dist: ${blackJack.currentTable?methods.distanceToPos(blackJack.currentTable.seats[blackJack.currentTable.current_seat].pos, mp.players.local.position):''}`, [0.5, 0.13], { font: 4, color: [255, 255, 255, 255], scale: [0, 0.4], outline: true, centre: true });
        if (!blackJack.active || !blackJack.currentTable) return;
        if (ui.isShowHud()) ui.hideHud()
        if(blackJack.currentTable.current_seat == -1 || methods.distanceToPos(blackJack.currentTable.seats[blackJack.currentTable.current_seat].pos, mp.players.local.position) > 1.2) {
            return blackJack.currentTable.leftTable()
        }
        // mp.game.controls.disableControlAction(0, 0, true)

    }
    catch(e) {
        methods.debug('Exception: blackJack.render');
        methods.debug(e);
    }
});



const DEALER_ANIMS = {
    'idle': { animName: 'idle', animDict: dealerSharedDict },
    'check_and_turn_card': { animName: 'check_and_turn_card', animDict: dealerAnimDict },
    'check_card': { animName: 'check_card', animDict: dealerAnimDict },
    'retrieve_own_cards_and_remove': { animName: 'retrieve_own_cards_and_remove', animDict: dealerAnimDict },
    'deal_card_self_second_card': { animName: 'deal_card_self_second_card', animDict: dealerAnimDict },
    'deal_card_self': { animName: 'deal_card_self', animDict: dealerAnimDict },
    'deal_card_self_card_10': { animName: 'deal_card_self_card_10', animDict: dealerAnimDict },
}



class BlackJackTable {
    constructor(id, tableObject, position, heading, model, seats) {
        this.id = id
        // this.tableObject = tableObject
        this.position = position
        this.heading = heading
        this.model = model
        
        this.current_seat = -1
        this.dealerPed = null
        this.dealerType = (id+6 <= 13) ? (id+6) : 7
        this.dealerGenre = 1

        this.seats = seats

        this.state = BLACKJACK_STATES.WAIT_FIRST_BET
        this.waitingTime = 0

        this.current_card = null

        this.seat_started = false

        this.currentBet = {
            amount: 0,
            chip: null
        }
        this.betAmount = 1

        this.dealerCards = []


        this.players = [-1, -1, -1, -1]

        this.playerServerCards = [[], [], [], []]
        this.dealerServerCards = []

        this.playerCards = [[], [], [], []]
        this.playerBets = [0, 0, 0, 0]
        this.playerChips = [null, null, null, null]
        this.moving_player_chair = -1
        this.playersOnChairs = [false, false, false, false]

        this.lastCardFirstValue = { }
        this.gameInterval = null

        this.dealerCardFlipped = false

        this.move_selected = false

        this.createNpc()
    }

    async firstGiveCardToAll() {
        methods.debug(`players = ${JSON.stringify(this.players)}, bets = ${JSON.stringify(this.playerBets)}`)
        for(let i=0; i<4; i++) {
            if(this.players[i] == -1 || this.playerBets[i] <= 0) continue
            for(let k=0; k<2; k++) {
                await this.newCardInShuffler(this.playerServerCards[i][k])
                await this.dealerGivePlayerCard(i)
            }
        }

        for(let i=0; i<2; i++) {
            await this.newCardInShuffler(this.dealerServerCards[i])
            await this.dealerGiveSelfCard()
        }

        await methods.sleep(1000)

        // await this.dealerCheckCard()
    }

    getCardValues() {
        let cardValues = []
        updateResolution()
        if(this.dealerCards.length >= 2) {
            let { x, y } = mp.game.graphics.world3dToScreen2d(mp.game.object.getObjectOffsetFromCoords(this.position.x, this.position.y, this.position.z, this.heading, cards.bjDealerCardOffset[1].pos.x, cards.bjDealerCardOffset[1].pos.y, cards.bjDealerCardOffset[1].pos.z)) || { x:0, y:0 };
            if(x > 0 && y > 0.2) cardValues.push({
                cards: this.dealerCardFlipped ? cards.getSumm(this.dealerCards) : cards.getSumm([this.dealerCards[1]]), x: Math.round(resolution.x * x), y: Math.round(resolution.y * (y-0.01))
            })
        }
        this.playerCards.map((p, i) => {
            if(p.length >= 2) {
                let { x, y } = mp.game.graphics.world3dToScreen2d(mp.game.object.getObjectOffsetFromCoords(this.position.x, this.position.y, this.position.z, this.heading, cards.bjPlayerCardOffset[i][1].pos.x, cards.bjPlayerCardOffset[i][1].pos.y, cards.bjPlayerCardOffset[i][1].pos.z)) || { x:0, y:0 };
                if(x > 0 && y < 0.9) cardValues.push({
                    cards: cards.getSumm(p), x: Math.round(resolution.x * x), y: Math.round(resolution.y * (y-0.01))
                })
            }
        })
        return cardValues
    }

    gameIntervalFunc() {
        let cardValues = this.getCardValues()
        if (cardValues.length) {
            if (this.lastCardFirstValue.x && this.lastCardFirstValue.y && (Math.max(cardValues[0].x, this.lastCardFirstValue.x)-Math.min(cardValues[0].x, this.lastCardFirstValue.x) > 50 || Math.max(cardValues[0].y, this.lastCardFirstValue.y)-Math.min(cardValues[0].y, this.lastCardFirstValue.y) > 50)) {
                 ui.callCef('updateCardsBlackjack', JSON.stringify(this.getCardValues()));
                this.lastCardFirstValue = cardValues[0]
            }
            if (!this.lastCardFirstValue.x || !this.lastCardFirstValue.y) this.lastCardFirstValue = cardValues[0]
        }
    }

    updateCefData() {
        if(blackJack.currentTable != this) return

        const data = {
            type: 'update',
            casino_money: user.getCasinoMoney(),
            // history: [...this.history].reverse(),
            current_waiting_time: this.waitingTime,
            // game_active: game_active,
            current_bid: this.currentBet.amount || 0,
            state: this.state,
            chips_to_bid: this.betAmount || 1,
            card_values: this.getCardValues(),
            visible_cancel_and_x2: this.playerCards[this.current_seat].length == 2
        }

        ui.callCef('showCasinoBlackjack', JSON.stringify(data));
        methods.debug(`new cef data wait time: ${this.waitingTime}, state: ${this.state}`)
    }

    createNpc() { // +
        try {
            const position = { x: this.position.x, y: this.position.y, z: this.position.z }
            const heading = this.heading-180.0 < 0 ? this.heading+180.0 : this.heading-180.0
            const rad = heading * (Math.PI/180)
            const back = new mp.Vector3(-Math.sin(rad), Math.cos(rad), 0.0)
            position.x -= 0.77 * back.x
            position.y -= 0.77 * back.y
    
            dealerPed.create(position, heading, this.dealerType).then(d => {
                this.dealerPed = d
                setTimeout(() => this.playDealerAnim(DEALER_ANIMS.idle, true), 1000)
            })
        }
        catch(e) {
            methods.debug('Exception: blackJack.createNpc');
            methods.debug(e);
        }
    }

    leftTable(withAnim=false, fromGui=false) { // +
        mp.game.invoke('0x5A4F9EDF1673F704', lastCamMode)
        methods.blockKeys(false);
        methods.disableDefaultControls(false);
        mp.gui.cursor.show(false, false);
        ui.showHud()
        if(!fromGui) ui.callCef('showCasinoBlackjack', JSON.stringify({ type: 'hide' })); 
        blackJack.active = false
        methods.callRemote('server:blackJack:newData', 'left_table')
        if(withAnim) {   
            mp.players.local.taskPlayAnim(sharedAnimDict, "sit_exit_left", 1.0, 1.0, 2500, 0, 0, false, false, false)
        }
    }

    async createNewCard(model_name, position, is_visible) {
        try {
            const options = is_visible ? {} : { alpha: 0 }
            const entity = mp.objects.new(mp.game.joaat(model_name), position, options);
            await methods.sleep(200)
            return entity
        }
        catch (e) {
            methods.error(`catch in BlackJackTable.createNewCard`, model_name, position, is_visible, e.toString())
        }
    }
    
    async newCardInShuffler(card_id=-1) {
        try {
            let cardShufflerPos = mp.game.object.getObjectOffsetFromCoords(this.position.x, this.position.y, this.position.z, this.heading, shufflerOffset.x, shufflerOffset.y, shufflerOffset.z);
            this.current_card = card_id == -1 ? cards.GetRandomCard() : cards.getCardByID(card_id)
            this.current_card.entity = (await this.createNewCard(this.current_card.model, cardShufflerPos, false))
            this.current_card.entity.setRotation(0.0, 164.52, 11.5+this.heading, 2, true)
        }
        catch (e) {
            methods.error(`catch in BlackJackTable.newCardInShuffler`, card_id)
        }
    }

    async seatTableAnimationTo(player, sitIndex) {
        return new Promise(async(res, _) => {
            if(sitIndex == undefined || !player || !player.handle ) {
                methods.debug(`err blackJack.seatTableAnimationTo`)
                return res(false)
            }
            const seatPos = this.seats[sitIndex].pos
            const seatRot = this.seats[sitIndex].heading
            res(await Misc.taskSeat(player, seatPos.x, seatPos.y, seatPos.z, seatRot, false))
        })
    }

    async seat(sitIndex) { // +
        try {
            if(this.seat_started) return false
            this.seat_started = true
            this.current_seat = sitIndex
            if(await this.seatTableAnimationTo(mp.players.local, sitIndex)) {
                // user.showCustomNotify(`Вы сели за стол`)
                lastCamMode = mp.game.invoke('0x8D4D46230B2C353A')
                blackJack.active = true
                mp.game.invoke('0x5A4F9EDF1673F704', 4)
                methods.blockKeys(true);
                methods.disableDefaultControls(true);
                mp.gui.cursor.show(true, true);
                if(this.moving_player_chair == this.current_seat && this.state == BLACKJACK_STATES.GAME_STARTED) this.state = BLACKJACK_STATES.GAME_PLAYER_MOVE
                this.updateCefData()
                ui.callCef('showCasinoBlackjack', JSON.stringify({ type: 'show' }));
                ui.hideHud()
                this.seat_started = false
                return true
            }
            else this.seat_started = false
            return false
        }
        catch (e) {
            methods.debug('Exception: blackJack.seat');
            methods.debug(e);
        }

    }


    async playScene(player, anim, lib=playerAnimDict) { //+
        return new Promise((res, _) => {
            if(this.current_seat == -1) return res(false)
            if(!player.handle) return res(false)
            let sitIndex = this.findChairByPlayerID(player.remoteId)
            if(sitIndex == -1) return res(false)
            if(!this.playersOnChairs[sitIndex]) return res(false)
            let sceneTimeOut = setTimeout(() => {
                sceneTimeOut = null
                return res(false)
            }, 10000);

            // const sceneId = mp.game.ped.createSynchronizedScene(this.seats[sitIndex].pos.x, this.seats[sitIndex].pos.y, this.seats[sitIndex].pos.z, 0, 0, this.seats[sitIndex].heading, 2);
           // player.taskSynchronizedScene(sceneId, lib, anim, 4.0, -2.0, 13, 16, 1148846080, 0)
            if(player == mp.players.local) {
                player.taskPlayAnim("anim_casino_b@amb@casino@games@shared@player@", "idle_cardgames", 1000.0, -2.0, -1, 2, 1148846080, false, false, false)
                player.taskPlayAnim(lib, anim, 3.0, 1.0, -1, 2, 0, false, false, false)
            }
            const animTime = mp.game.entity.getEntityAnimDuration(lib, anim)

            setTimeout(() => {
                // if(player.handle && this.playersOnChairs[sitIndex])
                if(sceneTimeOut) clearTimeout(sceneTimeOut)
                return res(true)
            }, animTime*1000);
                

        })
    }

    async declineCard(player) {
        if(!player.handle) return false
        let sitIndex = this.findChairByPlayerID(player.remoteId)
        if(sitIndex == -1) return false
        if(!this.playersOnChairs[sitIndex]) return false
        await this.playScene(player, ["decline_card_001","decline_card_alt1","decline_card_alt2"][Math.floor(Math.random() * 3)])
        await this.dealerStopFocusPlayer(sitIndex+1)
        return true
    }

    async requestCard(player, card_id=-1, withoutScene=false) {
        try {
            if(!player.handle || card_id == -1) return
            let sitIndex = this.findChairByPlayerID(player.remoteId)
            if(sitIndex == -1) return
            methods.debug(`PLAYER MORE DEBUG 3: sitIndex is ${sitIndex}`)
            if(!withoutScene && this.playersOnChairs[sitIndex]) await this.playScene(player, ["request_card","request_card_alt1","request_card_alt2"][Math.floor(Math.random() * 3)])
            await this.newCardInShuffler(card_id)
            await this.dealerGivePlayerCard(sitIndex)
            if(cards.getSumm(this.playerCards[sitIndex]) > 21) {
                if(player == mp.players.local && blackJack.currentTable == this) {
                    user.showCustomNotify(`Вы проиграли`)
                    this.currentBet.amount = 0
                }
                this.bustAnim(player)
            }

            else if(player == mp.players.local && this.moving_player_chair == this.current_seat) {
                this.move_selected = false
            }
            this.updateCefData()
        }
        catch (e) { }
    }

    async bustAnim(player) {
        if(!player.handle) return false
        let sitIndex = this.findChairByPlayerID(player.remoteId)
        if(sitIndex == -1) return false
        if(!this.playersOnChairs[sitIndex]) return false

        if(!user.getSex()) await this.playScene(player, ['reaction_terrible_var_01', 'reaction_terrible_var_02', 'reaction_terrible_var_03', 'reaction_terrible_var_04'][Math.floor(Math.random() * 4)], sharedAnimDict)
        else await this.playScene(player, ['female_reaction_terrible_var_01','female_reaction_terrible_var_02','female_reaction_terrible_var_03','female_reaction_terrible_var_04','female_reaction_terrible_var_05'][Math.floor(Math.random() * 5)], sharedAnimDict)
    }
    async lostAnim(player) {
        if(!player.handle) return false
        let sitIndex = this.findChairByPlayerID(player.remoteId)
        if(sitIndex == -1) return false
        if(!this.playersOnChairs[sitIndex]) return false

        if(!user.getSex()) await this.playScene(player, ['reaction_bad_var_01', 'reaction_bad_var_02', 'reaction_bad_var_03', 'reaction_bad_var_04'][Math.floor(Math.random() * 4)], sharedAnimDict)
        else await this.playScene(player, ['female_dealer_reaction_bad_var01', 'female_dealer_reaction_bad_var02', 'female_dealer_reaction_bad_var03'][Math.floor(Math.random() * 3)], sharedAnimDict)
    }
    async pushedAnim(player) {
        if(!player.handle) return false
        let sitIndex = this.findChairByPlayerID(player.remoteId)
        if(sitIndex == -1) return false
        if(!this.playersOnChairs[sitIndex]) return false

        if(!user.getSex()) await this.playScene(player, ['reaction_impartial_var_01', 'reaction_impartial_var_02', 'reaction_impartial_var_03', 'reaction_impartial_var_04'][Math.floor(Math.random() * 4)], sharedAnimDict)
        else await this.playScene(player, ['female_dealer_reaction_impartial_var01', 'female_dealer_reaction_impartial_var02', 'female_dealer_reaction_impartial_var03'][Math.floor(Math.random() * 3)], sharedAnimDict)
    }
    async winAnim(player) {
        if(!player.handle) return false
        let sitIndex = this.findChairByPlayerID(player.remoteId)
        if(sitIndex == -1) return false
        if(!this.playersOnChairs[sitIndex]) return false

        if(!user.getSex()) await this.playScene(player, ['reaction_great_var_01', 'reaction_great_var_02', 'reaction_great_var_03', 'reaction_great_var_04'][Math.floor(Math.random() * 4)], sharedAnimDict)
        else await this.playScene(player, ['female_reaction_great_var_01','female_reaction_great_var_02','female_reaction_great_var_03','female_reaction_great_var_04','female_reaction_great_var_05'][Math.floor(Math.random() * 5)], sharedAnimDict)
    }
    async goodAnim(player) {
        if(!player.handle) return false
        let sitIndex = this.findChairByPlayerID(player.remoteId)
        if(sitIndex == -1) return false
        if(!this.playersOnChairs[sitIndex]) return false

        if(!user.getSex()) await this.playScene(player, ['reaction_good_var_01', 'reaction_good_var_02', 'reaction_good_var_03'][Math.floor(Math.random() * 3)], sharedAnimDict)
        else await this.playScene(player, ['female_dealer_reaction_good_var01', 'female_dealer_reaction_good_var02', 'female_dealer_reaction_good_var03'][Math.floor(Math.random() * 3)], sharedAnimDict)
    }


    async playDealerAnim({ animName, animDict}, withFacial=false) { // +
        try {
            return new Promise((res, _) => {
                let animTimeOut = setTimeout(() => {
                    animTimeOut = null
                    return res(false)
                }, 10000);
                this.dealerPed.taskPlayAnim(animDict, (this.dealerGenre?'female_':'')+animName, (animName=='idle')?(1000.0):(3.0), (animName=='idle')?(-2.0):(1.0), -1, 2, (animName=='idle')?1148846080:0, false, false, false);
                const animTime = mp.game.entity.getEntityAnimDuration(animDict, animName)
                if(withFacial) this.dealerPed.playFacialAnim(animName+'_facial', animDict)
                setTimeout(() => {
                    if(animTimeOut) clearTimeout(animTimeOut)
                    return res(true)
                }, animTime*1000)
            })
        }
        catch(e) {
            methods.debug('Exception: blackJack.playDealerAnim');
            methods.debug(e);
        }

    }


    async dealerFlipCard() {  // +-
        try {
            if(!this.current_card || !this.current_card.entity) return
            this.playDealerAnim(DEALER_ANIMS.check_and_turn_card)
            await this.getAnimEventFire(ANIM_EVENTS.ATTACH_CARD)
            this.current_card = this.dealerCards[0]
            this.current_card.entity.attachTo(this.dealerPed.handle, this.dealerPed.getBoneIndex(28422), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, true, 2, true);
            await this.getAnimEventFire(ANIM_EVENTS.DETACH_CARD)

            this.current_card.entity.detach(false,true)

            this.dealerCardFlipped = true
            this.placeCardToDealer(0, true)
        }
        catch (e) {
            methods.error(`catch in blackJack.dealerFlipCard`, e.toString())
        }
    }

    async dealerFocusPlayer(chair_id) { // +-
        await this.playDealerAnim({
            animName: 'dealer_focus_player_0'+chair_id+'_idle_intro',
            animDict: dealerAnimDict
        }, true)
        this.playDealerAnim({
            animName: 'dealer_focus_player_0'+chair_id+'_idle',
            animDict: dealerAnimDict
        }, true)
    }

    async dealerStopFocusPlayer(chair_id) { // +-
        await this.playDealerAnim({
            animName: 'dealer_focus_player_0'+chair_id+'_idle_outro',
            animDict: dealerAnimDict
        })
    }

    async dealerCheckCard() {
        if(!this.current_card || !this.current_card.entity) return

        this.playDealerAnim(DEALER_ANIMS.check_card, true)
        await this.getAnimEventFire(ANIM_EVENTS.ATTACH_CARD)
        this.current_card = this.dealerCards[0]
        this.current_card.entity.attachTo(this.dealerPed.handle, this.dealerPed.getBoneIndex(28422), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, true, 2, true);
        await this.getAnimEventFire(ANIM_EVENTS.DETACH_CARD)

        this.current_card.entity.detach(false,true)

        this.placeCardToDealer(0)

    }

    async dealerChipsCleanup(chair_id=-1) {
        try {
            if(chair_id > 3) return
            if(chair_id >= 0 && !this.playerCards[chair_id].length) return
            if(chair_id == -1 && !this.dealerCards.length) return
            let att_card = null
            if(chair_id == -1) {
                this.playDealerAnim(DEALER_ANIMS.retrieve_own_cards_and_remove, true)
                if(!this.dealerCards.length) return
                att_card = this.dealerCards[0].entity
                if(!att_card || !att_card.handle) return methods.error(`in blackJack.dealerChipsCleanup`, 'att_card dealer is empty')
                await this.getAnimEventFire(ANIM_EVENTS.ATTACH_CARD)
                att_card.attachTo(this.dealerPed.handle, this.dealerPed.getBoneIndex(28422), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, true, 2, true);
                for(let i = this.dealerCards.length-1; i>0; i--) {
                    if(this.dealerCards[i].entity) {
                        this.dealerCards[i].entity.setVisible(false, false)
                        this.dealerCards[i].entity.destroy()
                    }
                }
            }
            else {
                this.playDealerAnim({
                    animName: 'retrieve_cards_player_0'+(chair_id+1),
                    animDict: dealerAnimDict
                }, true)

                if(!this.playerCards[chair_id].length) return

                att_card = this.playerCards[chair_id][0].entity
                if(!att_card || !att_card.handle) return methods.error(`in blackJack.dealerChipsCleanup`, 'att_card player is empty')
                await this.getAnimEventFire(ANIM_EVENTS.ATTACH_CARD)
                att_card.attachTo(this.dealerPed.handle, this.dealerPed.getBoneIndex(28422), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, true, 2, true);
                for(let i = this.playerCards[chair_id].length-1; i>0; i--) {
                    if(this.playerCards[chair_id][i].entity) {
                        this.playerCards[chair_id][i].entity.setVisible(false, false)
                        this.playerCards[chair_id][i].entity.destroy()
                    }
                }
            }

            await this.getAnimEventFire(ANIM_EVENTS.DETACH_CARD)

            if(att_card) {
                att_card.detach(false, true)
                att_card.setVisible(false, false)
                att_card.destroy()
            }

            if(chair_id == -1) this.dealerCards = []
            else this.playerCards[chair_id] = []
        }
        catch (e) {
            methods.error(`catch in blackJack.dealerChipsCleanup`, e.toString())
        }
    }

    async getAnimEventFire(event_id) {
        return await new Promise((res, _) => {
            let checkFiredTimeout = setTimeout(() => {
                clearTimeout(checkFiredTimeout)
                checkFiredTimeout = null
                res(false)
            }, 2000);

            let checkFiredInterval = setInterval(() => {
                if(this.dealerPed.hasAnimEventFired(event_id)) {
                    if(checkFiredTimeout) clearTimeout(checkFiredTimeout)
                    clearInterval(checkFiredInterval)
                    res(true)
                }
            }, 10);
        }) 
    }

    placeCardToDealer(slot, flip=false) {
        try {
            if(slot != 0 || !this.dealerCards.length) this.dealerCards.push(this.current_card)
            if(this.dealerCards.length >= 11 || !this.current_card || !this.current_card.entity) return;

            let cardPos = mp.game.object.getObjectOffsetFromCoords(this.position.x, this.position.y, this.position.z, this.heading, cards.bjDealerCardOffset[slot].pos.x, cards.bjDealerCardOffset[slot].pos.y, cards.bjDealerCardOffset[slot].pos.z);
            this.placeCardToCoords(this.current_card.entity, cardPos, new mp.Vector3(0.0, (slot != 0 || flip)?(0.0):(180.0), cards.bjDealerCardOffset[slot].heading+this.heading))
            this.updateCefData()
        }
        catch (e) {
            methods.error(`catch in blackJack.placeCardToDealer`, e.toString())
        }
    }

    placeCardToPlayer(chair_id) {        
        if(chair_id > 3 || !this.current_card || !this.current_card.entity) return;
        if(this.playerCards[chair_id].length >= cards.bjPlayerCardOffset[chair_id].length) {
            this.playerCards[chair_id].push(this.current_card)
            return
        }
        const slot = this.playerCards[chair_id].length
        let cardPos = mp.game.object.getObjectOffsetFromCoords(this.position.x, this.position.y, this.position.z, this.heading, cards.bjPlayerCardOffset[chair_id][slot].pos.x, cards.bjPlayerCardOffset[chair_id][slot].pos.y, cards.bjPlayerCardOffset[chair_id][slot].pos.z);

        this.placeCardToCoords(this.current_card.entity, cardPos, new mp.Vector3(0.0, 0.0, cards.bjPlayerCardOffset[chair_id][slot].heading+this.heading))

        this.playerCards[chair_id].push(this.current_card)
    }

    placeCardToCoords(card_entity, position, rotation) {
        if(card_entity && card_entity.handle) {
            card_entity.setCoordsNoOffset(position.x, position.y, position.z, false, false, true)
            card_entity.setRotation(rotation.x, rotation.y, rotation.z, 2, true);
        }
    }

    async animAttachAndDetachCardToDealer(entity) {
        try {
            if(entity && entity.handle && this.dealerPed && this.dealerPed.handle) {
                await this.getAnimEventFire(ANIM_EVENTS.ATTACH_CARD)

                this.current_card.entity.attachTo(this.dealerPed.handle, this.dealerPed.getBoneIndex(28422), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, false, false, false, true, 2, true);
                await this.getAnimEventFire(ANIM_EVENTS.DETACH_CARD)

                this.current_card.entity.detach(false,true)
            }
        }
        catch (e) {
            methods.error(`catch in blackJack.animAttachAndDetach`, e)
        }
    }
    
    async dealerGivePlayerCard(chair_id) {
        try {
            if(!this.current_card || !this.current_card.entity) return

            this.playDealerAnim({
                animName: 'deal_card_player_0'+(chair_id+1),
                animDict: dealerAnimDict
            }, true)


            this.current_card.entity.resetAlpha()
            await this.animAttachAndDetachCardToDealer(this.current_card.entity)

            this.placeCardToPlayer(chair_id)
            this.updateCefData()
        }
        catch (e) {
            methods.error('catch in blackJack.dealerGivePlayerCard', e.toString())
        }
    }

    async dealerGiveSelfCard() {
        try {
            if(!this.current_card || !this.current_card.entity) return
            const cardAnimation = ((this.dealerCards.length >= 1 && this.dealerCards.length <= 6) ? "deal_card_self_second_card" : (this.dealerCards.length == 0) ? "deal_card_self" : "deal_card_self_card_10")
            this.playDealerAnim(DEALER_ANIMS[`${cardAnimation}` || 'idle'], true)
            this.current_card.entity.setAlpha(255)
            await this.animAttachAndDetachCardToDealer(this.current_card.entity)
            this.current_card.entity.resetAlpha()
            this.placeCardToDealer(this.dealerCards.length)
        }
        catch (e) {
            methods.error('catch in blackJack.dealerGiveSelfCard', e.toString())
        }
    }

    dealerBadReactionAnim() {
        // TaskPlayAnim(dealerPed, "anim_casino_b@amb@casino@games@blackjack@dealer", "reaction_bad", 3.0, 1.0, -1, 2, 0, 0, 0, 0 )
    }
    dealerImpartialReactionAnim() {
        // TaskPlayAnim(dealerPed, "anim_casino_b@amb@casino@games@blackjack@dealer", "reaction_impartial", 3.0, 1.0, -1, 2, 0, 0, 0, 0 )
    }
    dealerGoodReactionAnim() {
        // TaskPlayAnim(dealerPed, "anim_casino_b@amb@casino@games@blackjack@dealer", "reaction_good", 3.0, 1.0, -1, 2, 0, 0, 0, 0 )
    }

    getShortChair(is_free_or_own=true, max_distance = 9999) {
        let short = 9999
        let seat = -1
        let is_own = false
 
        for(let i=0; i<this.seats.length; i++) {
            if(is_free_or_own && this.players[i] != -1 && this.players[i] != mp.players.local.remoteId) continue
            if(this.players[i] != -1 && this.players[i] == mp.players.local.remoteId) is_own = true
            const distance = methods.distanceToPos(this.seats[i].pos, mp.players.local.position)
            if(distance < short && distance < max_distance || is_own) {
                short =  methods.distanceToPos(this.seats[i].pos, mp.players.local.position)
                seat = i
                if(is_own) break;
            }
        }

        if(seat != -1) return seat
        return 0
    }


    clearBet() {
        try {
            methods.debug('blackJackTable.clearBet called');
            if(this.move_selected) return
            if(new Date().getTime() - lastBlackjackServerCall < BLACKJACK_SERVER_TIME_STOP) return
            if(!blackJack.active || blackJack.currentTable != this || !this.currentBet.chip || !this.currentBet.chip.handle || !this.currentBet.amount || this.state == BLACKJACK_STATES.GAME_STARTED) return
            if(this.state != BLACKJACK_STATES.WAIT_FIRST_BET && this.state != BLACKJACK_STATES.WAIT_TIME_START && this.state != BLACKJACK_STATES.GAME_PLAYER_MOVE) return
            if(this.state == BLACKJACK_STATES.GAME_PLAYER_MOVE && this.playerCards[this.current_seat].length != 2) return;
            // this.currentBet.chip.destroy()
            user.setCache('money_casino', user.getCasinoMoney()+this.currentBet.amount);
            // user.gameCasinoMoney(this.currentBet.amount, 'Очистка ставки в блекджеке', '');
            this.move_selected = true
            methods.callRemote('server:blackJack:newData', 'need_cancel')
            this.currentBet.amount = 0
            this.updateCefData()
            lastBlackjackServerCall = new Date().getTime()
        }
        catch(e) {
            methods.debug('Exception: blackJackTable.clearBet');
            methods.debug(e);
        }
    }

    x2Bet() {
        try {
            if(new Date().getTime() - lastBlackjackServerCall < BLACKJACK_SERVER_TIME_STOP) return
            if(this.move_selected) return
            if(!blackJack.active || blackJack.currentTable != this || !this.currentBet.chip || !this.currentBet.amount || this.state == BLACKJACK_STATES.GAME_STARTED) return
            if(this.state == BLACKJACK_STATES.GAME_PLAYER_MOVE && this.playerCards[this.current_seat].length != 2) return;
            if(this.state == BLACKJACK_STATES.WAIT_FIRST_BET || this.state == BLACKJACK_STATES.WAIT_TIME_START || this.state == BLACKJACK_STATES.GAME_PLAYER_MOVE) {
                if(!this.currentBet.chip || !this.currentBet.amount) return
                if(this.currentBet.amount * 2 > user.getCasinoMoney()) {
                    user.showCustomNotify(`Недостаточно фишек для удвоения ставки`)
                    this.updateCefData()
                    return
                }
                if(this.state == BLACKJACK_STATES.GAME_PLAYER_MOVE) {
                    this.state = BLACKJACK_STATES.GAME_STARTED
                }
                this.move_selected = true
                user.setCache('money_casino', user.getCasinoMoney()-this.currentBet.amount);
                methods.callRemote('server:blackJack:newData', 'need_x2')
                this.currentBet.amount *= 2
                this.currentBet.chip.model = Misc.getChipModel(this.currentBet.amount)
                this.updateCefData()
                lastBlackjackServerCall = new Date().getTime()
            }

        }
        catch(e) {
            methods.debug('Exception: blackJackTable.x2bet');
            methods.debug(e);
        }
    }

    setBet(bet) {
        try {
            if(!blackJack.active || blackJack.currentTable != this || !bet || bet <= 0) return;
            
            if(bet > user.getCasinoMoney()) {
                this.betAmount = user.getCasinoMoney()
                this.updateCefData()
                return
            }
            this.betAmount = bet
            this.updateCefData()
        }
        catch(e) {
            methods.debug('Exception: BlackJack.setBet');
            methods.debug(e);
        }
    }

    async startPlaying() {
        this.resetGameData(false)

        this.state = BLACKJACK_STATES.GAME_STARTED
        this.updateCefData()
        this.gameInterval = setInterval(() => {
            this.gameIntervalFunc()
        }, 10)
        await this.firstGiveCardToAll()
    }


    async placeBet(player, seat, amount, is_x2, without_any_anims) {
        try {
            if(!without_any_anims) {
                this.playScene(player, "place_bet_small")
                const animTime = mp.game.entity.getEntityAnimDuration(playerAnimDict, "place_bet_small")
                await methods.sleep(animTime * 300)
            }

            if(amount < 0) {
                if (this.playerChips[seat] || this.playerChips[seat].chip || this.playerChips[seat].chip.handle) {
                    this.playerChips[seat].chip.destroy()
                }
                if(!without_any_anims && player == mp.players.local && (this.state == BLACKJACK_STATES.GAME_PLAYER_MOVE || this.state == BLACKJACK_STATES.GAME_STARTED)) user.showCustomNotify(`Вы продали ставку за половину стоимости`)
            }
            else {
                if (!this.playerChips[seat] || !this.playerChips[seat].chip || !this.playerChips[seat].chip.handle) {
                    this.playerChips[seat] = { }
                    const betChipPosition = mp.game.object.getObjectOffsetFromCoords(this.position.x, this.position.y, this.position.z, this.heading, betOffsets[seat].x, betOffsets[seat].y, betOffsets[seat].z)
                    this.playerChips[seat].chip = mp.objects.new(Misc.getChipModel(amount), betChipPosition, {dimension: -1});
                } else this.playerChips[seat].chip.model = Misc.getChipModel(this.playerBets[seat])
            }

            if(player == mp.players.local) {
                if(is_x2 && !without_any_anims) {
                    this.state = BLACKJACK_STATES.GAME_STARTED
                }
                this.currentBet.chip = this.playerChips[seat].chip
                if(!without_any_anims) mp.game.audio.playSoundFrontend(-1, amount > 0 ? 'DLC_VW_BET_DOWN' : 'DLC_VW_BET_UP', 'dlc_vw_table_games_frontend_sounds', true)
            }
        }
        catch (e) {
            methods.debug('Exception: BlackJack.placeBet');
            methods.debug(e);
        }
    }

    findChairByPlayerID = (player_id) => {
        const findChair = this.players.findIndex((p) => {
            return p == player_id
        })
        methods.debug(`WE ARE FIND CHAIR`, player_id, findChair, this.players)
        return findChair
    }

    async pushBet(bet) {
        try {
            if(new Date().getTime() - lastBlackjackServerCall < BLACKJACK_SERVER_TIME_STOP) return
            if(blackJack.currentTable != this || (this.state != BLACKJACK_STATES.WAIT_FIRST_BET && this.state != BLACKJACK_STATES.WAIT_TIME_START && this.state != BLACKJACK_STATES.GAME_END)) return user.showCustomNotify('Сейчас вы не можете сделать ставку')
            if(bet > user.getCasinoMoney()) {
                user.showCustomNotify(`Недостаточно фишек для ставки`)
                this.updateCefData()
                return
            }
            user.setCache('money_casino', user.getCasinoMoney()-bet);
            this.currentBet.amount += bet

            this.updateCefData()
            methods.callRemote('server:blackJack:newData', 'need_bet', JSON.stringify({bet}))
            lastBlackjackServerCall = new Date().getTime()
        }
        catch(e) {
            methods.debug('Exception: BlackJack.pushBet');
            methods.debug(e);
        }
    }

    moreButton() {
        try {
            methods.debug('BlackJack.moreButton start');
            if(this.move_selected) return
            if(new Date().getTime() - lastBlackjackServerCall < BLACKJACK_SERVER_TIME_STOP) return
            if(this.state != BLACKJACK_STATES.GAME_PLAYER_MOVE) return user.showCustomNotify('Сейчас вы не можете сделать ход')
            this.move_selected = true
            methods.callRemote('server:blackJack:newData', 'need_more')
            lastBlackjackServerCall = new Date().getTime()
        }
        catch(e) {
            methods.debug(`Exception: BlackJack.moreButton ${e}`);
            methods.debug(e);
        }
    }

    stopButton() {
        try {
            methods.debug('BlackJack.stopButton start');
            if(this.move_selected) return
            if(new Date().getTime() - lastBlackjackServerCall < BLACKJACK_SERVER_TIME_STOP) return
            if(this.state != BLACKJACK_STATES.GAME_PLAYER_MOVE) return user.showCustomNotify('Сейчас вы не можете сделать ход')
            this.move_selected = true
            methods.callRemote('server:blackJack:newData', 'need_stop')
            lastBlackjackServerCall = new Date().getTime()
        }
        catch(e) {
            methods.debug(`Exception: BlackJack.stopButton ${e}`);
            methods.debug(e);
        }
    }


    async dealerStartOwnPlay() {
        try {
            await this.dealerFlipCard()

            while(cards.getSumm(this.dealerCards) < 17) {
                await this.newCardInShuffler(this.dealerServerCards[this.dealerCards.length])
                await this.dealerGiveSelfCard()
            }
            //   if(blackJack.currentTable == this && this.currentBet.amount) methods.callRemote('server:blackJack:newData', 'calc_win')
            await methods.sleep(5000)
            for(let i=0; i<4; i++) {
                if(this.playerCards[i].length) {
                    await this.dealerChipsCleanup(i)
                }
            }
            await this.dealerChipsCleanup(-1)
            this.setGameEnd()
        }
        catch (e) {
            methods.error(`catch in blackJack.dealerStartOwnPlay`, e.toString())
        }
    }

    setGameEnd() {
        this.state = BLACKJACK_STATES.GAME_END
        this.resetGameData(true)
    }

    resetGameData(clearBetsAndChips=false) {
        try {
            if(this.gameInterval) {
                clearInterval(this.gameInterval)
                this.gameInterval = null
            }
            this.dealerCardFlipped = false
            this.waitingTime = 0
            this.current_card = null
            if(clearBetsAndChips) {
                if(this.currentBet.chip && this.currentBet.chip.handle) this.currentBet.chip.destroy()
                this.currentBet = {
                    amount: 0,
                    chip: null
                }
                for(let i=0; i<this.playerChips.length; i++) {
                    if(this.playerChips[i] && this.playerChips[i].chip && this.playerChips[i].chip.handle) this.playerChips[i].chip.destroy()
                }
                this.playerChips = [null, null, null, null]

                if(this.playerCards && this.playerCards.length) {
                    for(let chair=0; chair<this.playerCards.length; chair++) {
                        if(this.playerCards[chair] && this.playerCards[chair].length) {
                            for(let slot=0; slot<this.playerCards[chair].length; slot++) {
                                if(this.playerCards[chair][slot] && this.playerCards[chair][slot].entity && this.playerCards[chair][slot].entity.handle) {
                                    this.playerCards[chair][slot].entity.setVisible(false, true)
                                    this.playerCards[chair][slot].entity.destroy()
                                }
                            }
                        }
                    }
                }

                if(this.dealerCards && this.dealerCards.length) {
                    for(let slot = 0; slot < this.dealerCards.length; slot++) {
                        if(this.dealerCards[slot] && this.dealerCards[slot].entity && this.dealerCards[slot].entity.handle) {
                            this.dealerCards[slot].entity.setVisible(false, true)
                            this.dealerCards[slot].entity.destroy()
                        }
                    }
                }
            }
            this.dealerCards = []
            this.playerCards = [[], [], [], []]
            this.moving_player_chair = -1
            if(blackJack.currentTable == this) this.updateCefData()
        }
        catch (e) {
            methods.debug('Exception: BlackJack.resetGameData');
            methods.debug(e);
        }
    }

    getChairAndPlayerByPlayerID(player_id) {
        try {
            if(player_id == undefined) return { chair_id: null, player: null }
            let chair_id = this.findChairByPlayerID(player_id)
            if(chair_id == -1) return { chair_id: null, player: null }

            const player = mp.players.atRemoteId(player_id)
            if (!player || !player.handle) return { chair_id: null, player: null }
            return { chair_id, player }
        }
        catch (e) {
            methods.debug('Exception: BlackJack.getChairAndPlayerByPlayerID');
            methods.debug(e);
        }
    }


    insertNewData({ id, players, bets, current_state, moving_player_chair, player_cards, dealer_cards, players_on_chairs }, not_player_move=false, isEnterData=false) {
        try {

            if(id != this.id || !players || players.length != this.players.length) return false

            if(isEnterData) {
                this.resetGameData(true)
                if(bets && bets.length && players && players.length) {
                    for(let seat=0; seat < 4; seat++) {
                        if(players[seat] != -1) {
                            let { chair_id, player } = this.getChairAndPlayerByPlayerID(players[seat])
                            if(!player) continue;
                            this.placeBet(player, seat, bets[seat], false, true)
                            if(blackJack.currentTable == this && player == mp.players.local) {
                                this.currentBet.amount = bets[seat]
                            }
                        }
                    }
                }
                if(player_cards) {
                    for(let chair_id = 0; chair_id < 4; chair_id++) {
                        if(!player_cards[chair_id] || !player_cards[chair_id].length) continue
                        let cards_length = player_cards[chair_id].length
                        for(let slot=0; slot < cards_length; slot++) {
                            const playerCardOffset = cards.bjPlayerCardOffset[chair_id][slot]
                            const card = cards.getCardByID(player_cards[chair_id][slot])
                            const cardPos = mp.game.object.getObjectOffsetFromCoords(this.position.x, this.position.y, this.position.z, this.heading, playerCardOffset.pos.x, playerCardOffset.pos.y, playerCardOffset.pos.z);
                            const pushedSlot = this.playerCards[chair_id].push(card)
                            this.createNewCard(card.model, cardPos, true).then(entity => {
                                this.playerCards[chair_id][pushedSlot-1].entity = entity
                                this.placeCardToCoords(entity, cardPos, new mp.Vector3(0.0, 0.0, playerCardOffset.heading+this.heading))
                            })
                        }
                    }
                }
                if(dealer_cards && dealer_cards.length) {
                    let cards_length = dealer_cards.length
                    for(let slot=0; slot < cards_length; slot++) {
                        const dealerCardOffset = cards.bjDealerCardOffset[slot]
                        const card = cards.getCardByID(dealer_cards[slot])
                        const cardPos = mp.game.object.getObjectOffsetFromCoords(this.position.x, this.position.y, this.position.z, this.heading, dealerCardOffset.pos.x, dealerCardOffset.pos.y, dealerCardOffset.pos.z);
                        const pushedSlot = this.dealerCards.push(card)
                        this.createNewCard(card.model, cardPos, true).then(entity => {
                            this.dealerCards[pushedSlot-1].entity = entity
                            this.placeCardToCoords(entity, cardPos, new mp.Vector3(0.0, (slot == 0 && cards_length <= 2 ) ? 180.0 : 0.0, dealerCardOffset.heading+this.heading))
                        })
                    }
                }
            }

            if(this.moving_player_chair != this.current_seat) this.move_selected = false
            this.players = players
            this.moving_player_chair = moving_player_chair
            this.state = (moving_player_chair == this.current_seat && current_state == BLACKJACK_STATES.GAME_STARTED && moving_player_chair != -1 && !this.move_selected && !not_player_move) ? BLACKJACK_STATES.GAME_PLAYER_MOVE : current_state
            this.playerBets = bets
            this.playerServerCards = player_cards
            this.dealerServerCards = dealer_cards
            this.playersOnChairs = players_on_chairs
            if(blackJack.currentTable == this) {
                this.currentBet.amount = this.playerBets[this.current_seat] || 0
                this.updateCefData()
            }
            return true
        }
        catch (e) {
            methods.error('catch in BlackJack.insertNewData', e)
        }
    }
}





const createBind = () => {
    mp.keys.bind(0x45, true, async () => {
        try {
            if(new Date().getTime() - lastBlackjackServerCall < BLACKJACK_SERVER_TIME_STOP) return
            if(blackJack.active) {
                blackJack.currentTable.leftTable(true)
                return
            }

            let newTable = null
            for(let i = 0; i< allTables.length; i++) {
                const table = allTables[i]
                if (methods.distanceToPos(table.position, mp.players.local.position) < 2.5) {
                    newTable = table
                    break
                }
            }
            if(!newTable) return false

            if(blackJack.currentTable && blackJack.currentTable != newTable) {
                if(blackJack.currentTable.currentBet.amount) return user.showCustomNotify(`Вы не можете сесть за другой стол при активной ставке`)
            }
            methods.callRemote('server:blackJack:newData', 'get_data_to_seat', JSON.stringify({ table_id: newTable.id }))
            lastBlackjackServerCall = new Date().getTime()
        }
        catch(e) {
            methods.debug('Exception: blackJack.bind_e');
            methods.debug(e);
        }
    });
}



blackJack.createTable = (id, modelHash, color, position, heading, seats) => {
    try {    
        // methods.debug('')
        const tableObject = mp.objects.new(mp.game.joaat(modelHash), position, {
            dimension: -1,
            rotation: new mp.Vector3(0, 0, heading)
        });
    
        mp.game.invoke('0x971DA0055324D033', tableObject.handle, color);

        const table = new BlackJackTable(id, tableObject, position, heading, modelHash, seats)

        allTables.push(table)
    }
    catch (e) {
        methods.debug('Exception: blackJack.createTable');
        methods.debug(e);
    }
}



blackJack.loadAll = () => {
    try {
        methods.debug('Execute: blackJack.loadAll');
        tablesData.map(table => {
            blackJack.createTable(table.id, table.modelHash, 1, table.pos, table.heading, table.seats)
        })
        createBind()

        mp.game.streaming.requestAnimDict(sharedAnimDict);
        mp.game.streaming.requestAnimDict(playerAnimDict);
        mp.game.streaming.requestAnimDict(dealerSharedDict);
        mp.game.streaming.requestAnimDict(dealerAnimDict);
    } catch (e) {
        methods.debug('Exception: blackJack.loadAll');
        methods.debug(e);
    }
};


export default blackJack;


new_events.add('client:blackJack:newTableData', async (type, table_data, error_message=null, add_data) => {
    try {
        if(error_message) user.showCustomNotify(error_message);
        methods.debug(`client:blackJack:newTableData(${type}, ${table_data?JSON.stringify(table_data):null}, ${error_message}, ${add_data?JSON.stringify(add_data):null}`);
        if(!table_data) return
        const table = allTables[table_data.id-1]


        if(!table || !table.insertNewData(table_data, type && type.length && type != 'player_move' && type != 'new_sit', type == 'enter_data')) return

        if(type == 'game_end') {
            table.setGameEnd()
        }

        if(type == 'to_sit') {
            const chair = table.getShortChair()
            if(chair != -1) methods.callRemote('server:blackJack:newData', 'need_sit', JSON.stringify({ table_id: table.id, chair }))
            return
        }
        if(type == 'new_sit') {
            let { player_id, chair_id } = add_data

            if(player_id == undefined || chair_id == undefined) return
            if (player_id != mp.players.local.remoteId) {
                const player = mp.players.atRemoteId(player_id)
                if (!player || !player.handle) return
                table.seatTableAnimationTo(player, chair_id)
                return
            }
            blackJack.currentTable = table
            table.seat(chair_id)
            return
        }
        if(type == 'new_bet') {
            let { player_id, amount, time_to_start, is_x2, card_id } = add_data
            let { chair_id, player } = table.getChairAndPlayerByPlayerID(player_id)
            if(chair_id < 0 || !player) return;
            await table.placeBet(player, chair_id, amount, is_x2)
            if(is_x2) table.requestCard(player, card_id, true)
            if(time_to_start) {
                table.state = BLACKJACK_STATES.WAIT_TIME_START
                table.waitingTime = time_to_start
                if(blackJack.currentTable == table) table.updateCefData()
            }
            return
        }
        if(type == 'start_game') {
            table.startPlaying()
        }
        if(type == 'player_move') {
            await table.dealerFocusPlayer(table.moving_player_chair+1)
            if(table == blackJack.currentTable && table.moving_player_chair == table.current_seat) {
                table.state = BLACKJACK_STATES.GAME_PLAYER_MOVE
                let { time_to_start } = add_data
                table.waitingTime = time_to_start || 15
                table.updateCefData()
            }
        }
        if(type == 'dealer_move_start') {
            table.dealerStartOwnPlay()
        }
        if(type == `player_more`) {
            let { player_id, card_id } = add_data
            methods.debug(`PLAYER MORE DEBUG 1: playerid is ${player_id}, cardId is ${card_id}`)
            let { chair_id, player } = table.getChairAndPlayerByPlayerID(player_id)
            methods.debug(`PLAYER MORE DEBUG 2: chairid is ${chair_id}, player is ${player.remoteId}`)
            if(chair_id < 0 || !player) return;

            table.requestCard(player, card_id)
        }
        if(type == `player_stop`) {
            let { player_id } = add_data
            let { chair_id, player } = table.getChairAndPlayerByPlayerID(player_id)
            if(chair_id < 0 || !player) return;
            if(player == mp.players.local && table.moving_player_chair == table.current_seat) table.state = BLACKJACK_STATES.GAME_PLAYER_MOVE

            await table.declineCard(player)
        }
        if(type == 'win_calc') {
            let { player_id, win_type, win_amount } = add_data
            let { chair_id, player } = table.getChairAndPlayerByPlayerID(player_id)
            if(chair_id < 0 || !player) return;
            if(win_type == -1 || (!win_amount && win_type != 4)) return
            if(win_type == 4) table.lostAnim(player)
            else table.winAnim(player)
            if(player == mp.players.local) {
                let text = 'Вы проиграли'
                if(win_type == 0) text = `Ничья, возвращено $ ${win_amount}`
                else if(win_type == 1 || win_type == 3) text = `Вы выиграли $ ${win_amount}`
                else if(win_type == 2) text = `Блекджек! Выигрыш $ ${win_amount}`
                user.showCustomNotify(text)
            }
        }
    }
    catch (e) {
        methods.debug('Exception: client:blackJack:newTableData');
        methods.debug(e);
    }
})


new_events.add('blackjack:table:clear_bet', () => {
    if(blackJack.currentTable && blackJack.active) {
        blackJack.currentTable.clearBet()
    }
})

new_events.add('blackjack:table:x2_bet', () => {
    if(blackJack.currentTable && blackJack.active) {
        blackJack.currentTable.x2Bet()
    }
})

new_events.add('blackjack:table:set_bet', (bet) => {
    if(blackJack.currentTable && blackJack.active) {
        blackJack.currentTable.setBet(bet)
    }
})

new_events.add('blackjack:table:push_bet', (bet) => {
    if(blackJack.currentTable && blackJack.active) {
        blackJack.currentTable.pushBet(bet)
    }
})

new_events.add('blackjack:table:close', (fromCef=true) => {
    if(blackJack.currentTable && blackJack.active) {
        blackJack.currentTable.leftTable(true, fromCef)
    }
})


new_events.add('blackjack:table:clickMoreButton', () => {
    if(blackJack.currentTable && blackJack.active) {
        blackJack.currentTable.moreButton()
    }
})


new_events.add('blackjack:table:clickEnoughButton', () => {
    if(blackJack.currentTable && blackJack.active) {
        blackJack.currentTable.stopButton()
    }
})


/*


function enterCasino()
    print("Entering casino")

    local interior = GetInteriorAtCoords(GetEntityCoords(GetPlayerPed(-1)))
    while not IsInteriorReady(interior) do
        Citizen.Wait(0)
    end

    TriggerServerEvent('gl_casino:playerEnterCasino')

    RequestScriptAudioBank("dlc_vinewood\\casino_general")
    RequestScriptAudioBank("dlc_vinewood\\casino_interior_stems")
    RequestScriptAudioBank("dlc_vinewood\\casino_slot_machines_01")
    RequestScriptAudioBank("dlc_vinewood\\casino_slot_machines_02")
    RequestScriptAudioBank("dlc_vinewood\\casino_slot_machines_03")

    startWallVideo()
    startSlotMachines()
    startLuckyWheel()
    startBlackjack()
    -- startRoulette()
end

function leaveCasino()
    print("Leaving casino")

    TriggerServerEvent('gl_casino:playerLeaveCasino')

    stopWallVideo()
    stopSlotMachines()
    stopLuckyWheel()
    stopBlackjack()
    -- stopRoulette()
end


function startWallVideo()
    if running then
        return
    end

    running = true

    RequestStreamedTextureDict('Prop_Screen_Vinewood')
    while not HasStreamedTextureDictLoaded('Prop_Screen_Vinewood') do
        Citizen.Wait(0)
    end

    RegisterNamedRendertarget('casinoscreen_01')
    LinkNamedRendertarget(`vw_vwint01_video_overlay`)
    videoWallRenderTarget = GetNamedRendertargetRenderId('casinoscreen_01')

    Citizen.CreateThread(wallVideoThread)
end

function wallVideoThread()
    local lastUpdatedTvChannel = GetGameTimer()

    setVideoWallTvChannel()

    while running do
        Citizen.Wait(0)

        local currentTime = GetGameTimer()
        if showBigWin then
            setVideoWallTvChannelWin()

            lastUpdatedTvChannel = GetGameTimer() - 33666
            showBigWin           = false
        else
            if (currentTime - lastUpdatedTvChannel) >= 42666 then
                setVideoWallTvChannel()

                lastUpdatedTvChannel = currentTime
            end
        end
        -- if (currentTime - lastUpdatedTvChannel) >= 42666 then
        --     setVideoWallTvChannel()

        --     lastUpdatedTvChannel = currentTime
        -- end

        SetTextRenderId(videoWallRenderTarget)
        SetScriptGfxDrawOrder(4)
        SetScriptGfxDrawBehindPausemenu(true)
        DrawInteractiveSprite('Prop_Screen_Vinewood', 'BG_Wall_Colour_4x4', 0.25, 0.5, 0.5, 1.0, 0.0, 255, 255, 255, 255)
        DrawTvChannel(0.5, 0.5, 1.0, 1.0, 0.0, 255, 255, 255, 255)
        SetTextRenderId(GetDefaultScriptRendertargetRenderId())
    end

    ReleaseNamedRendertarget('casinoscreen_01')
end


 */