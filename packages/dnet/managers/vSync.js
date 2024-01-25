let vehicles = require('../property/vehicles');
let Container = require('../modules/data');
let methods = require('../modules/methods');
let user = require('../user');

let vSync = exports;

vSync.WindowID =
{
    WindowFrontRight: 0,
    WindowFrontLeft: 1,
    WindowRearRight: 2,
    WindowRearLeft: 3
};

vSync.SirenState =
{
    Disable: 0,
    EnableWithoutSound: 1,
    EnableWithSoundSlow: 2,
    EnableWithSoundNormal: 3,
    EnableWithSoundFast: 4
};

vSync.VehicleSyncData = {
    //Basics
    Dirt: 0,
    Siren: 0,
    RadioState: 0,
    Engine: false,
    Hood: false,
    Trunk: false,

    Window: [0,0,0,0,0,0,0,0],
    Doors: [0,0,0,0,0,0,0,0],
    Tyre: [0,0,0,0,0,0],

    SuspensionRaise: -999,
    SteeringLock: -999,
    Camber: -999,

    SmokeR: 255,
    SmokeG: 255,
    SmokeB: 255,

    DbColor: 0,
    IntColor: 0,

    //(Not synced)
    IndicatorLeftToggle: false,
    IndicatorRightToggle: false,
    InteriorLight: false,
    TaxiLight: false,
    SpotLight: false,
    Anchor: true,
    Freeze: false,
    Collision: true,
    Extra: 1,
};

let streamDist = 300;
let offsetId = -999000;
let prefix = 'vSync';

vSync.set = function(vehicle, key, value) {
    if (vehicles.exists(vehicle))
        vehicle.setVariable(key, value);
};

vSync.get = function(vehicle, key) {
    if (vehicles.exists(vehicle))
        return vehicle.getVariable(key);
    return vSync.VehicleSyncData;
};

vSync.has = function(vehicle, key = 'vehicleSyncData') {
    if (vehicles.exists(vehicle))
        return vehicle.getVariable(key) !== undefined && vehicle.getVariable(key) !== null;
    return false;
};

vSync.getVehicleSyncData = function(vehicle) {
    methods.debug('vSync.getVehicleSyncData');
    if (vSync.has(vehicle, 'vehicleSyncData'))
        return vSync.get(vehicle, 'vehicleSyncData');
    return vSync.VehicleSyncData;
};

vSync.updateVehicleSyncData = function(veh, data) {
    methods.debug('updateVehicleSyncData');
    if (vehicles.exists(veh) && data)
        vSync.set(veh, 'vehicleSyncData', data);
};
vSync.getSirenState = function (v) {
    methods.debug('vSync.getSirenState');
    if (!vehicles.exists(v))
        return false;
    return vSync.getVehicleSyncData(v).SirenState;
};
vSync.setVehicleWindowState = function(v, window, state) {
    methods.debug('vSync.setVehicleWindowState', window, state);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.Window[window] = state;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setVehicleWindowStatus", [v.id, window, state]);
};

vSync.getVehicleWindowState = function(v, window) {
    methods.debug('vSync.getVehicleWindowState');
    return methods.parseInt(vSync.getVehicleSyncData(v).Window[window]);
};

vSync.setVehicleTyreState = function(v, tyre, state) {
    methods.debug('vSync.setVehicleTyreState', tyre, state);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.Tyre[tyre] = state;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setVehicleTyreStatus", [v.id, tyre, state]);
};

vSync.getVehicleTyreState = function(v, tyre) {
    methods.debug('vSync.getVehicleTyreState');
    return methods.parseInt(vSync.getVehicleSyncData(v).Tyre[tyre]);
};

vSync.setVehicleDoorState = function(v, door, state) {
    methods.debug('vSync.setVehicleDoorState', door, state);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.Doors[door] = state;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setVehicleDoorStatus", [v.id, door, state]);
};

vSync.getVehicleDoorState = function(v, door) {
    methods.debug('vSync.getVehicleDoorState');
    return methods.parseInt(vSync.getVehicleSyncData(v).Doors[door]);
};

vSync.setVehicleInteriorColor = function(v, color) {
    methods.debug('vSync.setVehicleInteriorColor', color);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.IntColor = color;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setVehicleInteriorColor", [v.id, color]);
};

vSync.getVehicleInteriorColor = function(v) {
    methods.debug('vSync.getVehicleInteriorColor');
    return methods.parseInt(vSync.getVehicleSyncData(v).IntColor);
};

vSync.setVehicleDashboardColor = function(v, color) {
    methods.debug('vSync.setVehicleDashboardColor', color);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.DbColor = color;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setVehicleDashboardColor", [v.id, color]);
};

