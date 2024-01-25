//let methods = require("./arp/modules/methods.js");
import methods from '../modules/methods';
import Container from "../modules/data";

import enums from "../enums";
import user from "../user";

import racer from "../manager/racer";
import vSync from "../manager/vSync";
import prolog from "../manager/prolog";
import UIMenu from "../modules/menu";
import ui from "../modules/ui";
import bind from "../manager/bind";
import inventory from "../inventory";
import new_events from "../check_events";

let vehicles = {};

let offset = enums.offsets.vehicle;
let offsetContainer = enums.offsets.vehicleContainer;

let hidden = true;

vehicles.reduceGrip = false;

vehicles.set = function(id, key, val) {
    Container.Data.SetLocally(offset + id, key, val);
};

vehicles.reset = function(id, key) {
    Container.Data.ResetLocally(offset + id, key);
};

vehicles.get = function(id, key) {
    if (vehicles.has(id, key))
        return Container.Data.GetLocally(offset + id, key);
    return undefined;
};

vehicles.has = function(id, key) {
    return Container.Data.HasLocally(offset + id, key);
};

vehicles.setContainer = function(id, key, val) {
    //methods.debug(`vehicles.set ${id} ${key} ${val} | `);
    Container.Data.Set(offsetContainer + methods.parseInt(id), key, val);
};

vehicles.getContainer = async function(id, key) {
    //methods.debug('vehicles.get');
    return await Container.Data.Get(offsetContainer + methods.parseInt(id), key);
};

vehicles.hasContainer = async function(id, key) {
    //methods.debug('vehicles.get');
    return await Container.Data.Has(offsetContainer + methods.parseInt(id), key);
};

vehicles.resetContainer = function(id, key) {
    //methods.debug('vehicles.get');
    Container.Data.Reset(offsetContainer + methods.parseInt(id), key);
};

vehicles.getData = async function(id) {
    return await Container.Data.GetAll(offset + methods.parseInt(id));
};

vehicles.setSync = function(id, key, val) {
    Container.Data.Set(offset + id, key, val);
};

vehicles.resetSync = function(id, key) {
    Container.Data.Reset(offset + id, key);
};

vehicles.getSync = async function(id, key) {
    if (vehicles.has(id, key))
        return await Container.Data.Get(offset + id, key);
    return undefined;
};

vehicles.hasVeh = async function(id, key) {
    return await Container.Data.Has(offset + veh.remoteId, key);
};

vehicles.setVeh = function(veh, key, val) {
    Container.Data.Set(offset + veh.remoteId, key, val);
};

vehicles.resetVeh = function(id, key) {
    Container.Data.Reset(offset + veh.remoteId, key);
};

vehicles.getVeh = async function(id, key) {
    if (vehicles.has(id, key))
        return await Container.Data.Get(offset + veh.remoteId, key);
    return undefined;
};

vehicles.hasSync = async function(id, key) {
    return await Container.Data.Has(offset + id, key);
};

vehicles.setVariable = function(key, value) {
    methods.callRemote('server:vehicle:serVariable', key, value);
};

vehicles.attach = function(key, isRemove = false) {
    methods.callRemote('server:vehicle:attach', key, isRemove);
};

vehicles.setInteriorColor = function(color) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setVehicleInteriorColor', mp.players.local.vehicle.remoteId, color);
};

vehicles.setDashboardColor = function(color) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setVehicleDashboardColor', mp.players.local.vehicle.remoteId, color);
};

vehicles.setTyreSmokeColor = function(r, g, b) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setVehicleTyreSmokeColor', mp.players.local.vehicle.remoteId, r, g, b);
};

vehicles.setLivery = function(idx) {
    if (mp.players.local.vehicle)
        methods.callRemote('server:vehicle:setLivery', idx);
};

vehicles.setExtraState = function(state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setExtraState', mp.players.local.vehicle.remoteId, state);
};

vehicles.setWindowState = function(idx, state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setWindowDataIdx', mp.players.local.vehicle.remoteId, idx, state);
};

vehicles.setDoorState = function(idx, state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setDoorDataIdx', mp.players.local.vehicle.remoteId, idx, state);
};

