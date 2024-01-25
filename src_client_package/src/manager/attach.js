import methods from '../modules/methods';
import attachItems from "./attachItems";
import timer from "./timer";
import new_events from "../check_events";
import user from '../user';
import weapons from "../weapons";

let attach = {};
mp.attachmentMngr =
{
    attachments: {},
    addFor: async function (entity, id) {
        try {
            if (entity && entity.handle) {
                if (this.attachments.hasOwnProperty(id)) {
                    if (!entity.__attachmentObjects.hasOwnProperty(id)) {
                        if (id === mp.game.joaat('music') && entity.remoteId !== mp.players.local.remoteId)
                            return;
                        let attInfo = this.attachments[id];
                        let convertToObjectMp;
                        let spawnPos = new mp.Vector3(entity.position.x, entity.position.y, -15);

                        if (mp.game.weapon.isWeaponValid(attInfo.model)) {
                            mp.game.weapon.requestWeaponAsset(attInfo.model, 1, 1);
                            while (!mp.game.weapon.hasWeaponAssetLoaded(attInfo.model))
                                await methods.sleep(10);
                            let object = mp.game.weapon.createWeaponObject(attInfo.model, 0, spawnPos.x, spawnPos.y, spawnPos.z, true, 1, 0);
                            let boneIndex = (typeof attInfo.boneName === 'string') ?
                                entity.getBoneIndexByName(attInfo.boneName) :
                                entity.getBoneIndex(attInfo.boneName);
                            try {
                                let data = entity.getVariable("weaponComponented" + attInfo.model.toString());

                                if (data) {
                                    let [weaponHash, components] = data.split(".");
                                    weaponHash = methods.parseInt(weaponHash);
                                    let componentsArray = (components && components.length > 0) ? components.split('|').map(hash => methods.parseInt(hash)) : [];
                                    if(weaponHash == attInfo.model){
                                        for (let component of componentsArray){
                                            if (component <= 33 && component >= 0) {
                                                mp.game.invoke('0xF827589017D4E4A9', object, component - 1);
                                            } else {
                                                const model = mp.game.weapon.getWeaponComponentTypeModel(component);
                                                if (!model) return user.showCustomNotify('model incorrect');
                                                if (!mp.game.streaming.hasModelLoaded(model)) {
                                                    mp.game.streaming.requestModel(model);
                                                    while (!mp.game.streaming.hasModelLoaded(model)) await methods.sleep(10);
                                                }

                                                mp.game.weapon.giveWeaponComponentToWeaponObject(object, component);    
                                            }
                                            
                                        }    
                                    }
                                    
                                }
                                // //SET_WEAPON_OBJECT_TINT_INDEX
                            }
                            catch (e) {
                                methods.error('WEAPON ATTACHMENT', e)
                            }
                            convertToObjectMp = mp.objects.newWeak(object);
                            await waitEntity(convertToObjectMp).then(() => {
                                convertToObjectMp.attachTo(entity.handle, boneIndex,
                                    attInfo.offset.x, attInfo.offset.y, attInfo.offset.z,
                                    attInfo.rotation.x, attInfo.rotation.y, attInfo.rotation.z,
                                    false, false, attInfo.collision, false, 2, true);
                            })
                            entity.__attachmentObjects[id] = convertToObjectMp;


                        }
                        else {
                            let object = mp.objects.new(attInfo.model, spawnPos, { dimension: entity.dimension });
                            let boneIndex = (typeof attInfo.boneName === 'string') ?
                                entity.getBoneIndexByName(attInfo.boneName) :
                                entity.getBoneIndex(attInfo.boneName);

                            await waitEntity(object).then(() => {
                                object.attachTo(entity.handle, boneIndex,
                                    attInfo.offset.x, attInfo.offset.y, attInfo.offset.z,
                                    attInfo.rotation.x, attInfo.rotation.y, attInfo.rotation.z,
                                    false, false, attInfo.collision, false, 2, true);
                            })

                            if (attInfo.freeze) {
                                object.freezePosition(true);
                            }

                            /*if (id === mp.game.joaat('music')) {
                                object.setAlpha(0);
                                object.setVisible(false, false);

                                mp.game.invoke('0x651D3228960D08AF', "SE_Script_Placed_Prop_Emitter_Boombox", object.handle);
                                mp.game.audio.setEmitterRadioStation("SE_Script_Placed_Prop_Emitter_Boombox", mp.game.audio.getRadioStationName(0));
                                mp.game.audio.setStaticEmitterEnabled("SE_Script_Placed_Prop_Emitter_Boombox", true);
                            }*/

                            entity.__attachmentObjects[id] = object;
                        }
                    }
                }
                else {
                    methods.debug(`Static Attachments Error: Unknown Attachment Used: ~w~0x${id.toString(16)}`);
                }
            }


        }
        catch (e) {
            methods.error('ATTACH ERROR');
            methods.error(e);
        }
    },

    removeFor: function (entity, id) {
        try {
            if (entity.__attachmentObjects.hasOwnProperty(id)) {
                let obj = entity.__attachmentObjects[id];
                delete entity.__attachmentObjects[id];
                if (mp.objects.exists(obj)) {
                    try {
                        obj.destroy(); // wtf 1.1 crash? (fixed)
                    }
                    catch (e) { }
                }
            }

        }
        catch (e) {
            methods.debug(e);
        }
    },

    initFor: function (entity) {
        try {
            if (entity && entity.handle) {
                for (let attachment of entity.__attachments) {
                    mp.attachmentMngr.addFor(entity, attachment);
                }
            }


        }
        catch (e) {
            methods.debug(e);
        }
    },

    shutdownFor: function (entity) {
        try {
            if (entity && entity.handle) {
                for (let attachment in entity.__attachmentObjects) {
                    mp.attachmentMngr.removeFor(entity, attachment);
                }
            }


        }
        catch (e) {
            methods.debug(e);
        }
    },

    register: function (id, model, boneName, offset, rotation, collision = false, freeze = false) {
        try {
            if (typeof (id) === 'string') {
                id = mp.game.joaat(id);
            }

            if (typeof (model) === 'string') {
                model = mp.game.joaat(model);
            }

            if (!this.attachments.hasOwnProperty(id)) {
                this.attachments[id] =
                {
                    id: id,
                    model: model,
                    offset: offset,
                    rotation: rotation,
                    boneName: boneName,
                    collision: collision,
                    freeze: freeze
                };
                /*if(mp.game.streaming.isModelInCdimage(model))
                {
                    this.attachments[id] =
                        {
                            id: id,
                            model: model,
                            offset: offset,
                            rotation: rotation,
                            boneName: boneName
                        };
                }
                else
                {
                    methods.debug(`Static Attachments Error: Invalid Model (0x${model.toString(16)})`);
                }*/
            }
            else {
                methods.debug("Static Attachments Error: Duplicate Entry");
            }
        }
        catch (e) {
            methods.debug(e);
        }
    },

    unregister: function (id) {
        try {
            if (typeof (id) === 'string') {
                id = mp.game.joaat(id);
            }

            if (this.attachments.hasOwnProperty(id)) {
                this.attachments[id] = undefined;
            }
        }
        catch (e) {
            methods.debug(e);
        }
    },

    addLocal: function (attachmentName) {
        try {
            if (typeof (attachmentName) === 'string') {
                attachmentName = mp.game.joaat(attachmentName);
            }

            let entity = mp.players.local;

            if (!entity.__attachments || entity.__attachments.indexOf(attachmentName) === -1) {
                methods.callRemote("staticAttachments.Add", attachmentName.toString(36));
            }
        }
        catch (e) {
            methods.debug(e);
        }
    },

    removeLocal: function (attachmentName) {
        try {
            if (typeof (attachmentName) === 'string') {
                attachmentName = mp.game.joaat(attachmentName);
            }

            let entity = mp.players.local;

            if (entity.__attachments && entity.__attachments.indexOf(attachmentName) !== -1) {
                methods.callRemote("staticAttachments.Remove", attachmentName.toString(36));
            }
        }
        catch (e) {
            methods.debug(e);
        }
    },

    getAttachments: function () {
        return Object.assign({}, this.attachments);
    }
};

