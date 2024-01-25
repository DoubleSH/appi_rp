const user = require("../user");
const {debug} = require("../modules/methods");


const BlackJack = exports;


const BLACKJACK_WAITING_TIME_SERVER = 15
const MOVE_PLAYER_TIME = 20

const BLACKJACK_STATES = {
    WAIT_FIRST_BET: 0,
    WAIT_TIME_START: 1,
    GAME_STARTED: 2,
    GAME_END: 3
}

const card_values = [999, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
const getCardValue = (card_id) => {
    return card_values[card_id%13]
}
BlackJack.getCardsSumm = (cards) => {
    try {
        if(!cards || !cards.length) return 0
        let cards_summ = 0
        for(let i = 0; i < cards.length; i++) {
            let val = getCardValue(cards[i])
            if(val == 999) {
                if((cards_summ+11) > 21) val = 1
                else val = 11
            }
            cards_summ += val
        }
        return cards_summ
    }
    catch (e) {
        debug(`server catch BlackJack.getCardsSumm(${cards}) | ${e}`)
    }
}

class BlackJackTable {
    constructor(id, pos) {
        this.id = id
        this.pos = pos
        this.cards = [[],[],[],[]]
        this.players = [-1, -1, -1, -1]
        this.dealer_cards = []
        this.bets = [0, 0, 0, 0]
        this.x2players = [false, false, false, false]
        this.moving_player_chair = -1
        this.current_state = BLACKJACK_STATES.WAIT_FIRST_BET
        this.move_player_timeout = null
        this.players_on_chairs = [false, false, false, false]
    }

    resetData(state = BLACKJACK_STATES.GAME_END) {
        this.current_state = state
        this.bets = [0, 0, 0, 0]
        this.cards = [[],[],[],[]]
        this.dealer_cards = []
        this.x2players = [false, false, false, false]
        this.moving_player_chair = -1
        for(let i=0; i<4; i++) {
            if(this.players[i] && !this.players_on_chairs[i]) this.players[i] = -1
        }
    }

    get streamingData() {
        return {
            id: this.id,
            players: this.players,
            bets: this.bets,
            current_state: this.current_state,
            moving_player_chair: this.moving_player_chair,
            player_cards: this.cards,
            dealer_cards: this.dealer_cards,
            players_on_chairs: this.players_on_chairs
        }
    }

    get randomCardID() {
        return Math.floor(Math.random()*52)
    }

    get playersCount() {
        return (this.bets[0]?1:0) + (this.bets[1]?1:0) + (this.bets[2]?1:0) + (this.bets[3]?1:0)
    }

    getMovingChair(only_next = true) {
        try {
            let next_move = -1
            for(let i = only_next ? (this.moving_player_chair+1) : this.moving_player_chair; i<4; i++) {
                let moving_player = mp.players.at(this.players[i])
                if(!moving_player || moving_player.dist(this.pos) > 5 || !this.bets[i] || BlackJack.getCardsSumm(this.cards[i]) >= 21) continue
                next_move = i
                break
            }
            return next_move
        }
        catch (e) {
            debug(`server catch BlackJack.getMovingChair | ${e}`)
        }
    }


    sendDataClosestPlayers(name = '', message = null, data = {}) {
        try {
            mp.players.callInRange(this.pos, 500.0, 'client:blackJack:newTableData', [name, this.streamingData, message, data])
        }
        catch (e) {
            debug(`server catch BlackJack.sendDataClosestPlayers | ${e}`)
        }
    }

    resetState() {
        this.current_state = BLACKJACK_STATES.WAIT_FIRST_BET
        this.sendDataClosestPlayers()
    }

    startGame() {
        try {
            if(!this.playersCount) return this.resetState()
            this.current_state = BLACKJACK_STATES.GAME_STARTED
            this.sendDataClosestPlayers('pre_start_game')
            setTimeout(() => {
                if(!this.playersCount) return this.resetState()

                for(let i=0; i<4; i++) {
                    if(this.players[i] == -1) continue
                    this.cards[i].push(this.randomCardID)
                    this.cards[i].push(this.randomCardID)
                }
                this.dealer_cards.push(this.randomCardID)
                this.dealer_cards.push(this.randomCardID)

                this.sendDataClosestPlayers('start_game')

                setTimeout(() => {
                    this.moving_player_chair = 0
                    this.startPlayerMoveByChair(this.getMovingChair(false))
                }, 100+3200+(3200*this.playersCount)+4000)
            }, 3000)
        }
        catch (e) {
            debug(`server catch BlackJack.startGame | ${e}`)
        }
    }

    startPlayerMoveByChair(chair_id) {
        try {
            if(this.move_player_timeout) {
                clearTimeout(this.move_player_timeout)
                this.move_player_timeout = null
            }
            if(chair_id == -1) return this.startDealerMove()
            this.moving_player_chair = chair_id
            this.sendDataClosestPlayers('player_move', null, { time_to_start: MOVE_PLAYER_TIME })

            this.move_player_timeout = setTimeout(() => {
                this.move_player_timeout = null
                const next_moving = this.getMovingChair()
                if(next_moving == -1) return this.startDealerMove()
                this.startPlayerMoveByChair(next_moving)
            }, MOVE_PLAYER_TIME * 1000)
        }
        catch (e) { debug(`server catch BlackJack.startPlayerMoveByChair(${chair_id}) | ${e}`) }
    }

    startDealerMove() {
        try {
            this.moving_player_chair = -1
            let add_cards_count = 0
            while(BlackJack.getCardsSumm(this.dealer_cards) < 17) {
                this.dealer_cards.push(this.randomCardID)
                add_cards_count++
            }
            this.sendDataClosestPlayers('dealer_move_start')

            setTimeout(() => {
                this.winCalcs()

                this.resetData()
                this.sendDataClosestPlayers('game_end')
            }, (add_cards_count*1600)/*открывает карты*/+5000/*ждет после игры*/
                +1750/*флип своей карты*/+(1500*this.playersCount)/*удаляет карты игроков*/+1400/*удаляет свои карты*/+500)
        }
        catch (e) {
            debug(`server catch BlackJack.startDealerMove | ${e}`)
        }
    }

    checkPlayersCloseToTable() {
        for(let i=0; i<4; i++) {
            if (this.bets[i] && this.players[i] != -1) continue
            const player = mp.players.at(this.players[i])
            if (!player || !player.handle) {

            }
        }
    }

    winCalcs() {
        if(this.current_state != BLACKJACK_STATES.GAME_STARTED || this.moving_player_chair != -1) return debug(`error winCalcs | game isn't end`)

        const dealerSumm = BlackJack.getCardsSumm(this.dealer_cards)

        for(let chair=0; chair<4; chair++) {
            if(this.bets[chair] <= 0 || this.players[chair] < 0) continue

            const player = mp.players.at(this.players[chair])
            if(!player || !user.exists(player)) continue


            const cardsSumm = BlackJack.getCardsSumm(this.cards[chair])
            const twoCardsCheck = BlackJack.getCardsSumm([this.cards[chair][0], this.cards[chair][1]])

            const bet = this.bets[chair]
            if(!cardsSumm || !twoCardsCheck || !dealerSumm || !bet || bet <= 0) {
                debug('error in server:blackJack:playerWantCalculateWin not cards or bet')
                player.call('client:blackJack:newTableData', ['win_calc', null, 'Произошла ошибка при расчете выигрыша'])
                continue
            }

            this.cards[chair] = []
            this.bets[chair] = 0

            let winType = -1
            let winAmount = 0

            if(twoCardsCheck == 21 && dealerSumm != 21) {
                winType = 2
                winAmount = (bet * 3 / 2)+bet
                user.addCasinoMoney(player, winAmount, 'Выигрыш в блекджек (2)')
            }
            else if(dealerSumm > 21 && cardsSumm <= 21) {
                winType = 1
                winAmount = bet * 2
                user.addCasinoMoney(player, winAmount, 'Выигрыш в блекджек (1)')
            }
            else if(dealerSumm == cardsSumm) {
                winType = 0
                winAmount = bet
                user.addCasinoMoney(player, winAmount, 'Ничья в блекджек')
            }
            else if(dealerSumm < cardsSumm && cardsSumm <= 21) {
                winType = 3
                winAmount = bet*2
                user.addCasinoMoney(player, bet*2, 'Выигрыш в блекджек (3)')
            }
            else if(dealerSumm > cardsSumm && cardsSumm <= 21) {
                winType = 4
            }

            this.sendDataClosestPlayers('win_calc', null, { player_id: player.id, win_type: winType, win_amount: winAmount, dealerSumm, cardsSumm})
        }
    }

    startWaitingTimeout() {
        try {
            this.current_state = BLACKJACK_STATES.WAIT_TIME_START
            setTimeout(() => {
                this.startGame()
            }, BLACKJACK_WAITING_TIME_SERVER*1000)
        }
        catch (e) { debug(`server catch BlackJack.startWaitingTimeout | ${e}`) }
    }

    static getByID(table_id) {
        return BlackJack.allTables.find(t => { return t.id == table_id })
    }

    static findTableAndChairByPlayerID(player_id) {
        try {
            let chair = -1
            const table = BlackJack.allTables.find(t => {
                chair = t.players.findIndex(p => { return p == player_id })
                return chair != -1
            })
            return { table: table, chair: chair}
        }
        catch (e) {
            debug(`server catch BlackJack.findTableAndChairByPlayerID(${player_id}) | ${e}`)
        }
    }

    static newDataFromPlayer(player, type, data={}) {
        try {
            if(!type) return debug(`error newDataFromPlayer(${player.id},${type},${JSON.stringify(data && typeof data != "string" ? data : {})}) | no type`)
            if(type == 'need_data_on_enter') {
                for(let i = 0; i < BlackJack.allTables.length; i++) {
                    player.call('client:blackJack:newTableData', ['enter_data', BlackJack.allTables[i].streamingData])
                }
                return
            }

            if(type == 'get_data_to_seat') {
                const { table_id } = data
                const table = BlackJackTable.getByID(table_id)
                if(!table) return debug(`error newDataFromPlayer(${player.id},${type},${JSON.stringify(data||{})}) | table ${table_id} not found`)
                player.call('client:blackJack:newTableData', ['to_sit', table.streamingData])
                return
            }
            if(type == 'need_sit') {
                const { table_id, chair } = data
                const table = BlackJackTable.getByID(table_id)
                if(!table || (table.players[chair] != player.id && table.players[chair] != -1) || table.players_on_chairs[chair]) {
                    player.call('client:blackJack:newTableData', ['', table.streamingData])
                    return
                }
                table.players[chair] = player.id
                table.players_on_chairs[chair] = true
                table.sendDataClosestPlayers('new_sit', null, { player_id: player.id, chair_id: chair })
                return
            }

            const { table, chair } = BlackJackTable.findTableAndChairByPlayerID(player.id)

            if(type == 'left_table') {
                if(table && chair != -1) {
                    table.players_on_chairs[chair] = false
                    if(table.bets[chair] <= 0) table.players[chair] = -1
                    table.sendDataClosestPlayers()
                }
                return
            }

            if(!table || chair == -1) {
                debug(`error newDataFromPlayer(${player.id},${type},${JSON.stringify(data||{})}) | state not for bet or no table`)
                return player.call('client:blackJack:newTableData', ['', null, 'Невозможно выполнить действие'])
            }


            if(type == 'need_bet') {
                const { bet } = data
                if(table.current_state == BLACKJACK_STATES.GAME_STARTED) {
                    player.call('client:blackJack:newTableData', ['', table.streamingData, 'Ставку сделать не удалось, игра уже началась'])
                    debug(`error newDataFromPlayer(${player.id},${type},${JSON.stringify(data||{})}) | game started`)
                    return
                }
                if(bet > user.getCasinoMoney(player)) {
                    player.call('client:blackJack:newTableData', ['', table.streamingData, 'Недостаточно фишек для ставки, попробуйте в другой раз'])
                    debug(`error  | no money`)
                    return
                }
                user.removeCasinoMoney(player, bet, 'Ставка в блекджеке')
                table.bets[chair] += bet

                let startTimer = false
                if(table.current_state == BLACKJACK_STATES.WAIT_FIRST_BET || table.current_state == BLACKJACK_STATES.GAME_END) {
                    table.startWaitingTimeout()
                    startTimer = true
                }
                table.sendDataClosestPlayers('new_bet', null, { player_id: player.id, amount: bet, time_to_start: startTimer ? BLACKJACK_WAITING_TIME_SERVER : 0 })
                return
            }

            const bet = table.bets[chair] > 0 ? table.bets[chair] : 0
            if(!bet) return debug(`error newDataFromPlayer(${player.id},${type},${JSON.stringify(data||{})}) | bet =0 or <0`)
            if(table.current_state == BLACKJACK_STATES.GAME_END) return debug(`error newDataFromPlayer(${player.id},${type},${JSON.stringify(data||{})}) | game is end`)

            if(type == 'need_x2') {
                if(bet*2 > user.getCasinoMoney(player)) {
                    player.call('client:blackJack:newTableData', ['', table.streamingData, 'Недостаточно фишек для удвоения ставки'])
                    return debug(`error newDataFromPlayer(${player.id},${type},${JSON.stringify(data||{})}) | no money`)
                }
                if(table.current_state == BLACKJACK_STATES.GAME_STARTED && (table.moving_player_chair != chair || !table.move_player_timeout)) {
                    player.call('client:blackJack:newTableData', ['', null, 'Невозможно выполнить действие'])
                    return debug(`error in newDataFromPlayer(${player.id},${type},${JSON.stringify(data||{})}) | current chair`)
                }


                user.removeCasinoMoney(player, bet, table.current_state == BLACKJACK_STATES.GAME_STARTED ? `Дабл ставка` :'Удвоение ставки в блекджеке')
                table.bets[chair] += bet

                let card_id = table.randomCardID
                if(table.current_state == BLACKJACK_STATES.GAME_STARTED) {
                    table.x2players[chair] = true
                    if(table.move_player_timeout) {
                        clearTimeout(table.move_player_timeout)
                        table.move_player_timeout = null
                    }
                    setTimeout(() => {
                        const next_moving = table.getMovingChair()
                        if(next_moving == -1) return table.startDealerMove()
                        table.startPlayerMoveByChair(next_moving)
                    }, 6000)

                    table.cards[chair].push(card_id)
                }

                table.sendDataClosestPlayers('new_bet', null, { player_id: player.id, amount: bet, time_to_start: 0, is_x2: table.current_state == BLACKJACK_STATES.GAME_STARTED, card_id: BLACKJACK_STATES.GAME_STARTED ? card_id : -1 })
                return
            }

            if(type == 'need_cancel') {
                if(table.current_state == BLACKJACK_STATES.GAME_STARTED && (table.moving_player_chair != chair || !table.move_player_timeout)) {
                    player.call('client:blackJack:newTableData', ['', null, 'Невозможно выполнить действие'])
                    return debug(`error in newDataFromPlayer(${player.id},${type},${JSON.stringify(data||{})}) | current chair`)
                }

                user.addCasinoMoney(player, table.current_state == BLACKJACK_STATES.GAME_STARTED?Math.round(bet/2):bet, 'Отмена ставки в блекджеке'+BLACKJACK_STATES.GAME_STARTED?` (game)`:``)
                table.bets[chair] = 0

                if(table.current_state == BLACKJACK_STATES.GAME_STARTED) {
                    if(table.move_player_timeout) {
                        clearTimeout(table.move_player_timeout)
                        table.move_player_timeout = null
                    }
                    setTimeout(() => {
                        const next_moving = table.getMovingChair()
                        if(next_moving == -1) return table.startDealerMove()
                        table.startPlayerMoveByChair(next_moving)
                    }, 3000)
                }
                table.sendDataClosestPlayers('new_bet', null, { player_id: player.id, amount: -bet, time_to_start: 0 })
                return
            }

            if(type == 'need_more' || type == 'need_stop') {
                if(table.current_state == BLACKJACK_STATES.GAME_STARTED && (table.moving_player_chair != chair || !table.move_player_timeout)) {
                    player.call('client:blackJack:newTableData', ['', null, 'Невозможно выполнить действие'])
                    return debug(`error in newDataFromPlayer(${player.id},${type},${JSON.stringify(data||{})}) | current chair`)
                }

                if(table.move_player_timeout) {
                    clearTimeout(table.move_player_timeout)
                    table.move_player_timeout = null
                }
            }

            if(type == 'need_more') {
                let card_id = table.randomCardID
                table.cards[chair].push(card_id)
                table.sendDataClosestPlayers('player_more', null, { player_id: player.id, card_id: card_id })

                setTimeout(() => {
                    const next_moving = table.getMovingChair(false)
                    if(next_moving == -1) return table.startDealerMove()
                    table.startPlayerMoveByChair(next_moving)
                }, 6000)
                return
            }

            if(type == 'need_stop') {
                table.sendDataClosestPlayers('player_stop', null,{ player_id: player.id })

                setTimeout(() => {
                    const next_moving = table.getMovingChair()
                    if(next_moving == -1) return table.startDealerMove()
                    table.startPlayerMoveByChair(next_moving)
                }, 3000)
                return
            }
        }
        catch (e) {
            debug(`server catch BlackJack.newDataFromPlayer`, `(${player.id},${type},${JSON.stringify(data||{})})`, e.toString());
        }
    }
}

BlackJack.allTables = [
    new BlackJackTable(1, new mp.Vector3(1148.837, 269.747, -52.8409)),
    new BlackJackTable(2, new mp.Vector3(1151.84, 266.747, -52.8409)),
    new BlackJackTable(3, new mp.Vector3(1129.406, 262.3578, -52.041)),
    new BlackJackTable(4, new mp.Vector3(1144.429, 247.3352, -52.041))
];

BlackJack.newDataFromPlayer = function (player, type, data = {}) {
    BlackJackTable.newDataFromPlayer(player, type, JSON.parse(data))
};