vSync.getVehicleDashboardColor = function(v) {
    methods.debug('vSync.getVehicleDashboardColor');
    return methods.parseInt(vSync.getVehicleSyncData(v).DbColor);
};

vSync.setVehicleTyreSmokeColor = function(v, r, g, b) {
    methods.debug('vSync.setVehicleTyreSmokeColor', r, g, b);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.SmokeR = methods.parseInt(r);
    data.SmokeG = methods.parseInt(g);
    data.SmokeB = methods.parseInt(b);
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setVehicleTyreSmokeColor", [v.id, r, g, b]);
};

vSync.getVehicleTyreSmokeColor = function(v) {
    methods.debug('vSync.getVehicleTyreSmokeColor');
    return {
        r: vSync.getVehicleSyncData(v).SmokeR,
        g: vSync.getVehicleSyncData(v).SmokeG,
        b: vSync.getVehicleSyncData(v).SmokeB
    };
};

vSync.setVehicleWheelMod = function(v, state, isShowLabel) {
    methods.debug('vSync.setVehicleWheelMod', state, isShowLabel);
    if (!vehicles.exists(v))
        return;
    state = methods.parseInt(state);
    let data = vSync.getVehicleSyncData(v);
    data.ModWheel = state;
    data.ModWheelSpecial = isShowLabel;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setVehicleWheelMod", [v.id, state, isShowLabel]);
};

vSync.setSirenState = function(v, state) {
    methods.debug('vSync.setSirenState', state);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.SirenState = state;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setSirenState", [v.id, state]);
};

vSync.playSound = function(v, pref, val) {
    methods.debug('vSync.playSound', pref, val);
    if (!vehicles.exists(v))
        return;
    mp.players.callInRange(v.position, streamDist, "vSync:playSound", [v.id, pref, val]);
};

vSync.stopSound = function(v, pref) {
    methods.debug('vSync.stopSound', pref);
    if (!vehicles.exists(v))
        return;
    mp.players.callInRange(v.position, streamDist, "vSync:stopSound", [v.id, pref]);
};

vSync.setVehicleDirt = function(v, dirt) {
    methods.debug('vSync.setVehicleDirt', dirt);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.Dirt = dirt;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setVehicleDirt", [v.id, dirt]);
};

vSync.getVehicleDirt = function(v) {
    methods.debug('vSync.getVehicleDirt');
    return vSync.getVehicleSyncData(v).Dirt;
};

vSync.setIndicatorLeftToggle = function(v, status) {
    methods.debug('vSync.setIndicatorLeftToggle', status);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.IndicatorLeftToggle = status;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setIndicatorLeftToggle", [v.id, status]);
};

vSync.getIndicatorLeftToggle = function(v) {
    methods.debug('vSync.getIndicatorLeftToggle');
    return vSync.getVehicleSyncData(v).IndicatorLeftToggle;
};

vSync.setIndicatorRightToggle = function(v, status) {
    methods.debug('vSync.setIndicatorRightToggle', status);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.IndicatorRightToggle = status;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setIndicatorRightToggle", [v.id, status]);
};

vSync.getIndicatorRightToggle = function(v) {
    methods.debug('vSync.getIndicatorRightToggle');
    return vSync.getVehicleSyncData(v).IndicatorRightToggle;
};

vSync.setEngineState = function(v, status) {
    methods.debug('vSync.setEngineState', status);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.Engine = status;
    vSync.updateVehicleSyncData(v, data);
    v.engine = status;
    //mp.players.callInRange(v.position, streamDist, "vSync:setEngineState", [v.id, status]);
};

vSync.getEngineState = function(v) {
    if (!vehicles.exists(v))
        return false;
    return v.engine;
};

vSync.setSuspensionRaiseState = function(v, status) {
    methods.debug('vSync.setSuspensionRaiseState', status);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.SuspensionRaise = status;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setSuspensionRaiseState", [v.id, status]);
};

vSync.getSuspensionRaiseState = function(v) {
    methods.debug('vSync.getSuspensionRaiseState');
    if (!vehicles.exists(v))
        return false;
    return vSync.getVehicleSyncData(v).SuspensionRaise;
};

vSync.setSteeringLockState = function(v, status) {
    methods.debug('vSync.setSteeringLockState', status);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.SteeringLock = status;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setSteeringLockState", [v.id, status]);
};

vSync.getSteeringLockState = function(v) {
    if (!vehicles.exists(v))
        return false;
    return vSync.getVehicleSyncData(v).SteeringLock;
};

vSync.setCamberState = function(v, status) {
    methods.debug('vSync.setCamberState', status);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.Camber = status;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setCamberState", [v.id, status]);
};

vSync.getCamberState = function(v) {
    methods.debug('vSync.getCamberState')
    if (!vehicles.exists(v))
        return false;
    return vSync.getVehicleSyncData(v).Camber;
};