new_events.add("entityStreamIn", (entity) => {
    try {
        if (entity && entity.handle) {
            mp.attachmentMngr.shutdownFor(entity);

            if (entity.__attachments) {
                mp.attachmentMngr.initFor(entity);
            }
        }


    }
    catch (e) {
        methods.debug(e);
    }
});

new_events.add("entityStreamOut", (entity) => {
    try {
        if (entity && entity.handle) {
            if (entity.__attachmentObjects) {
                mp.attachmentMngr.shutdownFor(entity);
            }
        }


    }
    catch (e) {
        methods.debug(e);
    }
});

new_events.add("playerQuit", (entity, exitType, reason) => {
    try {
        if (entity.__attachmentObjects) {
            mp.attachmentMngr.shutdownFor(entity);
        }
    }
    catch (e) {
        methods.debug(e);
    }
});

mp.events.addDataHandler("attachmentsData", (entity, data) => {
    try {
        if (entity && entity.handle) {
            let newAttachments = (data.length > 0) ? data.split('|').map(att => parseInt(att, 36)) : [];

            if (entity.handle !== 0) {
                let oldAttachments = entity.__attachments;

                if (!oldAttachments) {
                    oldAttachments = [];
                    entity.__attachmentObjects = {};
                }

                // process outdated first
                for (let attachment of oldAttachments) {
                    if (newAttachments.indexOf(attachment) === -1) {
                        mp.attachmentMngr.removeFor(entity, attachment);
                    }
                }

                // then new attachments
                for (let attachment of newAttachments) {
                    if (oldAttachments.indexOf(attachment) === -1) {
                        mp.attachmentMngr.addFor(entity, attachment);
                    }
                }
            }
            else {
                entity.__attachmentObjects = {};
            }

            entity.__attachments = newAttachments;
        }

    }
    catch (e) {
        methods.debug(e);
    }
});

