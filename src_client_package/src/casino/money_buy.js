import user from '../user';
import ui from "../modules/ui";
import shopMenu from "../shopMenu"
import methods from '../modules/methods';
import new_events from "../check_events";

var sellCasinoMoneyCost = 0
var buyCasinoMoneyCost = 0

new_events.add('client:casino:buyCasinoMoney', (count) => { // from CEF
    if(!count) return showErrorWith('покупке фишек (1)')
    if(isNaN(count) || count <= 0 || count*buyCasinoMoneyCost > user.getCashMoney()) return showErrorWith('покупке фишек (2)')
    methods.callRemote('server:user:casinoMoneyBuy', count);
    user.showCustomNotify(`Вы купили ${count} фишек за $${count*buyCasinoMoneyCost}`);
});


new_events.add('client:casino:sellCasinoMoney', (count) => { // from CEF
    if(!count) return showErrorWith('продаже фишек (1)')
    if(isNaN(count) || count <= 0 || count > user.getCasinoMoney()) return showErrorWith('продаже фишек (2)')
    methods.callRemote('server:user:casinoMoneySell', count);
    user.showCustomNotify(`Вы продали ${count} фишек за $${count*sellCasinoMoneyCost}`);
});

const showErrorWith = (text="работе казино") => {
    user.showCustomNotify(`Произошла ошибка при ${text}, попробуйте еще раз`);
    return casinoMoneyMenu("update")
}

const casinoMoneyMenu = (type="show", zSellCasinoMoneyCost=95, zBuyCasinoMoneyCost=100) => {
    sellCasinoMoneyCost = zSellCasinoMoneyCost
    buyCasinoMoneyCost = zBuyCasinoMoneyCost
    const data = {
        type: type,
        money: user.getCashMoney(),
        casino_money: user.getCasinoMoney(),
        sellCasinoMoneyCost: sellCasinoMoneyCost,
        buyCasinoMoneyCost: buyCasinoMoneyCost
    }
    if(type == "show") shopMenu.setControl()
    ui.callCef('showCasinoMoney', JSON.stringify(data)); 
}

new_events.add('client:casino:showCasinoMoneyMenu', (sellCasinoMoneyCost, buyCasinoMoneyCost) => {
    casinoMoneyMenu("show", sellCasinoMoneyCost, buyCasinoMoneyCost)
})


new_events.add('client:casino:updateCasinoMoneyMenu', () => {
    casinoMoneyMenu("update", sellCasinoMoneyCost, buyCasinoMoneyCost)
})

new_events.add('client:casino:showCasinoMoneyErrorWith', (text) => {
    showErrorWith(text)
})