vehicles.setTyreState = function(idx, state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setTyreDataIdx', mp.players.local.vehicle.remoteId, idx, state);
};

vehicles.setSuspensionRaiseState = function(state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setSuspensionRaiseState', mp.players.local.vehicle.remoteId, state);
};

vehicles.setSteeringLockState = function(state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setSuspensionRaiseState', mp.players.local.vehicle.remoteId, state);
};

vehicles.setCamberState = function(state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setSuspensionRaiseState', mp.players.local.vehicle.remoteId, state);
};

vehicles.setInteriorLightState = function(state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setInteriorLightState', mp.players.local.vehicle.remoteId, state);
};

vehicles.setTaxiLightState = function(state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setTaxiLightState', mp.players.local.vehicle.remoteId, state);
};

vehicles.setAnchorState = function(state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setAnchorState', mp.players.local.vehicle.remoteId, state);
};

vehicles.setFreezeState = function(state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setFreezeState', mp.players.local.vehicle.remoteId, state);
};

vehicles.setCollisionState = function(state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setCollisionState', mp.players.local.vehicle.remoteId, state);
};

vehicles.setSpotLightState = function(state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setSpotLightState', mp.players.local.vehicle.remoteId, state);
};

vehicles.setIndicatorLeftState = function(state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setIndicatorLeftState', mp.players.local.vehicle.remoteId, state);
};

vehicles.setIndicatorRightState = function(state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setIndicatorRightState', mp.players.local.vehicle.remoteId, state);
};

vehicles.setTrunkState = function(state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setTrunkState', mp.players.local.vehicle.remoteId, state);
};

vehicles.setHoodState = function(state) {
    if (mp.players.local.vehicle)
        methods.callRemote('s:vSync:setHoodState', mp.players.local.vehicle.remoteId, state);
};

vehicles.setTrunkStateById = function(id, state) {
    methods.callRemote('s:vSync:setTrunkState', id, state);
};

vehicles.setHoodStateById = function(id, state) {
    methods.callRemote('s:vSync:setHoodState', id, state);
};

vehicles.getFuel = (veh) => {
    if (!mp.vehicles.exists(veh))
        return 0;
    return veh.getVariable('fuel');
};

vehicles.addFuel = (veh, fuel = 1) => {
    if (!mp.vehicles.exists(veh))
        return;
    methods.callRemote('server:vehicles:addFuel', veh.remoteId, fuel);
};

vehicles.setNumberPlate = (veh, number) => {
    if (!mp.vehicles.exists(veh))
        return;
    methods.callRemote('server:vehicles:setNumberPlate', veh.remoteId, number);
};

vehicles.getNumberPlate = (veh) => {
    if (!mp.vehicles.exists(veh))
        return '';
    return veh.getVariable('numberPlate');
};

vehicles.checkerControl = function() {
    try {
        if (racer.isInRace())
            return false;
        let veh = mp.players.local.vehicle;
        if (veh) {
            let vInfo = methods.getVehicleInfo(veh.model);
            if (vInfo.class_name == "Helicopters" || vInfo.class_name == "Planes" || vInfo.class_name == "Boats" || vInfo.class_name == "Motorcycles" || vInfo.class_name == "Cycles") return false;
            return veh.getRotation(0).x > 90 || veh.getRotation(0).x < -90 || veh.getRotation(0).y > 90 || veh.getRotation(0).y < -90 || veh.isInAir();
        }
    }
    catch (e) {

    }
    return false;
};

vehicles.getFuelLabel = function(id) {
    switch (id) {
        case 1:
            return 'Бензин';
        case 2:
            return 'Дизель';
        case 3:
            return 'Электричество';
        case 4:
            return 'Авиатопливо';
    }
    return 'Нет топлива';
};

vehicles.getFuelPostfix = function(id) {
    switch (id) {
        case 1:
        case 2:
        case 4:
            return 'L';
        case 3:
            return '%';
    }
    return 'Нет топлива';
};

