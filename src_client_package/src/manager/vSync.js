import methods from "../modules/methods";
import user from "../user";
import vehicles from "../property/vehicles";
import Container from "../modules/data";
import new_events from "../check_events";
let vSync = {};
//mp.game.vehicle.defaultEngineBehaviour = false;

let trailerHeal = 1000;
let radioInterval = null;
let currentSound;

vSync.radio = function(entity) {
    try {
        if (entity && mp.vehicles.exists(entity)) {
            try {
                let localPlayer = mp.players.local;
                if (localPlayer.vehicle == entity) {
                    let vehSyncData = entity.getVariable('vehicleSyncData');
                    if (typeof vehSyncData !== 'undefined') {
                        currentSound = mp.game.invoke(methods.GET_PLAYER_RADIO_STATION_INDEX);
                        if (entity.getPedInSeat(-1) == localPlayer.handle) {
                            if (vehSyncData.RadioState != currentSound)
                                methods.callRemote('s:vSync:radioChange', entity.remoteId, currentSound);
                        } else {
                            if (vehSyncData.RadioState == 255)
                                mp.game.audio.setRadioToStationName("OFF");
                            else {
                                if (vehSyncData.RadioState != currentSound) {
                                    mp.game.invoke(methods.SET_FRONTEND_RADIO_ACTIVE, true);
                                    mp.game.invoke(methods.SET_RADIO_TO_STATION_INDEX, vehSyncData.RadioState);
                                }
                            }
                        }
                    }
                }
            }
            catch (e) {
                methods.debug('RADIO_TIMER');
                methods.debug(e);
            }
        } else {
            if (radioInterval != null) {
                clearInterval(radioInterval);
                radioInterval = null;
            }
        }
    }
    catch (e) {
        methods.debug('RADIO_TIMER_2');
        methods.debug(e);
    }
};

