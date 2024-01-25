import user from "./user";
import weapons from "./weapons";
import admin from "./admin";

import methods from "./modules/methods";
import Container from "./modules/data";
import timer from "./manager/timer";
import new_events from "./check_events";
import ui from "./modules/ui";
//import vehicles from "./property/vehicles";
let antiCheat = {};

let prevPos = new mp.Vector3(0, 0, 0);

let prevArrayConfig = [];

let attemptRecoil = 0;
let attemptGm = 0;
let attemptWeapon = 0;
let attemptAmmo = 0;
let attemptTeleport = 0;
let attemptFly = 0;

let healthPrev = 100;
let armorPrev = 100;
let weaponAmmoPrev = 0;

let autoHeal = 100;
let autoArmor = 0;
let autoAmmo = 0;

new_events.add("playerEnterVehicle", function (vehicle, seat) {
    methods.debug('playerEnterVehicle312431245')
    user.isSetAmmoTrue();
});

new_events.add("playerLeaveVehicle", function () {
    methods.debug('playerLeaveVehicle3124')
    user.isSetAmmoTrue();
});

antiCheat.load = function () {
    //setInterval(antiCheat.gmTimer, 1);

    timer.createInterval('antiCheat.healTimer', antiCheat.healTimer, 10);
    timer.createInterval('antiCheat.secTimer', antiCheat.secTimer, 1000);
    timer.createInterval('antiCheat.tenSecTimer', antiCheat.tenSecTimer, 10000);
    timer.createInterval('antiCheat.ten3SecTimer', antiCheat.ten3SecTimer, 30000);
};

antiCheat.tenSecTimer = function () {
    attemptGm = 0;
    attemptTeleport = 0;
    attemptFly = 0;
};

antiCheat.crash = function () {
    function one() {two();}
    function two() {one();}
    one();
};

antiCheat.ten3SecTimer = function () {
    attemptWeapon = 0;
};

antiCheat.gmTimer = function () {
    if (user.isLogin()) {
        if (mp.players.local.getHealth() > healthPrev || mp.players.local.getArmour() > armorPrev)
            attemptGm++;
        healthPrev = mp.players.local.getHealth();
        armorPrev = mp.players.local.getArmour();

    }
};

antiCheat.healTimer = function () {
    if (user.isLogin() && !methods.isBlockKeys()) {
        /*if (mp.players.local.getHealth() > autoHeal) {
            if (!user.isHealth())
                user.warnAntiCheat(`Auto Heal (HP)`);
            user.setHealthFalse();
        }
        if (mp.players.local.getArmour() > autoArmor) {
            if (!user.isArmor())
                user.warnAntiCheat(`Auto Heal (AP)`);
            user.setArmorFalse();
        }
        if (user.getCurrentAmmo() > autoAmmo && user.getCurrentAmmo() > 0) {
            if (!user.isSetAmmo())
                user.warnAntiCheat(`Full Ammo`);
            user.isSetAmmoFalse();
        }*/
        autoHeal = mp.players.local.getHealth();
        autoArmor = mp.players.local.getArmour();
        autoAmmo = user.getCurrentAmmo();
    }
};