vehicles.getSpecialModName = function(id) {
    if (id >= 100)
        id = id - 100;
    switch (id) {
        case 0:
            return 'fDriveBiasFront';
        case 1:
            return 'fCamberRear';
        case 2:
            return 'fSuspensionRaise';
        case 3:
            return 'fSteeringLock';
    }
};

vehicles.getSpecialModDefault = function(id) {
    if (id >= 100)
        id = id - 100;
    switch (id) {
        case 0:
            return 0.0;
        case 1:
            return 0.0;
        case 2:
            return 0.0;
        case 3:
            return 1.0;
    }

    //  /eval mp.players.local.vehicle.setHandling('fTractionCurveMin', '4');
};

vehicles.isVehicleSirenValid = function (model) {
    let vInfo = methods.getVehicleInfo(model);
    switch (vInfo.display_name) {
        case 'Police':
        case 'Police2':
        case 'Police3':
        case 'Police4':
        case 'PoliceT':
        case 'Bcat':
        case 'Policeb':
        case 'pdumksx':
        case 'FBI':
        case 'FBI2':
        case 'Sheriff':
        case 'Sheriff2':
        case 'Riot':
        case 'Riot2':
        case 'Lguard':
        case 'Pranger':
        case 'Ambulance':
        case 'Ambulance22':
        case 'Ambulance4':
        case 'Emsnspeedo':
        case 'Emsroamer':
        case 'Firetruk':
        case 'PoliceOld1':
        case 'PoliceOld2':
        case 'Bcfdscout':
        case 'Lsfdscout':
        case 'Lsfdscout2':
        case 'Polscout':
        case 'Polscout2':
        case 'Sherscout':
        case 'Sherscout2':
        case 'Trucara':
        case 'Polcaracara':
        case 'Polumkcara':
        case 'Umkcara':
        case 'Polvacca':
        case 'Polbullet':
        case 'Polbullet2':
        case 'Hwaybullet':
        case 'Sherbullet':
        case 'Shergauntlet':
        case 'Intcept':
        case 'Intcept2':
        case 'Intcept3':
        case 'Intcept4':
        case 'Lspdcara':
        case 'Lspdcara2':
        case 'Hwaycoq4':
        case 'Lssheriffcoq4':
        case 'Lssheriffcoq42':
        case 'Policecoq4':
        case 'Policecoq42':
            return true;
    }
    return false;
};

vehicles.getSirenSound = function (model, state) {
    let vInfo = methods.getVehicleInfo(model);
    switch (vInfo.display_name) {
        case 'Police':
        case 'FBI2':
        case 'Sheriff':
        case 'Sheriff2':
        case 'Pranger':
        case 'Bcfdscout':
        case 'Lsfdscout':
        case 'Lsfdscout2':
        case 'Polscout':
        case 'Polscout2':
        case 'Sherscout':
        case 'Sherscout2':
        case 'Trucara':
        case 'Polcaracara':
        case 'Polumkcara':
        case 'Umkcara':
        case 'Polvacca':
        case 'Polbullet':
        case 'Polbullet2':
        case 'Hwaybullet':
        case 'Sherbullet':
        case 'Shergauntlet':
        case 'Hwaycoq4':
        case 'Hwaycoq42':
        case 'Lssheriffcoq4':
        case 'Lssheriffcoq42':
        case 'Policecoq4':
        case 'Policecoq42':
        {
            if (state == 2)
                return 'RESIDENT_VEHICLES_SIREN_WAIL_03';
            if (state == 3)
                return 'RESIDENT_VEHICLES_SIREN_QUICK_03';
            if (state == 4)
                return 'VEHICLES_HORNS_POLICE_WARNING';
            break;
        }
        case 'pdumksx':
        case 'Police2':
        case 'Police3':
        {
            if (state == 2)
                return 'VEHICLES_HORNS_SIREN_1';
            if (state == 3)
                return 'VEHICLES_HORNS_SIREN_2';
            if (state == 4)
                return 'VEHICLES_HORNS_POLICE_WARNING';
            break;
        }
        case 'FBI':
        case 'Police4':
        case 'Lguard':
        case 'PoliceT':
        case 'Bcat':
        case 'Lspdcara':
        case 'Lspdcara2':
        {
            if (state == 2)
                return 'RESIDENT_VEHICLES_SIREN_WAIL_02';
            if (state == 3)
                return 'RESIDENT_VEHICLES_SIREN_QUICK_02';
            if (state == 4)
                return 'VEHICLES_HORNS_POLICE_WARNING';
            break;
        }
        case 'Policeb':
        case 'Riot':
        case 'Riot2':
        case 'Ambulance':
        case 'Ambulance22':
        case 'Ambulance4':
        case 'Emsnspeedo':
        case 'Emsroamer':
        case 'PoliceOld1':
        case 'PoliceOld2':
        {
            if (state == 2)
                return 'RESIDENT_VEHICLES_SIREN_WAIL_01';
            if (state == 3)
                return 'RESIDENT_VEHICLES_SIREN_QUICK_01';
            if (state == 4)
                return 'VEHICLES_HORNS_POLICE_WARNING';
            break;
        }
        case 'Firetruk': {
            if (state == 2)
                return 'RESIDENT_VEHICLES_SIREN_FIRETRUCK_QUICK_01';
            if (state == 3)
                return 'RESIDENT_VEHICLES_SIREN_FIRETRUCK_QUICK_01';
            if (state == 4)
                return 'VEHICLES_HORNS_FIRETRUCK_WARNING';
            break;
        }
    }
    if (state == 2)
        return 'VEHICLES_HORNS_SIREN_1';
    if (state == 3)
        return 'VEHICLES_HORNS_SIREN_2';
    if (state == 4)
        return 'VEHICLES_HORNS_POLICE_WARNING';
    return '';
};