vSync.updateValues = function(entity, byEnter = false) {
    if (entity && mp.vehicles.exists(entity)) {

        try {
            entity.setTyresCanBurst(true);
        }
        catch (e) {}

        if (!byEnter)
            entity.wheelState = [];

        let actualData = entity.getVariable('vehicleSyncData');
        if (typeof actualData !== 'undefined') {
            try {
                if (vehicles.isVehicleSirenValid(entity.model)) {
                    entity.setSirenSound(true);
                    entity.setSiren(false);

                    let vehId = entity.remoteId;

                    if (actualData.SirenState == 0) {
                        entity.setSiren(false);
                        vSync.stopSound(vehId, 'srn');
                    }
                    else if (actualData.SirenState == 1) {
                        entity.setSiren(true);
                        vSync.stopSound(vehId, 'srn');
                    }
                    else if (actualData.SirenState > 1 && actualData.SirenState < 5) {
                        entity.setSiren(true);
                        vSync.playSound(vehId, 'srn', vehicles.getSirenSound(entity.model, actualData.SirenState));
                    }
                }

                //ntity.setEngineOn(actualData.Engine, true, false);
                mp.game.invoke(methods.SET_VEHICLE_UNDRIVEABLE, entity.handle, true);

                if (!byEnter)
                    entity.setDirtLevel(actualData.Dirt);
                entity.setIndicatorLights(1, actualData.IndicatorLeftToggle);
                entity.setIndicatorLights(0, actualData.IndicatorRightToggle);

                /*if (actualData.RadioState == 255) mp.game.audio.setRadioToStationName("OFF");
                else {
                    mp.game.invoke(methods.SET_FRONTEND_RADIO_ACTIVE, true);
                    mp.game.invoke(methods.SET_RADIO_TO_STATION_INDEX, actualData.RadioState);
                }*/

                entity.setInteriorlight(actualData.InteriorLight);
                entity.setTaxiLights(actualData.TaxiLight);

                mp.game.invoke(methods.SET_BOAT_FROZEN_WHEN_ANCHORED, entity.handle, true);
                entity.setBoatAnchor(actualData.Anchor);
                //entity.setCollision(actualData.Collision, true);
                entity.freezePosition(actualData.Freeze);

                entity.toggleMod(20, actualData.SmokeR !== 255 || actualData.SmokeG !== 255 || actualData.SmokeB !== 255);
                entity.setTyreSmokeColor(actualData.SmokeR, actualData.SmokeG, actualData.SmokeB);
                
                try {
                    mp.game.invoke(methods.SET_VEHICLE_INTERIOR_COLOUR, entity.handle, actualData.IntColor);
                    mp.game.invoke(methods.SET_VEHICLE_DASHBOARD_COLOUR, entity.handle, actualData.DbColor);
                }
                catch (e) {
                    
                }

                try {

                    if (!byEnter) {
                        if (entity.getClass() === 15 || entity.getClass() === 16 || entity.getClass() === 22 || entity.getClass() === 11  || entity.getClass() === 20 || entity.model === mp.game.joaat('polmav'))
                        {

                        }
                        else {
                            for(let i = 0; i < 10; i++)
                                entity.setExtra(i, 1);
                            entity.setExtra(actualData.Extra, 0);
                        }

                        for(let i = 0; i < 8; i++)
                        {
                            if (actualData.Window[i] === 1) {
                                entity.rollDownWindow(i);
                            }
                            else if (actualData.Window[i] === 2) {
                                entity.smashWindow(i);
                            }
                            else {
                                entity.fixWindow(i);
                                entity.rollUpWindow(i);
                            }
                        }

                        for(let i = 0; i < 6; i++)
                        {
                            if (actualData.Doors[i]) {
                                entity.setDoorBroken(i, true);
                            }
                        }
                        for(let i = 0; i < 6; i++)
                        {
                            entity.wheelState.push(actualData.Tyre[i]);
                            if (actualData.Tyre[i] === 1) {
                                mp.game.invoke('0x74C68EF97645E79D', entity.handle, i, 1135542275);
                                entity.setTyreBurst(i, false, 1000);
                            }
                            else if (actualData.Tyre[i] === 0) {
                                mp.game.invoke('0x74C68EF97645E79D', entity.handle, i, 1148846080);
                                entity.setTyreFixed(i);
                            }
                            else {
                                mp.game.invoke('0x74C68EF97645E79D', entity.handle, i, 0);
                                entity.setTyreBurst(i, true, 1000);
                            }
                        }
                    }
                }
                catch (e) {
                    
                }

                if (entity.getVariable('markAsDrone')) {
                    entity.setAlpha(0);
                    vSync.playSound(entity.remoteId, 'drone', "Flight_Loop", "DLC_Arena_Drone_Sounds");
                    entity.setCanBeDamaged(false);
                    entity.setInvincible(true);
                }

                vehicles.setHandling(entity);

                entity.setSearchlight(actualData.SpotLight, false);

                if (actualData.Trunk)
                    entity.setDoorOpen(5, false, false);
                else
                    entity.setDoorShut(5, false);

                if (actualData.Hood)
                    entity.setDoorOpen(4, false, false);
                else
                    entity.setDoorShut(4, false);

                if (actualData.SuspensionRaise > -999) {
                    if (actualData.SuspensionRaise > 0)
                        entity.setHandling('fTractionLossMult', 0.9);
                    entity.setHandling('fSuspensionRaise', actualData.SuspensionRaise);
                }
                if (actualData.SteeringLock > -999)
                    entity.setHandling('fSteeringLock', actualData.SteeringLock);
                if (actualData.Camber > -999) {
                    entity.setHandling('fCamberFront', actualData.Camber);
                    entity.setHandling('fCamberRear', actualData.Camber);
                }
            }
            catch (e) {
                methods.debug(e);
            }
        }
        else {

            setTimeout(function () {
                //methods.callRemote("s:vSync:setEngineStatus", entity, false); //TODO
                //vSync.updateValues(entity);
            }, 2000);
        }
    }
};

