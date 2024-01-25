const user = require('../user');
let BlackJack = require('./blackJack')
const methods = require("../modules/methods");

const sellCasinoMoneyCost = 95 // настройки цены продажи фишек
const buyCasinoMoneyCost = 100 // настройки цены покупки фишек



mp.events.addRemoteExecuter('server:user:casinoMoneyBuy', (player, count) => {
    if(isNaN(count) || count <= 0 || count*buyCasinoMoneyCost > user.getCashMoney(player)) return player.call('client:casino:showCasinoMoneyErrorWith',['покупке фишек (сервер)'])
    user.addCasinoMoney(player, count, 'Покупка фишек');
    user.removeCashMoney(player, count*buyCasinoMoneyCost, 'Покупка фишек в казино')
});

mp.events.addRemoteExecuter('server:user:casinoMoneySell', (player, count) => {
    if(isNaN(count) || count <= 0 || count > user.getCasinoMoney(player)) return player.call('client:casino:showCasinoMoneyErrorWith',['продаже фишек (сервер)'])
    user.removeCasinoMoney(player, count, 'Продажа фишек');
    user.addCashMoney(player, count*sellCasinoMoneyCost, 'Продажа фишек в казино')
});


mp.events.addRemoteExecuter('server:user:casinoMoneyGame', (player, count, game, winResult) => {
    if(isNaN(count)) return player.call('client:casino:showCasinoMoneyErrorWith',['изменении фишек (сервер)'])
    if(!count) return
    if(count > 0) {
        user.addCasinoMoney(player, count, `${game} (${winResult})`)
    }
    if(count < 0) {
        user.removeCasinoMoney(player, -count, `${game} (${winResult})`)
    }
});

mp.events.addRemoteExecuter('server:blackJack:newData', (player, type, data) => {
    try {
        methods.debug(`server:blackJack:newData`, player.id, type, data);
        BlackJack.newDataFromPlayer(player, type, data);
    }
    catch (e) {
        methods.error(`server catch server:blackJack:newData`, player.id, type, data, e.toString())
    }
});


// let ped = mp.peds.new(
//     mp.game.joaat('MP_F_Freemode_01'), 
//     new mp.Vector3(100.0, -100.0, 25.0),
//     270.0,
//     mp.players.local.dimension
// );