vehicles.getWarningSound = function (model) {
    let vInfo = methods.getVehicleInfo(model);
    switch (vInfo.display_name) {
        case 'Police':
        case 'pdumksx':
        case 'Police2':
        case 'Police3':
        case 'Police4':
        case 'PoliceT':
        case 'Bcat':
        case 'Policeb':
        case 'FBI':
        case 'FBI2':
        case 'Sheriff':
        case 'Sheriff2':
        case 'Riot':
        case 'Riot2':
        case 'Lguard':
        case 'Pranger':
        case 'Ambulance':
        case 'Ambulance22':
        case 'Ambulance4':
        case 'Emsnspeedo':
        case 'Emsroamer':
        case 'PoliceOld1':
        case 'PoliceOld2':
            return 'SIRENS_AIRHORN';
        case 'Firetruk':
            return 'VEHICLES_HORNS_FIRETRUCK_WARNING';
    }
    return 'SIRENS_AIRHORN';
};

vehicles.getSpeedBoost = (model) => {
    return methods.parseInt(methods.getVehicleInfo(model).sb);
};

vehicles.getSpeedMax = (model) => {
    let max = methods.getVehicleInfo(model).sm;
    if (max > 0)
        return max;
    return methods.parseInt(mp.game.vehicle.getVehicleModelMaxSpeed(model) * 3.6);
};

