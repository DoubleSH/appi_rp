
import new_events from "./check_events";
import './modules/data';
import './modules/events';

import './casino/money_buy'
import blackJack from './casino/blackJack';

import './manager/lod';
import './manager/vSync';
import './manager/pSync';
import './manager/wpSync';
import './manager/shoot';
import './manager/heliCam';
import './manager/attachWeapons';
import './manager/cameraRotator';
import './manager/racer';
import './manager/copsRacer';
import './manager/jobPoint';
//import './manager/seats';
import "./manager/prolog";
import "./manager/scaleform";

//import "./manager/trailerSync";

import './betternotifs';
//import './voice';

import business from "./property/business";
import "./property/vehicles";

import ui from "./modules/ui";
import methods from "./modules/methods";

import checkpoint from "./manager/checkpoint";
import timer from "./manager/timer";
import vBreakLight from "./manager/vBreakLight";
import object from "./manager/object";
import npc from "./manager/npc";
import skill from "./manager/skill";
import attach from "./manager/attach";
import attachItems from "./manager/attachItems";
import weather from "./manager/weather";
import hosp from "./manager/hosp";
import jail from "./manager/jail";
import policeRadar from "./manager/policeRadar";

import wheel from "./casino/wheel";

import user from "./user";
import enums from "./enums";
import phone from "./phone";
import chat from "./chat";
import voiceRage from "./voiceRage";

import "./antiCheat";
import "./mainMenu";
import "./shopMenu";

import trucker from "./jobs/trucker";
import taxi from "./jobs/taxi";
import prolog from "./manager/prolog";
import process from "process";

try {

    mp.events.remove = null;
    mp.events.callLocal = null

    user.setVirtualWorld(mp.players.local.remoteId);

    methods.disableAllControls(true);
    methods.disableDefaultControls(true);
    methods.blockKeys(true);

    mp.players.local.setConfigFlag(35, false); // Отключаем автоматический шлем при посадке на мотоцикл

    mp.game.gxt.set("PM_PAUSE_HDR", "APPI ~b~RolePlay");

    new_events.add("serverShutdown", async () =>
    {
        methods.error(`server shutdown`)
        // mp.events.delayShutdown = true;
        // await yourAsyncFunction();
        // mp.events.delayShutdown = false;
    });


    if (mp.storage.data.token) {
        mp.gui.chat.push('BlackList');
        user.kick('BlackList');
    }
    else {
        mp.gui.chat.push('Добро пожаловать на Appi RolePlay 🌎');
        mp.gui.chat.push('Подождите пожалуйста, выполняется загрузка всех необходимых пакетов для комфортной игры. Это займет меньше минуты.');

        chat.show(false);
        chat.activate(false);
        /*enums.customIpl.forEach(item => {
            object.createIpl(item[0], new mp.Vector3(item[1], item[2], item[3]), item[4]);
        });*/

        mp.game.ped.setAiMeleeWeaponDamageModifier(1);
        mp.game.player.setMeleeWeaponDefenseModifier(1);
        mp.game.player.setWeaponDefenseModifier(1);
        mp.game.player.setVehicleDefenseModifier(.1);
        mp.game.player.setVehicleDamageModifier(.1);

        mp.gui.cursor.show(true, true);

        user.init();
        try {
            methods.requestIpls();
        }
        catch (e) {
            methods.saveFile('errorIpl', e);
        }
        setTimeout(checkpoint.checkPosition, 10000);

        enums.loadCloth();
        business.loadScaleform();

        object.load();
        npc.loadAll();
        skill.loadAll();

        wheel.loadAll();

        setTimeout(() => {
            //  roulette.loadAll();
            blackJack.loadAll();
        }, 10000);

        trucker.loadAll();
        taxi.loadAll();

        attach.init();

        timer.loadAll();
        vBreakLight.timer();
        policeRadar.load();

        weather.secSyncTimer();

        try {
            mp.game.stats.statSetProfileSetting(0, 0);
        }
        catch (e) {

        }

        timer.createInterval('phone.findNetworkTimer', phone.findNetworkTimer, 1000);
    }

    /*if(!mp.game.streaming.isIplActive("int_magazel1_milo_"))
    {
        user.showCustomNotify('Возможно некоторые интерьеры у вас не подгрузятся, поэтому перезайдите, фикс будет в следующей версии мультиплеера', 0, 1000);
        setTimeout(function () {
            mp.game.invoke("0xD7C10C4A637992C9"); // _LOAD_SP_DLC_MAPS
            mp.game.invoke("0x0888C3502DBBEEF5"); // _LOAD_MP_DLC_MAPS

            //mp.game.invoke("0xD7C10C4A637992C9"); mp.game.invoke("0x0888C3502DBBEEF5"); // _LOAD_MP_DLC_MAPS
        }, 5000);
    }*/

    /*new_events.add('guiReady', () => {
        ui.create();
    });*/
    // mp.events.callRemoteProc = null
    // mp.events.callRemoteUnreliable = null
}
catch (e) {
    methods.error('ERROR INIT CLIENT', e);
    methods.debug('ERROR INIT CLIENT', e);
    methods.debug(e);
    methods.debug('ERROR INIT CLIENT', e);
    methods.debug('ERROR INIT CLIENT', e);
}
