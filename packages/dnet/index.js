"use strict";

require('./modules/cli');
require('./modules/data');
require('./modules/events');
require('./modules/chat');
require('./voice/voice');
require('./managers/vSync');
require('./managers/wpSync');
require('./managers/attach');
require('./managers/attachWeapons');
require('./managers/dispatcher');
require('./casino/wheel');
require('./casino/events');

//const SegfaultHandler = require('segfault-handler');
const process = require('process');

let mysql = require('./modules/mysql');
let methods = require('./modules/methods');
let vehicleInfo = require('./modules/vehicleInfo');
let ctos = require('./modules/ctos');

let cloth = require('./business/cloth');
let tattoo = require('./business/tattoo');
let lsc = require('./business/lsc');
let gun = require('./business/gun');
let vShop = require('./business/vShop');
let carWash = require('./business/carWash');
let rent = require('./business/rent');
let bar = require('./business/bar');
let barberShop = require('./business/barberShop');
let bank = require('./business/bank');
let fuel = require('./business/fuel');
let shop = require('./business/shop');
let tradeMarket = require('./business/tradeMarket');

let houses = require('./property/houses');
let condos = require('./property/condos');
let business = require('./property/business');
let vehicles = require('./property/vehicles');
let stocks = require('./property/stocks');
let fraction = require('./property/fraction');
let family = require('./property/family');
let yachts = require('./property/yachts');

let weather = require('./managers/weather');
let pickups = require('./managers/pickups');
let gangWar = require('./managers/gangWar');
let canabisWar = require('./managers/canabisWar');
let gangZone = require('./managers/gangZone');
let copsRacer = require('./managers/copsRacer');
let mafiaWar = require('./managers/mafiaWar');
let timer = require('./managers/timer');
let ems = require('./managers/ems');
let tax = require('./managers/tax');
let discord = require('./managers/discord');
let racer = require('./managers/racer');
let trucker = require('./managers/trucker');
let graffiti = require('./managers/graffiti');
let fishing = require('./managers/fishing');

let coffer = require('./coffer');
let inventory = require('./inventory');
let weapons = require('./weapons');
let enums = require('./enums');

function init() {
    try {
        methods.debug('INIT GAMEMODE');

        mysql.executeQuery('UPDATE users SET is_online=\'0\', st_order_atm_d=\'0\', st_order_drug_d=\'0\', st_order_lamar_d=\'0\' WHERE 1');

        for (let i = 0; i < weapons.hashesMap.length; i++)
            weapons.hashesMap[i][1] *= 2;

        methods.init();

        vehicleInfo.loadAll();
        ctos.loadAll();
        graffiti.loadAll();
        fishing.loadAll();

        houses.loadAll();
        yachts.loadAll();
        condos.loadAll();
        condos.loadBigAll();
        business.loadAll();
        stocks.loadAll();
        fraction.loadAll();
        family.loadAll();
        gangWar.loadAll();
        canabisWar.loadAll();
        //mafiaWar.loadAll();
        timer.loadAll();
        tax.loadAll();

        trucker.loadAll();

        weather.loadAll();
        racer.loadAll();
        gangZone.loadAll();
        copsRacer.loadAll();

        carWash.loadAll();
        rent.loadAll();
        lsc.loadAll();
        bar.loadAll();
        barberShop.loadAll();
        cloth.loadAll();
        tattoo.loadAll();
        gun.loadAll();
        bank.loadAll();
        fuel.loadAll();
        shop.loadAll();
        tradeMarket.loadAll();

        pickups.createAll();

        coffer.load();

        methods.loadAllBlips();

        inventory.loadAll();

        vShop.loadAllShop();

        let c = a => 10 > a ? 2e4 + +a : a.charCodeAt(0);

        enums.clothM = enums.clothM.sort((a, b) => c(a[9][0] + a[9][1]) - c(b[9][0] + b[9][1]));
        enums.clothF = enums.clothF.sort((a, b) => c(a[9][0] + a[9][1]) - c(b[9][0] + b[9][1]));

        enums.propM = enums.propM.sort((a, b) => c(a[5][0] + a[5][1]) - c(b[5][0] + b[5][1]));
        enums.propF = enums.propF.sort((a, b) => c(a[5][0] + a[5][1]) - c(b[5][0] + b[5][1]));

        enums.tattooList = enums.tattooList.sort((a, b) => c(a[0]) - c(b[0]));

        setInterval(methods.saveAllAnother, 5 * 1000 * 60); //TODO
        setInterval(methods.saveAllUser, 1000 * 60); //TODO

        vShop.loadAllShopVehicles();
        vehicles.loadAllTimers();
        vehicles.loadAllFractionVehicles();
        vehicles.checkVehiclesFuel();
    }
    catch (e) {
        methods.debug('ERROR INIT', e);
    }
}

setTimeout(init, 10000);

process
    .on('unhandledRejection', (reason, p) => {
        console.log(`[PROCESS] Unhandled Rejection at Promise ${reason.toString()} ${p ? p.toString() : p}`);
    })
    .on('uncaughtException', err => {
        console.log(`[PROCESS] Uncaught Exception thrown ${err ? err.toString() : err}`);
    })
    .on('exit', (code) => {
        console.log(`[PROCESS] ${code}`);
    })
    .on('SIGSEGV', () => {
        console.log('[PROCESS] Received: SIGSEGV')
    });
/*process.on('SIGHUP', () => console.log('[PROCESS] Received: SIGHUP'));
process.on('SIGINT', () => console.log('[PROCESS] Received: SIGINT'));
process.on('SIGQUIT', () => console.log('[PROCESS] Received: SIGQUIT'));
process.on('SIGUSR1', () => console.log('[PROCESS] Received: SIGUSR1'));
process.on('SIGUSR2', () => console.log('[PROCESS] Received: SIGUSR2'));
process.on('SIGTERM', () => console.log('[PROCESS] Received: SIGTERM'));
process.on('SIGSEGV', () => console.log('[PROCESS] Received: SIGSEGV'));

process.on('beforeExit', (code) => {
    console.log('[PROCESS] beforeExit event with code: ', code);
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('[PROCESS] uncaughtExceptionMonitor event with err: ', err.toString());
});
*/
//SegfaultHandler.registerHandler("crash.log");