/*new_events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
    mp.game.ui.notifications.show(sourceEntity.id + ' ~y~' + targetEntity.id + ' ~g~' + damage + ' ~b~' + sourcePlayer.id)
});*/
// antiCheat.secs = function () {
//     return Math.round(Date.now() / 1000)
// }
// antiCheat.subtractVector = function (v1, v2) {
//     return {"x": v1.x - v2.x,"y": v1.y - v2.y,"z": v1.z - v2.z}
// }
// antiCheat.isWalking = function () {
//     if(mp.players.local.isFalling() || mp.players.local.isRagdoll()) return false
//     else if(!mp.players.local.vehicle) return true
// }
antiCheat.secTimer = function () {
    if(user.isLogin() && user.isAdmin()) return
    if (user.isLogin()) {
        mp.browsers.forEach(b => {
            if (!b.validate)
                user.kickAntiCheat(`Executer code #3`);
        });
    }

    let call = (mp.events.call != "function () { [native code] }") ? true : false;
    let callRemote = (mp.events.callRemote != 'function () { [native code] }') ? true : false;
    let callRemoteUnreliable = (mp.events.callRemoteUnreliable != 'function () { [native code] }') ? true : false;
    if(callRemote || callRemoteUnreliable || call)
        user.kickAntiCheat(`Executer code #998`);

    if (user.isLogin() && !methods.isBlockKeys()) {

        if (attemptWeapon > 3 && user.isLogin()) {
            user.kickAntiCheat('Endless Ammo');
        }

        if (attemptTeleport >= 2 && user.isLogin()) {
            user.kickAntiCheat('Teleport');
        }

        if (!admin.isGodModeEnable() && user.isLogin()) {
            if (mp.players.local.getHealth() >= 500 || mp.players.local.getArmour() >= 200) {
                user.kickAntiCheat('GodMode');
            }
            if (mp.game.player.getInvincible()) {
                user.warnAntiCheat(`GodMode`);
                try {
                    mp.players.local.setInvincible(false);
                    mp.game.player.setInvincible(false);
                }
                catch (e) {

                }
            }
            if (mp.players.local.isRagdoll() && !user.isAdmin() && user.isLogin()) {
                if (!mp.players.local.canRagdoll() && !user.isAdmin() && user.isLogin()) {
                    user.warnAntiCheat(`Disalbe Ragdoll`);
                }
            }

        }

        let newPos = mp.players.local.position;
        let dist = mp.players.local.vehicle ? methods.getCurrentSpeed() + 100 : 80;
        let distNew = methods.distanceToPos(prevPos, newPos);
        if (distNew > dist && !mp.players.local.isFalling() && !mp.players.local.isRagdoll() && !methods.isBlockKeys() && mp.players.local.getParachuteState() === -1 && user.isLogin()) {
            if (!user.isTeleport()) {
                attemptTeleport++;
                user.warnAntiCheat(`Teleport (${distNew.toFixed(2)}m)`);
            }
            user.setTeleport(false);
        }
        prevPos = newPos;

        /*if (mp.players.local.isSittingInAnyVehicle()) {
            let veh = mp.players.local.vehicle;
            if (mp.players.local.handle === mp.players.local.vehicle.getPedInSeat(-1) && !veh.isInAir()) {
                let currentSpeed = methods.getCurrentSpeed();
                let maxSpeed = vehicles.getSpeedMax(veh.model);
                if (!user.getCache('s_hud_speed_type'))
                    maxSpeed = methods.parseInt(maxSpeed / 1.609);

                maxSpeed = maxSpeed + 70;

                if (currentSpeed >= maxSpeed) {
                    if (!user.getCache('s_hud_speed_type'))
                        user.kickAntiCheat(`SpeedHack ${currentSpeed} mp/h`);
                    else
                        user.kickAntiCheat(`SpeedHack ${currentSpeed} km/h`);
                }
            }
        }*/
    }
};
new_events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => { //TODO голова урон
    if (weapon == 2725352035 && mp.players.local.vehicle && mp.players.local.vehicle.handle) return true;
    let dmg = weapons.getDamageByHashName(weapon);
    if (dmg >= 0) {
        try {
            dmg = dmg * 2;
            if (targetEntity.type === 'player') {
                if (boneIndex === 20) {
                    /*let dmg = weapons.getDamageHeadByHashName(weapon);
                    let propIndex = mp.players.atRemoteId(targetEntity.remoteId).getPropIndex(0);
                    switch (propIndex) {
                        case 38:
                        case 58:
                        case 88:
                        case 89:
                        case 111:
                            dmg = dmg * 0.7;
                            break;
                        case 114:
                        case 115:
                        case 116:
                        case 117:
                        case 118:
                        case 122:
                        case 123:
                            dmg = dmg * 0.5;
                            break;
                    }*/
                    let dmg = weapons.getDamageByHashName(weapon);
                    methods.callRemote('server:weapon:applyDamageHp', targetEntity.remoteId, dmg, weapons.getNameByHash(weapon), boneIndex);
                    return true;
                }
                else if (boneIndex === 8 || boneIndex === 9 || boneIndex === 10) {
                    let dmg = weapons.getDamageByHashName(weapon);
                    methods.callRemote('server:weapon:applyDamage', targetEntity.remoteId, dmg, weapons.getNameByHash(weapon), boneIndex);
                    return true;
                }
                else {
                    let dmg = weapons.getDamageByHashName(weapon); // / 3
                    methods.callRemote('server:weapon:applyDamage', targetEntity.remoteId, dmg, weapons.getNameByHash(weapon), boneIndex);
                    return true;
                }
            }
        }
        catch (e) {
            methods.error('outgoingDamage', e)
        }
    }
    else if (dmg < -1) {
        return true;
    }
    // if(mp.players.exists(sourceEntity) && sourceEntity == mp.players.local && ui.isGreenZone() && !user.isPolice()) return true;
});

new_events.add('client:weapon:applyDamage', (damage) => {
    mp.players.local.applyDamageTo(methods.parseInt(damage), true);
});
// let repeat = antiCheat.secs()
// let pos = mp.players.local.position
// new_events.add("render", () => {
// 	if(repeat < antiCheat.secs())
// 	{	
// 		if (!user.isAdmin()) {
// 			let flyDetect = antiCheat.subtractVector(pos, mp.players.local.position)
// 			if (Math.abs(flyDetect.x) > 15 || Math.abs(flyDetect.y) > 15|| Math.abs(flyDetect.z) > 15) {
// 				if(anticheat.isWalking()) {
// 					user.kickAntiCheat('Flyhack/Teleport')
// 				}
// 			}
// 		}
// 		pos = mp.players.local.position
// 		repeat = antiCheat.secs() + 3;
// 	}
// });
/*new_events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
    mp.game.ui.notifications.show(weapon + '_' + boneIndex + '_' + damage + '_' + targetEntity.remoteId);
    return true;
});*/

export default antiCheat;