vehicles.setHandling = (vehicle) => {
    try {
        switch (vehicle.model) {
            case mp.game.joaat('speedo4'):
                vehicle.setHandling('fTractionLossMult', 1);
                break;
            case mp.game.joaat('cara'):
                vehicle.setHandling('fTractionCurveMin', 1.8);
                vehicle.setHandling('fTractionCurveMax', 1.9);
                vehicle.setHandling('fTractionCurveLateral', 50.0);
                break;
            case mp.game.joaat('bcfdscout'):
                vehicle.setHandling('fTractionCurveLateral','19.0');
                vehicle.setHandling('fTractionCurveMax','2.0');
                break;
            case mp.game.joaat('lsfdscout'):
                vehicle.setHandling('fTractionCurveLateral','19.0');
                vehicle.setHandling('fTractionCurveMax','2.0');
                break;
            case mp.game.joaat('lsfdscout2'):
                vehicle.setHandling('fTractionCurveLateral','19.0');
                vehicle.setHandling('fTractionCurveMax','2.0');
                break;
            case mp.game.joaat('polscout'):
            case mp.game.joaat('polscout2'):
                vehicle.setHandling('fTractionCurveLateral','19.0');
                vehicle.setHandling('fTractionCurveMax','2.0');
                break;
            case mp.game.joaat('sherscout'):
            case mp.game.joaat('sherscout2'):
                vehicle.setHandling('fSteeringLock', '0.7');
                vehicle.setHandling('fBrakeForce','1.8');
                vehicle.setHandling('fTractionCurveMax', '3.0');
                vehicle.setHandling('fTractionCurveMin', '2.7');
                break;
            case mp.game.joaat('intcept'):
            case mp.game.joaat('intcept1'):
            case mp.game.joaat('intcept2'):
            case mp.game.joaat('intcept3'):
                vehicle.setHandling('fBrakeForce','1.15');
                vehicle.setHandling('fTractionCurveMax', '3.0');
                vehicle.setHandling('fTractionCurveMin', '2.7');
                vehicle.setHandling('fDriveInertia', '1.0');
                break;
            case mp.game.joaat('scout'):
                vehicle.setHandling('fTractionCurveLateral','19.0');
                vehicle.setHandling('fTractionCurveMax','2.0');
                break;
            case mp.game.joaat('scout2'):
                vehicle.setHandling('fTractionCurveLateral','19.0');
                vehicle.setHandling('fTractionCurveMax','2.0');
                break;
            case mp.game.joaat('trucara'):
                vehicle.setHandling('fTractionCurveMax', '1.9');
                vehicle.setHandling('fTractionCurveLateral','50.0');
                vehicle.setHandling('fBrakeForce','1.3');
                break;
            case mp.game.joaat('umkcara'):
                vehicle.setHandling('fTractionCurveMax', '1.9');
                vehicle.setHandling('fTractionCurveLateral','50.0');
                vehicle.setHandling('fBrakeForce','1.3');
                break;
            case mp.game.joaat('shergauntlet'):
            case mp.game.joaat('polvacca'):
            case mp.game.joaat('polbullet'):
            case mp.game.joaat('polbullet2'):
            case mp.game.joaat('sherbullet'):
            case mp.game.joaat('sherbullet2'):
                vehicle.setHandling('fBrakeForce','1.4');
                break;
            case mp.game.joaat('sheriff'):
            case mp.game.joaat('sheriff2'):
            case mp.game.joaat('police'):
            case mp.game.joaat('police2'):
            case mp.game.joaat('pdumksx'):
            case mp.game.joaat('police3'):
            case mp.game.joaat('police4'):
                vehicle.setHandling('fBrakeForce','1.4');
                break;
        }
    }
    catch (e) {

    }
};

vehicles.spawnJobCar = (x, y, z, heading, name, job) => {
    user.setVirtualWorld(0);
    mp.game.ui.notifications.show('~r~Подсказка!\n~g~Чтобы начать работу, нажмите ~s~2 - Начать задание\n\nНажмите ~g~L~s~ чтобы открыть или закрыть ТС');
    methods.callRemote('server:vehicles:spawnJobCar', x, y, z, heading, name, job);
};

vehicles.spawnLamarCar = (x, y, z, heading, name) => {
    user.setVirtualWorld(0);
    mp.game.ui.notifications.show('Нажмите ~g~L~s~ чтобы открыть или закрыть ТС');
    methods.callRemote('server:vehicles:spawnLamarCar', x, y, z, heading, name);
};

vehicles.destroy = () => {
    methods.callRemote('server:vehicles:destroy');
};

vehicles.destroy2 = () => {
    methods.callRemote('server:vehicles:destroy2');
};

vehicles.engineVehicle = function(status = null) {
    if (mp.players.local.vehicle) {
        prolog.next();
        let vInfo = methods.getVehicleInfo(mp.players.local.vehicle.model);
        if (vInfo.class_name != 'Cycles')
            methods.callRemote('server:vehicle:engineStatus', status);
    }
};

