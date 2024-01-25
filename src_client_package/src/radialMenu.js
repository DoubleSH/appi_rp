import user from "./user";
import methods from "./modules/methods";
import ui from "./modules/ui";
import enums from "./enums";
import drone from "./manager/drone";
import mail from "./jobs/mail";
import photo from "./jobs/photo";
import tree from "./jobs/tree";
import builder from "./jobs/builder";
import UIMenu from './modules/menu';
import vehicles from "./property/vehicles";
import inventory from './inventory';
import menuList from './menuList'
import stocks from './property/stocks';
/*        else if (item.doName === 'animOtherItem')
            menuList.showAnimationOtherListMenu();
        else if (item.doName === 'animSyncItem')
            menuList.showAnimationSyncListMenu();
        else if (item.doName === 'animActionItem')
            menuList.showAnimationListMenu('Анимации действий', enums.animActions);
        else if (item.doName === 'animDanceItem')
            menuList.showAnimationListMenu('Танцы', enums.animDance);
        else if (item.doName === 'animNegativeItem')
            menuList.showAnimationListMenu('Негативные эмоции', enums.animNegative);
        else if (item.doName === 'animPositiveItem')
            menuList.showAnimationListMenu('Положительные эмоции', enums.animPositive);
        else if (item.doName === 'animPoseItem')
            menuList.showAnimationListMenu('Позирующие анимации', enums.animPose);
*/