vSync.setHoodState = function(v, status) {
    methods.debug('vSync.setHoodState', status);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.Hood = status;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setHoodState", [v.id, status]);
};

vSync.getHoodState = function(v) {
    methods.debug('vSync.getHoodState')
    if (!vehicles.exists(v))
        return false;
    return vSync.getVehicleSyncData(v).Hood;
};

vSync.setTrunkState = function(v, status) {
    methods.debug('vSync.setTrunkState', status);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.Trunk = status;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setTrunkState", [v.id, status]);
};

vSync.getTrunkState = function(v) {
    methods.debug('vSync.getTrunkState')
    if (!vehicles.exists(v))
        return false;
    return vSync.getVehicleSyncData(v).Trunk;
};

vSync.setInteriorLightState = function(v, status) {
    methods.debug('vSync.setInteriorLightState', status);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.InteriorLight = status;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setInteriorLightState", [v.id, status]);
};

vSync.getInteriorLightState = function(v) {
    methods.debug('vSync.getInteriorLightState')
    return vSync.getVehicleSyncData(v).InteriorLight;
};

vSync.setTaxiLightState = function(v, status) {
    methods.debug('vSync.setTaxiLightState', status);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.TaxiLight = status;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setTaxiLightState", [v.id, status]);
};

vSync.getTaxiLightState = function(v) {
    methods.debug('vSync.getTaxiLightState')
    return vSync.getVehicleSyncData(v).TaxiLight;
};

vSync.setAnchorState = function(v, status) {
    methods.debug('vSync.setAnchorState', status);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.Anchor = status;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setAnchorState", [v.id, status]);
};

vSync.getAnchorState = function(v) {
    methods.debug('vSync.getAnchorState')
    return vSync.getVehicleSyncData(v).Anchor;
};

vSync.setFreezeState = function(v, status) {
    methods.debug('vSync.setFreezeState', status);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.Freeze = status;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setFreezeState", [v.id, status]);
};

vSync.getFreezeState = function(v) {
    methods.debug('vSync.getFreezeState')
    return vSync.getVehicleSyncData(v).Freeze;
};

vSync.setCollisionState = function(v, status) {
    methods.debug('vSync.setCollisionState', status);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.Collision = status;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setCollisionState", [v.id, status]);
};

vSync.getCollisionState = function(v) {
    methods.debug('vSync.getCollisionState')
    return vSync.getVehicleSyncData(v).Collision;
};

vSync.setExtraState = function(v, status) {
    methods.debug('vSync.setExtraState', status);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.Extra = status;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setExtraState", [v.id, status]);
};

vSync.getExtraState = function(v) {
    methods.debug('vSync.getExtraState')
    return vSync.getVehicleSyncData(v).Extra;
};

vSync.setSpotLightState = function(v, status) {
    methods.debug('vSync.setSpotLightState', status);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.SpotLight = status;
    vSync.updateVehicleSyncData(v, data);
    mp.players.callInRange(v.position, streamDist, "vSync:setSpotLightState", [v.id, status]);
};

vSync.getSpotLightState = function(v) {
    methods.debug('vSync.getSpotLightState')
    return vSync.getVehicleSyncData(v).SpotLight;
};

vSync.setLockStatus = function(v, status) {
    methods.debug('vSync.setLockStatus', status);
    if (!vehicles.exists(v))
        return;
    mp.players.callInRange(v.position, streamDist, "vSync:setLockStatus", [v.id, status]);
};

vSync.setBodyHealth = function(v, health) {
    methods.debug('vSync.setBodyHealth', health);
    if (!vehicles.exists(v))
        return;
    let data = vSync.getVehicleSyncData(v);
    data.BodyHealth = health;
    v.bodyHealth = health;
    vSync.updateVehicleSyncData(v, data);
};

mp.events.add("playerEnterVehicle", function (player, vehicle) {
    methods.debug('playerEnterVehicle3124')
    if (vehicles.exists(vehicle)) {

        if (!vSync.has(vehicle))
            vSync.updateVehicleSyncData(vehicle, vSync.VehicleSyncData);

        try {
            if (vehicle.getVariable('fraction_id') || vehicle.getVariable('user_id') || vehicle.getVariable('useless'))
                return;
            vehicles.set(vehicle.id, 'afkTimer', 0);
        }
        catch (e) {
            
        }
    }
});

/*mp.events.add("playerExitVehicle", function (player, vehicle) { //TODO Возможно крашит серв из-за setTimeout + destroy
    setTimeout(function () {
        try {
            if (vehicles.exists(vehicle))
            {
                vSync.setEngineState(vehicle, vSync.getEngineState(vehicle));
                vSync.setSirenState(vehicle, vSync.getSirenState(vehicle));
            }
        }
        catch (e) {

        }
    }, 1500);
});*/