vehicles.showStats = function() {
    let data = {
        type: 'show',
        show: true,
    };
    ui.callCef('carinfo', JSON.stringify(data));

    mp.gui.cursor.show(false, true);
    ui.DisableMouseControl = true;
    ui.hideHud();
    mp.game.graphics.transitionToBlurred(100);
    hidden = false;
};

vehicles.hideStats = function() {
    hidden = true;
    mp.gui.cursor.show(false, false);
    ui.DisableMouseControl = false;
    ui.showHud();
    mp.game.graphics.transitionFromBlurred(100);
};

vehicles.isHide = function() {
    return hidden;
};

vehicles.setRandomTunning = function() {
    if (mp.players.local.vehicle) {
        let veh = mp.players.local.vehicle;
        for (let i = 0; i < 100; i++) {
            try {
                if (i === 18 || i === 11 || i === 12 || i === 13) continue;
                if (veh.getNumMods(i) === 0) continue;
                if (veh.getNumMods(i) > 0 && enums.lscNames[i][1] > 0) {
                    methods.callRemote('server:lsc:showTun', i, methods.getRandomInt(0, veh.getNumMods(i)));
                }
            }
            catch (e) {
                methods.debug(e);
            }
        }
    }
};

vehicles.currentData = null;
let currentBodyHp = 1000;
let currentEngHp = 1000;
let currentFuelHp = 1000;

new_events.add("playerEnterVehicle", async function (vehicle, seat) {
    methods.debug('playerEnterVehicle31242312441231234')
    try {
        if (vehicle.getVariable('container') && vehicle.getVariable('user_id') > 0) {
            vehicles.currentData = await vehicles.getData(vehicle.getVariable('container'));
        }
    }
    catch (e) {
        methods.error('playerEnterVehicle', e.toString());
    }

    //  /eval mp.game.invoke('0xF271147EB7B40F12', mp.players.local.vehicle.handle);
});

new_events.add("playerLeaveVehicle", function () {
    methods.debug('playerLeaveVehicle3124231244')
    vehicles.currentData = null;
});