let radialMenu = {};
let entityId = 0;
let vehicleTarget = false;
let events = false;
radialMenu.ShowMeVehMenu = function (data) {
    mp.gui.cursor.show(false, true);
    ui.DisableMouseControl = true;
    try {
        let userMenu = [
            {
                id: 'showAnimationTypeListMenu', title: 'Анимации', items: [
                    {
                        id: 'anim1', title: 'Действия', items: []
                    },
                    {
                        id: 'anim2', title: 'Позирующие', items: []
                    },
                    {
                        id: 'anim3', title: 'Положительные', items: []
                    },
                    {
                        id: 'anim4', title: 'Негативные', items: []
                    }, {
                        id: 'anim5', title: 'Танцы', items: []
                    }, {
                        id: 'anim6', title: 'Взаимодействие', items: []
                    }, {
                        id: 'anim7', title: 'Остальные', items: []
                    },
                    { id: 'animStop', title: 'Остановить анимацию' },
                ]
            },
            {
                id: 'showPlayerDoсMenu', title: 'Мои документы', items: [
                    { id: 'card_id', title: 'Card ID' },
                    { id: 'work_lic', title: 'Work ID' },
                    {
                        id: 'showLic', title: 'Лицензии', items: [
                            { id: 'a_lic', title: 'Категория `А`' },
                            { id: 'b_lic', title: 'Категория `B`' },
                            { id: 'c_lic', title: 'Категория `C`' },
                            { id: 'air_lic', title: 'На воздушный транспорт' },
                            { id: 'ship_lic', title: 'На водный транспорт' },
                            { id: 'gun_lic', title: 'На оружие' },
                            { id: 'taxi_lic', title: 'На перевозку пассажиров' },
                            { id: 'null', title: 'null' },
                            { id: 'law_lic', title: 'На адвоката' },
                            { id: 'biz_lic', title: 'На предпринемательство' },
                            { id: 'fish_lic', title: 'На рыбалку' },
                            { id: 'marg_lic', title: 'На марихуанну' },]
                    },
                    { id: 'med_lic', title: 'Мед.карточка' },
                ]
            },];
        let data = userMenu;
        enums.animActions.forEach(function (item, i, arr) {
            userMenu[0].items[0].items.push({ id: item[1] + '||' + item[2] + '||' + item[3], title: '' + item[0] })
        });
        enums.animPose.forEach(function (item, i, arr) {
            userMenu[0].items[1].items.push({ id: item[1] + '||' + item[2] + '||' + item[3], title: '' + item[0] })
        });
        enums.animPositive.forEach(function (item, i, arr) {
            userMenu[0].items[2].items.push({ id: item[1] + '||' + item[2] + '||' + item[3], title: '' + item[0] })
        });
        enums.animNegative.forEach(function (item, i, arr) {
            userMenu[0].items[3].items.push({ id: item[1] + '||' + item[2] + '||' + item[3], title: '' + item[0] })
        });
        enums.animDance.forEach(function (item, i, arr) {
            userMenu[0].items[4].items.push({ id: item[1] + '||' + item[2] + '||' + item[3], title: '' + item[0] })
        });

        enums.animRemain.forEach(function (item, i, arr) {
            userMenu[0].items[6].items.push({ id: item[1] + '||' + item[2] + '||' + item[3], title: '' + item[0] })
        });

        let sendData = {
            type: 'updateData',
            choiceData: data,
            playerName: "",
            playerId: ""
        };
        ui.callCef('radial', JSON.stringify(sendData));
        ui.callCef('radial', '{"type": "show"}');
        entityId = mp.players.local.remoteId;
    }
    catch (e) {
        methods.debug(e);
    }
};
radialMenu.ShowMeMenu = function () {
    menuList.isShowPlayerMenu = true
    mp.gui.cursor.show(false, true);
    ui.DisableMouseControl = true;
    try {
        let userMenu = [
            {
                id: 'showAnimationTypeListMenu', title: 'Анимации', items: [
                    {
                        id: 'anim1', title: 'Действия', items: []
                    },
                    {
                        id: 'anim2', title: 'Позирующие', items: []
                    },
                    {
                        id: 'anim3', title: 'Положительные', items: []
                    },
                    {
                        id: 'anim4', title: 'Негативные', items: []
                    }, {
                        id: 'anim5', title: 'Танцы', items: []
                    }, {
                        id: 'anim6', title: 'Взаимодействие', items: []
                    }, {
                        id: 'anim7', title: 'Остальные', items: []
                    },
                    { id: 'animStop', title: 'Остановить анимацию' },
                ]
            },
            {
                id: 'showPlayerDoсMenu', title: 'Мои документы', items: [
                    { id: 'card_id', title: 'Card ID' },
                    { id: 'work_lic', title: 'Work ID' },
                    {
                        id: 'showLic', title: 'Лицензии', items: [
                            { id: 'a_lic', title: 'Категории `А`' },
                            { id: 'b_lic', title: 'Категории `B`' },
                            { id: 'c_lic', title: 'Категории `C`' },
                            { id: 'air_lic', title: 'На воздушный транспорт' },
                            { id: 'ship_lic', title: 'На водный транспорт' },
                            { id: 'gun_lic', title: 'На оружие' },
                            { id: 'taxi_lic', title: 'На перевозку пассажиров' },
                            { id: 'law_lic', title: 'На адвоката' },
                            { id: 'biz_lic', title: 'На предпринемательство' },
                            { id: 'fish_lic', title: 'На рыбалку' },
                            { id: 'marg_lic', title: 'На марихуанну' },]
                    },
                    { id: 'med_lic', title: 'Мед.карточка' },
                ]
            },];
        let data = userMenu;
        enums.animActions.forEach(function (item, i, arr) {
            userMenu[0].items[0].items.push({ id: item[1] + '||' + item[2] + '||' + item[3], title: '' + item[0] })
        });
        enums.animPose.forEach(function (item, i, arr) {
            userMenu[0].items[1].items.push({ id: item[1] + '||' + item[2] + '||' + item[3], title: '' + item[0] })
        });
        enums.animPositive.forEach(function (item, i, arr) {
            userMenu[0].items[2].items.push({ id: item[1] + '||' + item[2] + '||' + item[3], title: '' + item[0] })
        });
        enums.animNegative.forEach(function (item, i, arr) {
            userMenu[0].items[3].items.push({ id: item[1] + '||' + item[2] + '||' + item[3], title: '' + item[0] })
        });
        enums.animDance.forEach(function (item, i, arr) {
            userMenu[0].items[4].items.push({ id: item[1] + '||' + item[2] + '||' + item[3], title: '' + item[0] })
        });

        enums.animRemain.forEach(function (item, i, arr) {
            userMenu[0].items[6].items.push({ id: item[1] + '||' + item[2] + '||' + item[3], title: '' + item[0] })
        });

        let sendData = {
            type: 'updateData',
            choiceData: data,
            playerName: "",
            playerId: ""
        };
        entityId = mp.players.local.remoteId;
        vehicleTarget = false
        ui.callCef('radial', JSON.stringify(sendData));
        ui.callCef('radial', '{"type": "show"}');

    }
    catch (e) {
        methods.debug(e);
    }
};
radialMenu.showIdMenu = function (dating, veh = true) {
    try {
        menuList.isShowPlayerMenu = true
        mp.gui.cursor.show(false, true);
        ui.DisableMouseControl = true;
        let userMenu = [];
        let data = userMenu;
        if (veh) {
            mp.players.forEach(p => {
                if (methods.distanceToPos(mp.players.local.position, p.position) < 10 && p.vehicle && p.vehicle.remoteId === methods.parseInt(dating[1])) {
                    data.push({ id: `${dating[0]}||${dating[1]}||${p.remoteId}`, title: `ID: ${p.remoteId}` },)
                }
            })
        } else if (!veh) {
            mp.players.forEach(p => {
                if (methods.distanceToPos(mp.players.local.position, p.position) < 5 && p.handle) {
                    data.push({ id: `${dating[0]}||${p.remoteId}`, title: `ID: ${p.remoteId}` },)
                }
            })
        }
        if (data.length <= 0) {
            user.showCustomNotify(`Никого нет!`)
            return
        }
        let sendData = {
            type: 'updateData',
            choiceData: data,
            playerName: "Рядом",
            playerId: ""
        };
        events = true
        ui.callCef('radial', JSON.stringify(sendData));
        ui.callCef('radial', '{"type": "show"}');

    }
    catch (e) {
        methods.debug(e);
    }
};
radialMenu.showUserMenu = function (entity) {
    try {
        let target = mp.players.atRemoteId(entity.remoteId);

        if (!mp.players.exists(target)) {
            mp.game.ui.notifications.show("Ошибка взаимодействия с игроком");
            return;
        }
        menuList.isShowPlayerMenu = true;
        mp.gui.cursor.show(false, true);
        ui.DisableMouseControl = true;
        let userMenu = [];
        let data = userMenu;
        if (user.isGov() || user.isSheriff() || user.isEms() || user.isSapd() || user.isFib() || user.isUsmc() || user.isNews() || user.isCartel()) {
            data.push({ id: 'gos_lic', title: 'Удостоверение' },)
        }

        if (user.isPolice() || user.isGov() || user.isCartel()) {
            if(target.getVariable("isCuff")) {
                data.push({ id: 'unCuffById', title: 'Снять наручники' })
            } else {
                data.push({ id: 'cuffItemById', title: 'Надеть наручники' })
            }
        }

        if(target.getVariable("isTie")) {
            data.push({ id: 'unTieById', title: 'Снять стяжки' })
        } else {
            data.push({ id: 'tieById', title: 'Надеть стяжки' })
        }

        
        data.push({ id: 'giveMoney', title: 'Дать деньги' },
            { id: 'dating', title: 'Пожать руку' },
            { id: 'inCarById', title: 'Запихнуть в машину' },
            { id: 'knockById', title: 'Вырубить' },
            { id: 'grabById', title: 'Ограбить' },
            //{ id: 'inBootId', title: 'Запихнуть в багажник' },
            { id: 'taskFollowById', title: 'Вести за собой' },
            { id: 'taskRemoveMaskById', title: 'Сорвать маску с гражданина' },
            {
                id: 'showPlayerDoсMenu', title: 'Документы', items: [
                    { id: 'card_id', title: 'Card ID' },
                    { id: 'work_lic', title: 'Work ID' },
                    {
                        id: 'showLic', title: 'Лицензии', items: [
                            { id: 'a_lic', title: 'Лицензия категории А' },
                            { id: 'b_lic', title: 'Лицензия категории B' },
                            { id: 'c_lic', title: 'Лицензия категории C' },
                            { id: 'air_lic', title: 'На воздушный транспорт' },
                            { id: 'ship_lic', title: 'На водный транспорт' },
                            { id: 'gun_lic', title: 'На оружие' },
                            { id: 'taxi_lic', title: 'На перевозку пассажиров' },
                            { id: 'law_lic', title: 'Лицензия адвоката' },
                            { id: 'biz_lic', title: 'На предпринемательство' },
                            { id: 'fish_lic', title: 'На рыбалку' },
                            { id: 'marg_lic', title: 'На марихуанну' }]
                    },
                    { id: 'med_lic', title: 'Мед.карточка' }]
            },)
        if (user.isPolice()) {
            data.push({ id: 'getInvById', title: 'Изъять конфискат' },
                { id: 'getInvById2', title: 'Обыскать' },
                { id: 'getPassById', title: 'Установить личность' })
        }
        let sendData = {
            type: 'updateData',
            choiceData: data,
            playerName: "Гражданин",
            playerId: "" + entity.remoteId
        };
        entityId = entity.remoteId;
        vehicleTarget = false
        ui.callCef('radial', JSON.stringify(sendData));
        ui.callCef('radial', '{"type": "show"}');

    }
    catch (e) {
        methods.debug(e);
    }
};