vSync.playSound = function(vehId, prefix, name, ref = "") {

    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            if (vehicles.has(veh.remoteId, prefix + 'currentSound')) {
                let sId = vehicles.get(veh.remoteId, prefix + 'currentSound');
                mp.game.audio.stopSound(sId);
                mp.game.audio.releaseSoundId(sId);
                vehicles.reset(veh.remoteId, prefix + 'currentSound');
            }

            let sId = mp.game.invoke(methods.GET_SOUND_ID);
            //mp.game.invoke(methods.PLAY_SOUND_FROM_ENTITY, sId, name, veh.handle, ref, 0, 0);
            mp.game.audio.playSoundFromEntity(sId, name, veh.handle, ref, true, 0);
            vehicles.set(veh.remoteId, prefix + 'currentSound', sId);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

vSync.stopSound = function(vehId, prefix) {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            if (vehicles.has(veh.remoteId, prefix + 'currentSound')) {
                let sId = vehicles.get(veh.remoteId, prefix + 'currentSound');
                mp.game.audio.stopSound(sId);
                mp.game.audio.releaseSoundId(sId);
                vehicles.reset(veh.remoteId, prefix + 'currentSound');
            }
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

vSync.syncToServer = function(entity) {

    try {
        if (entity === undefined) {
            if (!mp.players.local.vehicle)
                return;

            entity = mp.players.local.vehicle;
            if (entity.getPedInSeat(-1) != mp.players.local.handle)
                return;
        }

        let actualData = entity.getVariable('vehicleSyncData');
        // let trailerId = entity.getVariable('trailer');

        // if (trailerId) {
        //     let trailer = mp.vehicles.atRemoteId(trailerId);
        //     if (mp.vehicles.exists(trailer)) {
        //         if (methods.parseInt(trailerHeal) != methods.parseInt(trailer.getBodyHealth())) {
        //             trailerHeal = methods.parseInt(trailer.getBodyHealth());
        //             methods.callRemote("s:vSync:setBodyHealth", trailer, trailerHeal);
        //         }
        //     }
        // }

        if (typeof actualData !== 'undefined') {
            let dirtLevel = entity.getDirtLevel();
            if (methods.parseInt(actualData.Dirt) != methods.parseInt(dirtLevel))
                methods.callRemote("s:vSync:setDirtLevel", entity, dirtLevel);
        }
    }
    catch (e) {
        methods.debug(e);
    }
};

new_events.add("vSync:playerExitVehicle", (vehId) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            vSync.syncToServer(veh);
        }
    }
    catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:playSound", (vehId, prefix, name) => {
    vSync.playSound(vehId, prefix, name);
});

new_events.add("vSync:stopSound", (vehId, prefix) => {
    vSync.stopSound(vehId, prefix);
});

new_events.add("vSync:Sound", (vehId) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            veh.setAlpha(0);
            vSync.playSound(veh.remoteId, 'drone', "Flight_Loop", "DLC_Arena_Drone_Sounds");
            veh.setCanBeDamaged(false);
            veh.setInvincible(true);
        }
    }
    catch (e) {

    }
});

new_events.add("vSync:setVehicleWindowStatus", (vehId, windw, state) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            if (state === 1) {
                veh.rollDownWindow(windw);
            }
            else if (state === 2) {
                veh.smashWindow(windw);
            }
            else {
                veh.fixWindow(windw);
                veh.rollUpWindow(windw);
            }
        }
    }
    catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setVehicleDoorStatus", (vehId, idx, state) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            if (state === 1)
                veh.setDoorBroken(idx, true);
        }
    }
    catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setVehicleTyreStatus", (vehId, idx, state) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {

            if (idx === 9) {
                if (state === 1) {
                    veh.setTyreBurst(45, false, 1000);
                }
                else if (state === 0) {
                    veh.setTyreFixed(45);
                }
                else {
                    veh.setTyreBurst(45, true, 1000);
                }
            }
            else if (idx === 10) {
                if (state === 1) {
                    veh.setTyreBurst(47, false, 1000);
                }
                else if (state === 0) {
                    veh.setTyreFixed(47);
                }
                else {
                    veh.setTyreBurst(47, true, 1000);
                }
            }
            else {
                try {
                    veh.wheelState[idx] = state;
                }
                catch (e) {}
                if (state === 1) {
                    mp.game.invoke('0x74C68EF97645E79D', veh.handle, idx, 1135542275);
                    veh.setTyreBurst(idx, false, 1000);
                }
                else if (state === 0) {
                    mp.game.invoke('0x74C68EF97645E79D', veh.handle, idx, 1148846080);
                    veh.setTyreFixed(idx);
                }
                else {
                    mp.game.invoke('0x74C68EF97645E79D', veh.handle, idx, 0);
                    veh.setTyreBurst(idx, true, 1000);
                }
            }
        }
    }
    catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:radioChange", (vehId, state) => {
    /*try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            if (state == 255) mp.game.audio.setRadioToStationName("OFF");
            else {
                mp.game.invoke(methods.SET_FRONTEND_RADIO_ACTIVE, true);
                mp.game.invoke(methods.SET_RADIO_TO_STATION_INDEX, state);
            }
        }
    }
    catch (e) {
        methods.debug(e);
    }*/
});

/*new_events.add("vSync:setVehicleWheelMod", (vehId, state, isShowLabel) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            if (state > 0)
                mp.game.invoke(methods.SET_VEHICLE_MOD, veh.handle, 23, state, isShowLabel);
        }
    }
    catch (e) {
        methods.debug(e);
    }
});*/