new_events.add("client:vehicle:checker2", async function () {
    try {
        let vehicle = mp.players.local.vehicle;
        if (vehicle) {

            let vClass = vehicle.getClass();

            if (vClass < 13 || vClass > 16) {
                let currentBodyHpNew = vehicle.getBodyHealth();
                let currentEngHpNew = vehicle.getEngineHealth();
                //let currentFuelHpNew = vehicle.getPetrolTankHealth(); //TODO топливная система не работает
                let currentFuelHpNew = vehicle.getBodyHealth(); //TODO топливная система не работает

                /*if (currentBodyHp - currentBodyHpNew > 100) {
                    user.removeHealth(10);

                    mp.game.cam.shakeGameplayCam("ROAD_VIBRATION_SHAKE", 1.5);
                    setTimeout(function () {
                        mp.game.cam.stopGameplayCamShaking(false);
                    }, 7000);
                }
                else if (currentBodyHp - currentBodyHpNew > 50) {
                    user.removeHealth(5);
                    mp.game.cam.shakeGameplayCam("ROAD_VIBRATION_SHAKE", 1.5);
                    setTimeout(function () {
                        mp.game.cam.stopGameplayCamShaking(false);
                    }, 3000);
                }
                else if (currentBodyHp - currentBodyHpNew > 20) {
                    user.removeHealth(2);
                    mp.game.cam.shakeGameplayCam("ROAD_VIBRATION_SHAKE", 1.5);
                    setTimeout(function () {
                        mp.game.cam.stopGameplayCamShaking(false);
                    }, 1000);
                }*/

                if (vehicles.currentData) {
                    let vContainer = vehicle.getVariable('container');

                    let s_eng = vehicles.currentData.get('s_eng');
                    let s_trans = vehicles.currentData.get('s_trans');
                    let s_fuel = vehicles.currentData.get('s_fuel');
                    let s_whel_1 = vehicles.currentData.get('s_whel_1');
                    let s_whel_2 = vehicles.currentData.get('s_whel_2');
                    let s_whel_3 = vehicles.currentData.get('s_whel_3');
                    let s_whel_4 = vehicles.currentData.get('s_whel_4');
                    let s_whel_5 = vehicles.currentData.get('s_whel_5');
                    let s_whel_6 = vehicles.currentData.get('s_whel_6');
                    let s_elec = vehicles.currentData.get('s_elec');
                    let s_break = vehicles.currentData.get('s_break');

                    /*if (vehicles.reduceGrip) {
                        if (s_whel_3 > 0) {
                            vehicles.setSync(vContainer, 's_whel_3', s_whel_3 - 1);
                            vehicles.currentData.set('s_whel_3', s_whel_3 - 1);
                            if (s_whel_3 <= 1)
                                vehicles.setTyreState( 4, 2);
                        }
                        if (s_whel_4 > 0) {
                            vehicles.setSync(vContainer, 's_whel_4', s_whel_4 - 1);
                            vehicles.currentData.set('s_whel_4', s_whel_4 - 1);
                            if (s_whel_4 <= 1)
                                vehicles.setTyreState( 5, 2);
                        }
                    }*/

                    if (currentBodyHp - currentBodyHpNew > 100) {

                        if (methods.getRandomInt(0, 100) < 50) {
                            if (s_eng > 1) {
                                let rand = methods.getRandomInt(1, 10);
                                vehicles.setSync(vContainer, 's_eng', s_eng - rand);
                                vehicles.currentData.set('s_eng', s_eng - rand);
                            }
                        }
                        if (methods.getRandomInt(0, 100) < 50) {
                            if (s_trans > 1) {
                                let rand = methods.getRandomInt(1, 10);
                                vehicles.setSync(vContainer, 's_trans', s_trans - rand);
                                vehicles.currentData.set('s_trans', s_trans - rand);
                            }
                        }
                        if (vClass === 8) {
                            if (methods.getRandomInt(0, 100) < 50) {
                                if (s_whel_1 > 1) {
                                    let rand = methods.getRandomInt(1, 10);
                                    vehicles.setSync(vContainer, 's_whel_1', s_whel_1 - rand);
                                    vehicles.currentData.set('s_whel_1', s_whel_1 - rand);

                                    if (s_whel_1 - rand <= 1)
                                        vehicles.setTyreState( 0, 2);
                                }
                                if (s_whel_2 > 1) {
                                    let rand = methods.getRandomInt(1, 10);
                                    vehicles.setSync(vContainer, 's_whel_2', s_whel_2 - rand);
                                    vehicles.currentData.set('s_whel_2', s_whel_2 - rand);

                                    if (s_whel_2 - rand <= 1)
                                        vehicles.setTyreState( 1, 2);
                                }
                            }
                        }
                        else {
                            if (methods.getRandomInt(0, 100) < 50) {
                                if (s_whel_1 > 1) {
                                    let rand = methods.getRandomInt(1, 10);
                                    vehicles.setSync(vContainer, 's_whel_1', s_whel_1 - rand);
                                    vehicles.currentData.set('s_whel_1', s_whel_1 - rand);

                                    if (s_whel_1 - rand <= 1)
                                        vehicles.setTyreState( 0, 2);
                                }
                                if (s_whel_2 > 1) {
                                    let rand = methods.getRandomInt(1, 10);
                                    vehicles.setSync(vContainer, 's_whel_2', s_whel_2 - rand);
                                    vehicles.currentData.set('s_whel_2', s_whel_2 - rand);

                                    if (s_whel_2 - rand <= 1)
                                        vehicles.setTyreState( 1, 2);
                                }
                                if (s_whel_3 > 1) {
                                    let rand = methods.getRandomInt(1, 10);
                                    vehicles.setSync(vContainer, 's_whel_3', s_whel_3 - rand);
                                    vehicles.currentData.set('s_whel_3', s_whel_3 - rand);

                                    if (s_whel_3 - rand <= 1)
                                        vehicles.setTyreState( 4, 2);
                                }
                                if (s_whel_4 > 1) {
                                    let rand = methods.getRandomInt(1, 10);
                                    vehicles.setSync(vContainer, 's_whel_4', s_whel_4 - rand);
                                    vehicles.currentData.set('s_whel_4', s_whel_4 - rand);

                                    if (s_whel_4 - rand <= 1)
                                        vehicles.setTyreState( 5, 2);
                                }
                            }
                        }
                        if (methods.getRandomInt(0, 100) < 50) {
                            if (s_elec > 1) {
                                let rand = methods.getRandomInt(1, 10);
                                vehicles.setSync(vContainer, 's_elec', s_elec - rand);
                                vehicles.currentData.set('s_elec', s_elec - rand);
                            }
                        }
                        if (methods.getRandomInt(0, 100) < 50) {
                            if (s_break > 1) {
                                let rand = methods.getRandomInt(1, 10);
                                vehicles.setSync(vContainer, 's_break', rand);
                                vehicles.currentData.set('s_break', s_break - rand);
                            }
                        }
                    }
                    if (currentEngHp - currentEngHpNew > 100) {
                        if (s_eng > 1) {
                            let rand = methods.getRandomInt(1, 5);
                            vehicles.setSync(vContainer, 's_eng', s_eng - rand);
                            vehicles.currentData.set('s_eng', s_eng - rand);
                        }
                    }
                    if (currentFuelHp - currentFuelHpNew > 100) {
                        if (s_fuel > 1) {
                            let rand = methods.getRandomInt(1, 5);
                            vehicles.setSync(vContainer, 's_fuel', s_fuel - rand);
                            vehicles.currentData.set('s_fuel', s_fuel - rand);
                        }
                    }

                    s_eng = vehicles.currentData.get('s_eng');
                    if (s_eng < 0) {
                        vehicles.setSync(vContainer, 's_eng', 0);
                        vehicles.currentData.set('s_eng', 0);
                    }
                    s_trans = vehicles.currentData.get('s_trans');
                    if (s_trans < 0) {
                        vehicles.setSync(vContainer, 's_trans', 0);
                        vehicles.currentData.set('s_trans', 0);
                    }
                    s_fuel = vehicles.currentData.get('s_fuel');
                    if (s_fuel < 0) {
                        vehicles.setSync(vContainer, 's_fuel', 0);
                        vehicles.currentData.set('s_fuel', 0);
                    }
                    s_whel_1 = vehicles.currentData.get('s_whel_1');
                    if (s_whel_1 < 0) {
                        vehicles.setSync(vContainer, 's_whel_1', 0);
                        vehicles.currentData.set('s_whel_1', 0);
                        vehicles.setTyreState( 0, 2);
                    }
                    s_whel_2 = vehicles.currentData.get('s_whel_2');
                    if (s_whel_2 < 0) {
                        vehicles.setSync(vContainer, 's_whel_2', 0);
                        vehicles.currentData.set('s_whel_2', 0);
                        vehicles.setTyreState( 1, 2);
                    }
                    s_whel_3 = vehicles.currentData.get('s_whel_3');
                    if (s_whel_3 < 0) {
                        vehicles.setSync(vContainer, 's_whel_3', 0);
                        vehicles.currentData.set('s_whel_3', 0);
                        vehicles.setTyreState( 4, 2);
                    }
                    s_whel_4 = vehicles.currentData.get('s_whel_4');
                    if (s_whel_4 < 0) {
                        vehicles.setSync(vContainer, 's_whel_4', 0);
                        vehicles.currentData.set('s_whel_4', 0);
                        vehicles.setTyreState( 5, 2);
                    }
                    s_elec = vehicles.currentData.get('s_elec');
                    if (s_elec < 0) {
                        vehicles.setSync(vContainer, 's_elec', 0);
                        vehicles.currentData.set('s_elec', 0);
                    }
                    s_break = vehicles.currentData.get('s_break');
                    if (s_break < 0) {
                        vehicles.setSync(vContainer, 's_break', 0);
                        vehicles.currentData.set('s_break', 0);
                    }
                }

                currentBodyHp = currentBodyHpNew;
                currentEngHp = currentEngHpNew;
                currentFuelHp = currentFuelHpNew;
            }
        }
    }
    catch (e) {
        methods.error(e);
    }
});

export default vehicles;