radialMenu.showVehMenu = async function (entity, onlyLock = false) {

    try {
        let vehicle = mp.vehicles.atRemoteId(entity.remoteId);
        if (!mp.vehicles.exists(vehicle)) {
            mp.game.ui.notifications.show("Ошибка взаимодействия с транспортом");
            return;
        }
        menuList.isShowPlayerMenu = true
        mp.gui.cursor.show(false, true);
        ui.DisableMouseControl = true;
        let vInfo = methods.getVehicleInfo(vehicle.model);
        let vehMenu = [
            { id: 'openLock', title: 'Открыть/закрыть Т/С' },
            { id: 'flip', title: 'Перевернуть Т/С' },
            //{ id: 'outBootId', title: 'Вытащить из багажника' },
            //{ id: 'sapdVehicle', title: 'Погрузить на эвакуатор' },
            { id: 'eject', title: 'Выкинуть из Т/С' },
        ];
        let numberPlate = vehicle.getNumberPlateText();
        let data = vehMenu;
        let data2 = {
            id: 'doors', title: 'Двери', items: [
                { id: 'openInv', title: 'Открыть багажник' },
                { id: 'close', title: 'Закрыть багажник' },
                { id: 'openC', title: 'Открыть капот' },
                { id: 'closeC', title: 'Закрыть капот' }]
        }
        if (!onlyLock) {
            if (vInfo.stock > 0) {
                data.push(data2);
            }
            if (vehicle.getVariable('fraction_id') === 7 && user.isNews()) {
                data.push({ id: 'takeCam', title: 'Взять камеру' },
                    { id: 'putCam', title: 'Положить камеру' },
                    { id: 'takeMic', title: 'Взять микрофон' },
                    { id: 'test', title: 'test' },
                    { id: 'putMic', title: 'Положить микрофон' });
            }
            // if (vehicle.getVariable('fraction_id') === 2 && user.isSapd() && vInfo.display_name === 'Riot') {
            //     data.push({ id: 'drone', title: 'Войти в режим дрона' },);
            // }
            // if (vehicle.getVariable('fraction_id') === 5 && user.isSheriff() && vInfo.display_name === 'Insurgent2') {
            //     data.push({ id: 'drone', title: 'Войти в режим дрона' },);
            // }
            // if (vehicle.getVariable('fraction_id') === 3 && user.isFib() && vInfo.display_name === 'FBI2') {
            //     data.push({ id: 'drone', title: 'Войти в режим дрона' },);
            // }
            // if (vehicle.getVariable('fraction_id') === 7 && user.isNews() && (vInfo.display_name === 'Rumpo' || vInfo.display_name === 'Nspeedo')) {
            //     data.push({ id: 'drone', title: 'Войти в режим дрона' },);
            // }

            if (user.getCache('job') == vehicle.getVariable('jobId')) {
                switch (vehicle.getVariable('jobId')) {
                    case 1:
                        data.push({
                            id: 'instrument', title: 'Инструменты', items: [
                                { id: 'tree:take0', title: 'Инструменты (Красный маркер)' },
                                { id: 'tree:take1', title: 'Инструменты (Зеленый маркер)' },
                                { id: 'tree:take2', title: 'Инструменты (Синий маркер)' },]
                        });
                        break;
                    case 2:
                        data.push({
                            id: 'instrument', title: 'Инструменты', items: [
                                { id: 'builder:take0', title: 'Инструменты (Красный маркер)' },
                                { id: 'builder:take1', title: 'Инструменты (Зеленый маркер)' },
                                { id: 'builder:take2', title: 'Инструменты (Синий маркер)' },]
                        });
                        break;
                    case 3:
                        data.push({ id: 'photo:ask', title: 'Напомнить задание' },);
                        break;
                    case 4:
                        data.push({ id: 'mail:take', title: 'Взять почту из транспорта' },);
                        break;
                }
            }


            if (mp.players.local.dimension > enums.offsets.stock) {
                let stockId = mp.players.local.dimension - enums.offsets.stock;
                let stockData = await stocks.getData(stockId);
                if (stockData.get('upgrade_n')) {
                    data.push({ id: 'removeNumber', title: 'Снять номера' },);
                }
            }
        }
        let sendData = {
            type: 'updateData',
            choiceData: data,
            playerName: "" + vInfo.display_name,
            playerId: "" + numberPlate
        };
        vehicleTarget = true;
        entityId = entity.remoteId;
        ui.callCef('radial', JSON.stringify(sendData));
        ui.callCef('radial', '{"type": "show"}');

    }
    catch (e) {
        methods.debug(e);
    }
};