attach.init = function () {
    try {
        mp.players.forEach(_player => {
            try {
                if (mp.player.exists(_player)) {
                    let data = _player.getVariable("attachmentsData");

                    if (data && data.length > 0) {
                        let atts = data.split('|').map(att => parseInt(att, 36));
                        _player.__attachments = atts;
                        _player.__attachmentObjects = {};
                    }
                }

            }
            catch (e) {
                methods.debug(e);
            }
        });

        timer.createInterval('attach.timer', attach.timer, 5000);
        attachItems.registerAttaches();
    }
    catch (e) {
        methods.debug(e);
    }
};

attach.timer = function () {
    try {
        mp.vehicles.forEach(_vehicle => {
            try {
                if (_vehicle.__attachmentObjects && mp.vehicles.exists(_vehicle)) {
                    for (let attachment in _vehicle.__attachmentObjects) {
                        _vehicle.__attachmentObjects[attachment].position = new mp.Vector3(_vehicle.position.x, _vehicle.position.y, -90);
                    }
                }
            }
            catch (e) {
                methods.debug(e);
            }
        });
    }
    catch (e) {
        methods.debug(e);
    }
};
attach.addWeapon = function () {
    let weapons =
        [
            ["Pistol", 'weapon_pistol', 0],
            ["VintagePistol", 'weapon_vintagepistol', 0],
            ["APPistol", 'weapon_appistol', 0],
            ["CombatPistol", 'weapon_combatpistol', 0],
            ["Revolver", 'weapon_revolver', 0],
            ["SNSPistol", 'weapon_snspistol', 0],
            ["HeavyPistol", 'weapon_heavypistol', 0],
            ["Pistol50", 'weapon_pistol50', 0],

            ["CombatPDW", 'weapon_combatpdw', 1],
            ["MicroSMG", 'weapon_microsmg', 1],
            ["SMG", 'weapon_smg', 1],
            ["MiniSMG", 'weapon_minismg', 1],
            ["MachinePistol", 'weapon_machinepistol', 1],
            ["AssaultSMG", 'weapon_smg', 1],

            ["PumpShotgun", 'weapon_pumpshotgun', 2],
            ["HeavyShotgun", 'weapon_heavyshotgun', 2],
            ["AssaultShotgun", 'weapon_assaultshotgun', 2],
            ["BullpupShotgun", 'weapon_bullpupshotgun', 2],

            ["CarbineRifle", 'weapon_carbinerifle', 3],
            ["AssaultRifle", 'weapon_assaultrifle', 3],
            ["SpecialCarbine", 'weapon_specialcarbine', 3],
            ["MarksmanRifle", 'weapon_marksmanrifle', 3],
            ["CompactRifle", "weapon_compactrifle", 3],
        ];

    let offset = new mp.Vector3(0.0, 0.0, 0.0);
    let rotation = new mp.Vector3(0.0, 0.0, 0.0);

    for (let weap of weapons) {
        let bone = 0;

        switch (weap[2]) {
            case 0:
                bone = 51826; //"SKEL_R_Thigh";
                offset = new mp.Vector3(0.02, 0.06, 0.1);
                rotation = new mp.Vector3(-100.0, 0.0, 0.0);
                break;

            case 1:
                bone = 58271; //"SKEL_L_Thigh";
                offset = new mp.Vector3(0.08, 0.03, -0.1);
                rotation = new mp.Vector3(-80.77, 0.0, 0.0);
                break;

            case 2:
                bone = 24818; //"SKEL_Spine3";
                offset = new mp.Vector3(-0.1, -0.15, 0.11);
                rotation = new mp.Vector3(-180.0, 0.0, 0.0);
                break;

            case 3:
                bone = 24818; //"SKEL_Spine3";
                offset = new mp.Vector3(-0.1, -0.15, -0.13);
                rotation = new mp.Vector3(0.0, 0.0, 3.5);
                break;
        }

        // attachmentMngr.register(weap[0], weap[1], bone, offset, rotation);
        // attachmentMngr.register(weap[1], weap[1], bone, offset, rotation);
        let model = weap[0];
        // attachmentMngr.register(model.toUpperCase(), mp.game.joaat("WEAPON_"+model.toUpperCase()), bone, offset, rotation);
        mp.attachmentMngr.register(model.toUpperCase(), mp.game.joaat(weap[1]), bone, offset, rotation);
    }
}
attach.addWeapon()

function waitEntity(entity) {
    return new Promise(resolve => {
        let wait = setInterval(() => {
            if (mp.game.entity.isAnEntity(entity.handle)) {
                clearInterval(wait);
                resolve();
            }
        }, 1);
    });
}

export default attach;