new_events.add("vSync:setVehicleDirt", (vehId, dirt) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            veh.setDirtLevel(dirt);
        }
    }
    catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setVehicleInteriorColor", (vehId, color) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            mp.game.invoke(methods.SET_VEHICLE_INTERIOR_COLOUR, veh.handle, color);
        }
    }
    catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setVehicleDashboardColor", (vehId, color) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            mp.game.invoke(methods.SET_VEHICLE_DASHBOARD_COLOUR, veh.handle, color);
        }
    }
    catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setVehicleTyreSmokeColor", (vehId, r, g, b) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            veh.toggleMod(20, true);
            veh.setTyreSmokeColor(r, g, b);
        }
    }
    catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setVehicleDoorState", (vehId, door, state) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            if (state === 0)
                veh.setDoorShut(door, false);
            else if (state === 1)
                veh.setDoorOpen(door, false, false);
            else
                veh.setDoorBroken(door, true);
        }
    }
    catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setEngineState", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            /*console.log(vehId, status);
            console.log(mp.players.local.vehicle && mp.players.local.vehicle.remoteId == vehId);
            if ((mp.players.local.vehicle && mp.players.local.vehicle.remoteId == vehId) === true)
                veh.setEngineOn(status, false, false);
            else*/
            //veh.setEngineOn(status, true, false);
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setInteriorLightState", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            veh.setInteriorlight(status);
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setTaxiLightState", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            veh.setTaxiLights(status);
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setAnchorState", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            mp.game.invoke(methods.SET_BOAT_FROZEN_WHEN_ANCHORED, veh.handle, true);
            veh.setBoatAnchor(status);
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setFreezeState", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            veh.freezePosition(status)
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setCollisionState", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            //veh.setCollision(status, true)
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setExtraState", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {

            if (veh.getClass() === 15 || veh.getClass() === 16 || veh.getClass() === 22 || veh.getClass() === 11 || veh.getClass() === 20 || veh.model === mp.game.joaat('polmav'))
                return;

            for(let i = 0; i < 10; i++)
                veh.setExtra(i, 1);
            veh.setExtra(status, 0);
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setSpotLightState", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            veh.setSearchlight(status, false);
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setIndicatorRightToggle", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            veh.setIndicatorLights(0, status);
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setTrunkState", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            if (status)
                veh.setDoorOpen(5, false, false);
            else
                veh.setDoorShut(5, false);
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setHoodState", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            if (status)
                veh.setDoorOpen(4, false, false);
            else
                veh.setDoorShut(4, false);
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setSuspensionRaiseState", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            if (status > 0)
                veh.setHandling('fTractionLossMult', 0.9);
            veh.setHandling('fSuspensionRaise', status);
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setSteeringLockState", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            veh.setHandling('fSteeringLock', status);
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setCamberState", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            veh.setHandling('fCamberRear', status);
            veh.setHandling('fCamberFront', status);
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setIndicatorLeftToggle", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            veh.setIndicatorLights(1, status);
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setLockStatus", (vehId, status) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            if (status) {
                mp.game.audio.playSoundFromEntity(1, "Remote_Control_Close", veh.handle, "PI_Menu_Sounds", true, 0);
            } else {
                mp.game.audio.playSoundFromEntity(1, "Remote_Control_Open", veh.handle, "PI_Menu_Sounds", true, 0);
            }
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setHeading", (vehId, rot) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            veh.setRotation(0,0, rot, 0, true);
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("vSync:setSirenState", (vehId, state) => {
    try {
        let veh = mp.vehicles.atRemoteId(vehId);
        if (veh !== undefined && mp.vehicles.exists(veh)) {
            if (vehicles.isVehicleSirenValid(veh.model)) {
                //veh.setSiren(false);
                veh.setSirenSound(true);

                if (state == 0) {
                    veh.setSiren(false);
                    vSync.stopSound(vehId, 'srn');
                }
                else if (state == 1) {
                    veh.setSiren(true);
                    vSync.stopSound(vehId, 'srn');
                }
                else if (state > 1 && state < 5) {
                    //veh.setSiren(true);
                    vSync.playSound(vehId, 'srn', vehicles.getSirenSound(veh.model, state));
                }
            }
        }
    } catch (e) {
        methods.debug(e);
    }
});