radialMenu.closeMenu = function () {
    try {
        mp.gui.cursor.show(false, false);
        ui.DisableMouseControl = false;
        ui.callCef('radial', '{"type": "hide"}');
        menuList.isShowPlayerMenu = false
    }
    catch (e) {
        methods.debug(e);
    }
};

mp.events.add('client:radialMenu:close', function () {
    try {
        radialMenu.closeMenu();
    }
    catch (e) {
        methods.debug(e);
    }
});
mp.events.add('client:radialMenu:item', async (data) => {
    data = data.toString();
    try {
        radialMenu.closeMenu();
        if (events) {
            let target = mp.players.atRemoteId(entityId);

            entityId = null;
            vehicleTarget = false;
            events = false;

            data = data.split('||');
            if (data[0].toString() == 'server:vehicle:ejectByIdOut') {
                methods.callRemote(data[0].toString(), methods.parseInt(data[1]), methods.parseInt(data[2]));
            }
            else {
                user.showCustomNotify(`Ошибка 1092, отправьте скриншот разработчику`)
                user.showCustomNotify(`Data ${data}, Target: ${target.remoteId}`)
            }

        }
        else if (vehicleTarget) {

            let vehicle = mp.vehicles.atRemoteId(entityId);
            entityId = null;
            vehicleTarget = false
            if (data == 'openLock') {
                methods.callRemote('server:vehicle:lockStatus');

            }
            else if (data == 'openInv') {
                if (ui.isGreenZone() && !user.isPolice()) {
                    mp.game.ui.notifications.show("В зелёной зоне это действие запрещено");
                    return;
                }

                if (mp.players.local.vehicle) {
                    mp.game.ui.notifications.show("Это действие не доступно");
                    return;
                }

                if (methods.distanceToPos(vehicle.position, mp.players.local.position) > 5) {
                    mp.game.ui.notifications.show("Вы слишком далеко");
                    return;
                }

                inventory.getItemList(inventory.types.Vehicle, mp.game.joaat(vehicles.getNumberPlate(vehicle).trim()));
                vehicles.setTrunkStateById(vehicle.remoteId, true);
            }
            else if (data == 'close') {
                vehicles.setTrunkStateById(vehicle.remoteId, false);
            }

            else if (data == 'openC') {
                vehicles.setHoodStateById(vehicle.remoteId, true);
            }

            else if (data == 'closeC') {
                vehicles.setHoodStateById(vehicle.remoteId, false);
            }


            else if (data == 'eject') {
                let data = ['server:vehicle:ejectByIdOut', vehicle.remoteId]
                radialMenu.showIdMenu(data, true)
            }

            else if (data == 'takeCam') {
                mp.attachmentMngr.addLocal('cam');
                user.playAnimation('missfinale_c2mcs_1', 'fin_c2_mcs_1_camman', 49);
            }

            else if (data == 'sapdVehicle') {
                methods.callRemote('server:sapd:attachVehicle', vehicle.remoteId);
            }
            else if (data == 'outBootId') {
                methods.callRemote('server:user:outBootId', vehicle.remoteId);
            }
            else if (data == 'putCam') {
                mp.attachmentMngr.removeLocal('cam');
                user.stopAllAnimation();
            }
            else if (data == 'takeMic') {
                mp.attachmentMngr.addLocal('mic');
            }
            else if (data == 'putMic') {
                mp.attachmentMngr.removeLocal('mic');
                user.stopAllAnimation();
            }
            else if (data == 'drone') {
                drone.enterLspd(vehicle.remoteId);
            }
            else if (data == 'drone2') {
                drone.enterSmall(vehicle.remoteId);
            }
            else if (data == 'tree:take0') {
                tree.take(0);
            }
            else if (data == 'tree:take1') {
                tree.take(1);
            }

            else if (data == 'tree:take2') {
                tree.take(2);
            }
            else if (data == 'builder:take0') {
                builder.take(0);
            }
            else if (data == 'builder:take1') {
                builder.take(1);
            }
            else if (data == 'builder:take2') {
                builder.take(2);
            }

            else if (data == 'photo:ask') {
                photo.ask();
            }
            else if (data == 'mail:take') {
                mail.takeMail();
            }
            else if (data == 'removeNumber') {
                methods.callRemote('server:vehicle:removeNumber', methods.parseInt(vehicle.remoteId));
            }
            else if (data == 'flip') {
                if (!mp.players.local.isInAnyVehicle(true))
                    methods.callRemote('server:flipNearstVehicle');
            }
            else {
                user.showCustomNotify(`Ошибка 1095, отправьте скриншот разработчику`)
                user.showCustomNotify(`Data ${data}, Target: ${target.remoteId}`)
            }

        } else {
            let target = mp.players.atRemoteId(entityId);

            entityId = null;
            vehicleTarget = false;

            enums.animActions.forEach(function (item, i, arr) {
                if (mp.players.local.isInAir() ||
                    mp.players.local.isReloading() ||
                    mp.players.local.isRagdoll() ||
                    mp.players.local.isFalling() ||
                    mp.players.local.isShooting() ||
                    //remotePlayer.isSprinting() ||
                    mp.players.local.isGettingUp() ||
                    mp.players.local.vehicle ||
                    mp.players.local.getHealth() <= 0
                ) {
                    mp.game.ui.notifications.show(`~b~Данное действие сейчас не доступно`);
                    return;
                }
                if (data == item[1] + '||' + item[2] + '||' + item[3]) {
                    let animation = data.split('||');
                    user.playAnimation(animation[0], animation[1], animation[2]);
                }
            });
            enums.animPose.forEach(function (item, i, arr) {
                if (mp.players.local.isInAir() ||
                    mp.players.local.isReloading() ||
                    mp.players.local.isRagdoll() ||
                    mp.players.local.isFalling() ||
                    mp.players.local.isShooting() ||
                    //remotePlayer.isSprinting() ||
                    mp.players.local.isGettingUp() ||
                    mp.players.local.vehicle ||
                    mp.players.local.getHealth() <= 0
                ) {
                    mp.game.ui.notifications.show(`~b~Данное действие сейчас не доступно`);
                }
                if (data == item[1] + '||' + item[2] + '||' + item[3]) {
                    let animation = data.split('||');
                    user.playAnimation(animation[0], animation[1], animation[2]);
                }
            });
            enums.animPositive.forEach(function (item, i, arr) {
                if (mp.players.local.isInAir() ||
                    mp.players.local.isReloading() ||
                    mp.players.local.isRagdoll() ||
                    mp.players.local.isFalling() ||
                    mp.players.local.isShooting() ||
                    //remotePlayer.isSprinting() ||
                    mp.players.local.isGettingUp() ||
                    mp.players.local.vehicle ||
                    mp.players.local.getHealth() <= 0
                ) {
                    mp.game.ui.notifications.show(`~b~Данное действие сейчас не доступно`);
                }
                if (data == item[1] + '||' + item[2] + '||' + item[3]) {

                    let animation = data.split('||');
                    user.playAnimation(animation[0], animation[1], animation[2]);

                }
            });
            enums.animNegative.forEach(function (item, i, arr) {
                if (mp.players.local.isInAir() ||
                    mp.players.local.isReloading() ||
                    mp.players.local.isRagdoll() ||
                    mp.players.local.isFalling() ||
                    mp.players.local.isShooting() ||
                    //remotePlayer.isSprinting() ||
                    mp.players.local.isGettingUp() ||
                    mp.players.local.vehicle ||
                    mp.players.local.getHealth() <= 0
                ) {
                    mp.game.ui.notifications.show(`~b~Данное действие сейчас не доступно`);
                }
                if (data == item[1] + '||' + item[2] + '||' + item[3]) {

                    let animation = data.split('||');
                    user.playAnimation(animation[0], animation[1], animation[2]);
                }
            });
            enums.animDance.forEach(function (item, i, arr) {
                if (mp.players.local.isInAir() ||
                    mp.players.local.isReloading() ||
                    mp.players.local.isRagdoll() ||
                    mp.players.local.isFalling() ||
                    mp.players.local.isShooting() ||
                    //remotePlayer.isSprinting() ||
                    mp.players.local.isGettingUp() ||
                    mp.players.local.vehicle ||
                    mp.players.local.getHealth() <= 0
                ) {
                    mp.game.ui.notifications.show(`~b~Данное действие сейчас не доступно`);
                }
                if (data == item[1] + '||' + item[2] + '||' + item[3]) {
                    let animation = data.split('||');
                    user.playAnimation(animation[0], animation[1], animation[2]);
                }
            });

            enums.animRemain.forEach(function (item, i, arr) {
                if (mp.players.local.isInAir() ||
                    mp.players.local.isReloading() ||
                    mp.players.local.isRagdoll() ||
                    mp.players.local.isFalling() ||
                    mp.players.local.isShooting() ||
                    //remotePlayer.isSprinting() ||
                    mp.players.local.isGettingUp() ||
                    mp.players.local.vehicle ||
                    mp.players.local.getHealth() <= 0
                ) {
                    mp.game.ui.notifications.show(`~b~Данное действие сейчас не доступно`);
                }
                if (data == item[1] + '||' + item[2] + '||' + item[3]) {
                    let animation = data.split('||');
                    user.playAnimation(animation[0], animation[1], animation[2]);
                }
            });
            if (data == 'giveMoney') {
                let money = methods.parseInt(await UIMenu.Menu.GetUserInput("Сумма", "", 9));
                if (money <= 0) {
                    mp.game.ui.notifications.show("Нельзя передавать меньше 0$");
                    return;
                }
                methods.callRemote('server:user:giveMoneyToPlayerId', target.remoteId, money);
            }
            else if (data == 'dating') {
                let rpName = user.getCache('name').split(' ');
                let name = await UIMenu.Menu.GetUserInput("Как вы себя представите?", rpName[0], 30);
                if (name == '') return;
                name = name.replace(/[^a-zA-Z\s]/ig, '');
                if (name.trim() == '') {
                    mp.game.ui.notifications.show("~r~Доступны только английские буквы");
                    return;
                }
                methods.callRemote('server:user:askDatingToPlayerId', target.remoteId, name);
            }
            else if (data == 'gos_lic') {
                methods.callRemote('server:user:showLicGos', target.remoteId);
            }
            else if (data == 'card_id') {
                methods.callRemote('server:user:showLic', data, target.remoteId);
            }
            else if (data == 'work_lic') {
                methods.callRemote('server:user:showLic', data, target.remoteId);
            }
            else if (data == 'med_lic') {
                methods.callRemote('server:user:showLic', data, target.remoteId);
            }
            else if (data == 'a_lic') {
                methods.callRemote('server:user:showLic', data, target.remoteId);
            }
            else if (data == 'b_lic') {
                methods.callRemote('server:user:showLic', data, target.remoteId);
            }
            else if (data == 'c_lic') {
                methods.callRemote('server:user:showLic', data, target.remoteId);
            }
            else if (data == 'air_lic') {
                methods.callRemote('server:user:showLic', data, target.remoteId);
            }
            else if (data == 'ship_lic') {
                methods.callRemote('server:user:showLic', data, target.remoteId);
            }
            else if (data == 'gun_lic') {
                methods.callRemote('server:user:showLic', data, target.remoteId);
            }
            else if (data == 'taxi_lic') {
                methods.callRemote('server:user:showLic', data, target.remoteId);
            }
            else if (data == 'law_lic') {
                methods.callRemote('server:user:showLic', data, target.remoteId);
            }
            else if (data == 'biz_lic') {
                methods.callRemote('server:user:showLic', data, target.remoteId);
            }
            else if (data == 'fish_lic') {
                methods.callRemote('server:user:showLic', data, target.remoteId);
            }
            else if (data == 'marg_lic') {
                methods.callRemote('server:user:showLic', data, target.remoteId);
            }
            else if (data == 'unTieById') {
                methods.callRemote('server:user:unTieById', target.remoteId);
            }
            else if (data == 'tieById') {
                methods.callRemote('server:user:tieById', target.remoteId);
            }
            else if (data == 'cuffItemById') {
                methods.callRemote('server:user:cuffItemById', target.remoteId);
            }
            else if (data == 'unCuffById') {
                methods.callRemote('server:user:unCuffById', target.remoteId);
            }
            else if (data == 'knockById') {
                if (ui.isGreenZone()) {
                    mp.game.ui.notifications.show("~r~В Зелёной зоне данное действие запрещено");
                    return;
                }
                methods.callRemote('server:user:knockById', target.remoteId);
            }
            else if (data == 'grabById') {
                methods.callRemote('server:user:grabById', target.remoteId);
            }
            else if (data == 'inCarById') {
                methods.callRemote('server:user:inCarById', target.remoteId);
            }
            else if (data == 'taskFollowById') {
                methods.callRemote('server:user:taskFollowById', target.remoteId);
            }
            else if (data == 'taskRemoveMaskById') {
                methods.callRemote('server:user:taskRemoveMaskById', target.remoteId);
            }
            else if (data == 'getInvById') {
                methods.callRemote('server:user:getInvById', target.remoteId);
            }
            else if (data == 'getInvById2') {
                methods.callRemote('server:user:getInvById2', target.remoteId);
            }
            else if (data == 'showPlayerStatsMenu') {
                menuList.showPlayerStatsMenu();
            }
            else if (data == 'getPassById') {
                methods.callRemote('server:user:getPassById', target.remoteId);
            }
            else if (data == 'animStop') {
                user.stopAllAnimation();
            }
            else {
            }
        }
    }
    catch (e) {
        user.showCustomNotify(`Ошибка ` + e)
    }
});
export default radialMenu;