new_events.add("playerEnterVehicle", (entity, seat) => {

    if (!user.isLogin())
        return;

    methods.debug('playerEnterVehicle' + seat);

    try {
        if (entity) {
            if (radioInterval != null)
                clearInterval(radioInterval);
            radioInterval = setInterval(() => { vSync.radio(entity); }, 1000);
        }
    }
    catch (e) {
        methods.debug('RADIO');
        methods.debug(e);
    }

    try {
        if (entity !== undefined && mp.vehicles.exists(entity)) {
            vSync.updateValues(entity, true);
        }
    }
    catch (e) {}
});

new_events.add("playerLeaveVehicle", (entity) => {
    if (radioInterval != null) {
        clearInterval(radioInterval);
        radioInterval = null;
    }
    if(entity && entity.handle){
        methods.callRemote("s:vSync:stopSound", entity.remoteId, 'wrng');  
    }
    
});

mp.keys.bind(0x45, true, function() {
    if (!user.isLogin())
        return;
    let veh = mp.players.local.vehicle;
    if (!methods.isBlockKeys() && veh && veh.getPedInSeat(-1) === mp.players.local.handle && vehicles.isVehicleSirenValid(veh.model)) {
        //mp.game.invoke(methods.PLAY_SOUND_FROM_ENTITY, 9999, vehicles.getWarningSound(mp.players.local.vehicle.model), mp.players.local.vehicle.handle, 0, 0, 0);
        methods.callRemote("s:vSync:playSound", veh.remoteId, 'wrng', vehicles.getWarningSound(mp.players.local.vehicle.model));
    }
});

mp.keys.bind(0x45, false, function() {
    if (!user.isLogin())
        return;
    let veh = mp.players.local.vehicle;
    if (!methods.isBlockKeys() && veh && vehicles.isVehicleSirenValid(veh.model)) {
        methods.callRemote("s:vSync:stopSound", veh.remoteId, 'wrng');
    }
});

mp.keys.bind(0x51, true, function() {
    if (!user.isLogin())
        return;
    let veh = mp.players.local.vehicle;
    if (!methods.isBlockKeys() && veh && veh.getPedInSeat(-1) === mp.players.local.handle && vehicles.isVehicleSirenValid(veh.model)) {

        let typeor = typeof veh.getVariable('vehicleSyncData');
        let actualData = veh.getVariable('vehicleSyncData');

        if (typeor !== 'undefined') {
            if (actualData.SirenState == 0) {
                mp.game.audio.playSound(-1, "NAV_LEFT_RIGHT", "HUD_FRONTEND_DEFAULT_SOUNDSET", false, 0, true);
                methods.callRemote("s:vSync:setSirenState", veh.remoteId, 1);
            }
            else {
                mp.game.audio.playSound(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", false, 0, true);
                methods.callRemote("s:vSync:setSirenState", veh.remoteId, 0);
            }
        }
    }
});

mp.keys.bind(0xBC, true, function() {
    if (!user.isLogin())
        return;
    let veh = mp.players.local.vehicle;
    if (!methods.isBlockKeys() && veh && veh.getPedInSeat(-1) === mp.players.local.handle && vehicles.isVehicleSirenValid(veh.model)) {

        let typeor = typeof veh.getVariable('vehicleSyncData');
        let actualData = veh.getVariable('vehicleSyncData');

        if (typeor !== 'undefined') {
            if (actualData.SirenState > 0) {
                let currentState = actualData.SirenState;
                currentState--;
                if (currentState < 1)
                    currentState = 4;

                mp.game.audio.playSound(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", false, 0, true);
                methods.callRemote("s:vSync:setSirenState", veh.remoteId, currentState);
            }
        }
    }
});

mp.keys.bind(0xBE, true, function() {
    if (!user.isLogin())
        return;
    let veh = mp.players.local.vehicle;
    if (!methods.isBlockKeys() && veh && veh.getPedInSeat(-1) === mp.players.local.handle && vehicles.isVehicleSirenValid(veh.model)) {

        let typeor = typeof veh.getVariable('vehicleSyncData');
        let actualData = veh.getVariable('vehicleSyncData');

        if (typeor !== 'undefined') {
            if (actualData.SirenState > 0) {
                let currentState = actualData.SirenState;
                currentState++;
                if (currentState > 4)
                    currentState = 1;

                mp.game.audio.playSound(-1, "NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET", false, 0, true);
                methods.callRemote("s:vSync:setSirenState", veh.remoteId, currentState);
            }
            else {
                methods.callRemote("s:vSync:playSound", veh.remoteId, 'srn', vehicles.getSirenSound(mp.players.local.vehicle.model, 2));
            }
        }
    }
});

mp.keys.bind(0xBE, false, function() {
    if (!user.isLogin())
        return;
    let veh = mp.players.local.vehicle;
    if (!methods.isBlockKeys() && veh && veh.getPedInSeat(-1) === mp.players.local.handle && vehicles.isVehicleSirenValid(veh.model)) {

        let typeor = typeof veh.getVariable('vehicleSyncData');
        let actualData = veh.getVariable('vehicleSyncData');

        if (typeor !== 'undefined') {
            if (actualData.SirenState == 0) {
                methods.callRemote("s:vSync:stopSound", veh.remoteId, 'srn');
            }
        }
    }
});

new_events.add('render', () => {
    try {
        let veh = mp.players.local.vehicle;
        if (veh && (veh.getClass() == 18 || veh.model == mp.game.joaat('umkcara') || veh.model == mp.game.joaat('trucara'))) {
            mp.game.controls.disableControlAction(0,86,true);
            mp.game.controls.disableControlAction(0,81,true);
            mp.game.controls.disableControlAction(0,82,true);
            mp.game.controls.disableControlAction(0,85,true);
            mp.game.controls.disableControlAction(0,80,true);
            mp.game.controls.disableControlAction(0,19,true);
        }
    }
    catch (e) {

    }
});

function setHeadlightsColor(vehicle, color) {
    try {
        if (typeof color !== "number" || isNaN(color) || color < 0 || color === 255) {
            // Disable
            vehicle.toggleMod(22, false);
            mp.game.invoke("0xE41033B25D003A07", vehicle.handle, 255); //_SET_VEHICLE_XENON_LIGHTS_COLOUR
        } else {
            // Enable
            vehicle.toggleMod(22, true);
            mp.game.invoke("0xE41033B25D003A07", vehicle.handle, color); //_SET_VEHICLE_XENON_LIGHTS_COLOUR
        }
    }
    catch (e) {
        
    }
}

mp.events.addDataHandler("headlightColor", (entity, value) => {
    if (entity.type === "vehicle")
        setHeadlightsColor(entity, value);
});

//Sync data on stream in
new_events.add("entityStreamIn", (entity) => {
    try {

        if (!user.isLogin())
            return;

        if (entity.type === "vehicle" && mp.vehicles.exists(entity)) {

            if (!mp.vehicles.exists(entity))
                return;

            let fMass = entity.getHandling('fMass');
            if (fMass > 2000)
                entity.setHandling('fTractionLossMult', 0.9);

            if (entity.getVariable('prolog'))
                entity.setHandling('fTractionLossMult', 0.9);

            /*try {
                entity.setLodMultiplier(0.1);
            }
            catch (e) {}*/

            try {
                setHeadlightsColor(entity, parseInt(entity.getVariable("headlightColor")));
                entity.setDisablePetrolTankDamage(true);    //disable fueltank damage
                entity.setDisablePetrolTankFires(true);     //disable fire fuel
                entity.trackVisibility();
                entity.setTyresCanBurst(true);

                mp.game.invoke(methods.SET_VEHICLE_UNDRIVEABLE, entity.handle, true);
                vSync.updateValues(entity);

                if (entity.getVariable('useless') === true) {
                    entity.setCanBeDamaged(false);
                    entity.setInvincible(true);
                    setTimeout(function () {
                        try {
                            if (!mp.vehicles.exists(entity))
                                return;
                            entity.freezePosition(true);
                        }
                        catch (e) {
                            methods.debug(e);
                        }
                    }, 5000);
                }
            }
            catch (e) {
                methods.debug(e);
            }

            //Set doors unbreakable for a moment
            /*let x = 0;
            for (x = 0; x < 8; x++) {
                entity.setDoorBreakable(x, false);
            }*/
        }
    }
    catch (e) {
        methods.debug(e);
    }
});


setInterval(() => {
    mp.vehicles.forEachInStreamRange(v => {
        if (mp.vehicles.exists(v) && v.handle) {
            if (v.wheelState) {
                for (let i = 0; i < 6; i++) {
                    if (v.wheelState[i] === 1)
                        mp.game.invoke('0x74C68EF97645E79D', v.handle, i, 1135542275);
                    else if (v.wheelState[i] === 2)
                        mp.game.invoke('0x74C68EF97645E79D', v.handle, i, 0);
                }
            }
        }
    });
}, 10);

export default vSync;