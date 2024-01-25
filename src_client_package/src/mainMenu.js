import methods from './modules/methods';
import ui from "./modules/ui";
import Container from "./modules/data";
import ctos from "./modules/ctos";

import new_events from "./check_events";
import enums from './enums';
import user from './user';
import coffer from './coffer';
import chat from './chat';
import inventory from './inventory';
import menuList from './menuList';
import items from './items';

import weather from "./manager/weather";
import dispatcher from "./manager/dispatcher";
import bind from "./manager/bind";
import jobPoint from "./manager/jobPoint";

import fraction from "./property/fraction";
import timer from "./manager/timer";

import tree from "./jobs/tree";
import builder from "./jobs/builder";
import photo from "./jobs/photo";
import loader from "./jobs/loader";

import stocks from "./property/stocks";
import UIMenu from "./modules/menu";
import quest from "./manager/quest";

let mainMenu = {};

let reportList = [];
let askList = [];

let hidden = true;
let cantClose = false;

mainMenu.show = function() {

    mp.gui.cursor.show(false, true);
    ui.DisableMouseControl = true;
    hidden = false;
    ui.hideHud();
    mp.game.graphics.transitionToBlurred(100);
    methods.blockKeys(true);

    ui.callCef('accmain', '{"type": "show"}');
    try {
        mainMenu.updateInfoGeneral();
        mainMenu.updateInfoHeader();
        mainMenu.updateInfoSettings();
        mainMenu.updateInfoQuest();
        mainMenu.updateInfoReport();
        mainMenu.updateInfoProperty();
    }
    catch (e) {
        methods.debug(e);
    }
};

mainMenu.showOrHide = function() {
    if (!cantClose)
        ui.callCef('accmain', '{"type": "showOrHide"}');
};

mainMenu.hide = function() {
    ui.callCef('accmain', '{"type": "hide"}');

    methods.blockKeys(false);
    mp.gui.cursor.show(false, false);
    ui.DisableMouseControl = false;
    hidden = true;
    ui.showHud();
    mp.game.graphics.transitionFromBlurred(100);

    if (bind.isChange)
        bind.bindNewKey(0);
};

mainMenu.updateInfoSettings = function(tab = 0, keyName = '') {

    try {
        let fontSizeList = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
        let lineSizeList = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
        let bgStateList = ['Выкл', 'Вкл', 'Всегда вкл'];
        let bgOpacity = ["0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];
        let bgOpacity2 = ["0%", "5%", "10%", "15%", "20%", "25%", "30%", "35%", "40%", "45%", "50%", "55%", "60%", "65%", "70%", "75%", "80%", "85%", "90%", "95%", "100%"];
        let timeoutList = ['1s', '3s', '5s', '10s', '15s', '20s', '30s', 'Никогда'];

        let cllist = [];
        let cllistw = [];

        let cllistAnim = [];
        let cllistwAnim = [];

        if (user.getSex() === 1) {
            enums.clopsetFemale.forEach(item => {
                cllist.push(item[0]);
                cllistAnim.push(item[1]);
            })
        }
        else {
            enums.clopsetMale.forEach(item => {
                cllist.push(item[0]);
                cllistAnim.push(item[1]);
            })
        }

        enums.clipsetW.forEach(item => {
            cllistw.push(item[0]);
            cllistwAnim.push(item[1]);
        });

        let clipsetIdx = 0;
        let clipsetwIdx = 0;

        if (user.getCache('clipset') !== '')
            clipsetIdx = cllistAnim.indexOf(user.getCache('clipset'));

        clipsetwIdx = cllistwAnim.indexOf(user.getCache('clipset_w'));

        if (clipsetIdx <= 0)
            clipsetIdx = 0;
        if (clipsetwIdx <= 0)
            clipsetwIdx = 0;

        /*

        {
            name: 'Назначение клавиш',
            desc: 'Для того, чтобы перезанзначить клавишу, нажмите на синюю кнопку, а потом на желаемую клавишу',
            settings: keys
        },
        * */

        let mapSetting = ['Всегда вкл', 'Только на миникарте', 'Только на карте', 'Всегда выкл'];
        let lodSettings = ['Стандартная', 'Средняя', 'Маленькая'];

        let sendData = {
            type: 'updateInfoSettings',
            settingsData: [
                {
                    name: 'Основное',
                    settings: [
                        {type: 2, name: 'Чит-код', params: 'main:promocode', btntext: "Ввести бонус-код"},
                        {type: 1, name: 'Походка', params: 'main:clipset', active: clipsetIdx, listmenu: cllist},
                        {type: 1, name: 'Стиль стрельбы', params: 'main:clipsetw', active: clipsetwIdx, listmenu: cllistw},
                        {type: 0, name: 'Показывать ID игроков', params: 'main:showId', active: user.getCache('s_show_id') ? 1 : 0},
                        {type: 0, name: 'Показывать ID транспорта', params: 'main:showIdVeh', active: user.getCache('s_show_v_id') ? 1 : 0},
                    ]
                },
                {
                    name: 'Интерфейс',
                    settings: [
                        {type: 1, name: 'Индикатор взаимодействия', params: 'ui:indicator', active: user.getCache('s_hud_raycast'), listmenu:['В центре', 'Над объектом #1', 'Над объектом #2', 'Скрыт']},
                        {type: 0, name: 'Курсор в обычном меню', params: 'ui:curs', active: user.getCache('s_hud_cursor') ? 1 : 0},
                        {type: 0, name: 'Уведомления над картой', params: 'ui:notify', active: user.getCache('s_hud_notify') ? 1 : 0},
                        {type: 0, name: 'Авто. перезагрузка интерфейса', params: 'ui:autoreload', active: user.getCache('s_hud_restart') ? 1 : 0},
                        //{type: 2, name: 'Перезапуск интерфейса', params: 'ui:reload', btntext: "Применить"},
                    ]
                },
                {
                    name: 'Худ',
                    settings: [
                        {type: 1, name: 'Вид спидометра', params: 'ui:speedtype', active: user.getCache('s_hud_speed') ? 1 : 0, listmenu: ['Стандартный', 'Цифровой']},
                        {type: 1, name: 'Скорость', params: 'ui:speed', active: user.getCache('s_hud_speed_type') ? 1 : 0, listmenu: ['MP/H', 'KM/H']},
                        {type: 1, name: 'Температура', params: 'ui:temp', active: user.getCache('s_hud_temp') ? 1 : 0, listmenu: ['°C', '°F']},
                        {type: 1, name: 'Прозрачность худа', params: 'ui:bg', active: methods.parseInt(user.getCache('s_hud_bg') * 10), listmenu:["0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"]},
                        {type: 1, name: 'Фон худа', params: 'ui:bgc', active: methods.parseInt(user.getCache('s_hud_bgс')), listmenu:["Время суток", "Белый", "Чёрный"]},
                        {type: 0, name: 'Подсказка с квестами', params: 'ui:quest', active: user.getCache('s_hud_quest') ? 1 : 0},
                        {type: 0, name: 'Подсказка с клавишами', params: 'ui:keys', active: user.getCache('s_hud_keys') ? 1 : 0},
                        {type: 0, name: 'Тень', params: 'ui:shadow', active: user.getCache('s_hud_shadow') ? 1 : 0},
                        {type: 0, name: 'Анимированный лого', params: 'ui:logo', active: user.getCache('s_hud_logo') ? 1 : 0},
                        {type: 0, name: 'Показывать часы', params: 'ui:hide:watch', active: ui.isShowPosition('watch') ? 1 : 0},
                        {type: 0, name: 'Показывать GPS', params: 'ui:hide:gps', active: ui.isShowPosition('gps') ? 1 : 0},
                        {type: 0, name: 'Показывать жажду', params: 'ui:hide:player-needs', active: ui.isShowPosition('player-needs') ? 1 : 0},
                        {type: 0, name: 'Показывать финансы', params: 'ui:hide:player-money', active: ui.isShowPosition('player-money') ? 1 : 0},
                        {type: 0, name: 'Показывать топливо', params: 'ui:hide:car-fuel', active: ui.isShowPosition('car-fuel') ? 1 : 0},
                        {type: 0, name: 'Показывать статус транспорта', params: 'ui:hide:car-elements', active: ui.isShowPosition('car-elements') ? 1 : 0},
                        {type: 2, name: 'Позиция элементов интерфейса', params: 'ui:edit', btntext: "Применить"},
                        {type: 2, name: 'Установить настройки позиции интерфейса по умолчанию', params: 'ui:default', btntext: "Применить"},
                    ]
                },
                {
                    name: 'Голосовой чат',
                    settings: [
                        {type: 2, name: 'Перезагрузка #1', params: 'voice:reload:1', btntext: "Применить"},
                        {type: 2, name: 'Перезагрузка #2', params: 'voice:reload:2', btntext: "Применить"},
                        {type: 2, name: 'Перезагрузка #3', params: 'voice:reload:3', btntext: "Применить"},
                        {type: 2, name: 'Полная перезагрузка', params: 'voice:reload:4', btntext: "Применить"},
                        {type: 1, name: 'Громкость', params: 'voice:vol', active: methods.parseInt(user.getCache('s_voice_vol') * 10), listmenu: bgOpacity},
                        //{type: 1, name: 'Слышать игроков только', params: 'voice:work', active: methods.parseInt(user.getCache('s_mute_lvl')), listmenu: ['Всех', 'С 2 LVL', 'С 3 LVL', 'С 4 LVL', 'С 5 LVL']},
                    ]
                },
                {
                    name: 'Текстовый чат',
                    settings: [
                        {type: 2, name: 'Очистить чат', params: 'chat:clear', btntext: "Применить"},
                        {type: 1, name: 'Шрифт', params: 'chat:font', active: enums.fontList.indexOf(user.getCache('s_chat_font')), listmenu:  enums.fontList},
                        {type: 1, name: 'Размер шрифта', params: 'chat:fontSize', active: fontSizeList.indexOf(user.getCache('s_chat_font_s').toString()), listmenu: fontSizeList},
                        {type: 1, name: 'Отступ текста', params: 'chat:margin', active: lineSizeList.indexOf(user.getCache('s_chat_font_l').toString()), listmenu: lineSizeList},
                        {type: 1, name: 'Тип фона', params: 'chat:bgtype', active: user.getCache('s_chat_bg_s'), listmenu: bgStateList},
                        {type: 1, name: 'Прозрачность фона', params: 'chat:bgopacity', active: methods.parseInt(user.getCache('s_chat_bg_o') * 10), listmenu: bgOpacity},
                        {type: 1, name: 'Прозрачность чата', params: 'chat:opacity', active: methods.parseInt(user.getCache('s_chat_opacity') * 10), listmenu: bgOpacity},
                        {type: 1, name: 'Ширина', params: 'chat:width', active: methods.parseInt(user.getCache('s_chat_width') / 5), listmenu: bgOpacity2},
                        {type: 1, name: 'Высота', params: 'chat:height', active: methods.parseInt(user.getCache('s_chat_height') / 5), listmenu: bgOpacity2},
                        {type: 1, name: 'Закрыть по таймауту', params: 'chat:timeout', active: user.getCache('s_chat_timeout'), listmenu: timeoutList},
                    ]
                },
                {
                    name: 'Дизайн меню',
                    settings: [
                        {type: 2, name: 'Настройки дизайна стандартного меню', params: 'ui:openMenuDesign', btntext: "Открыть"}
                    ]
                },
                {
                    name: 'Карта',
                    settings: [
                        {type: 1, name: 'Иконки купленных домов', params: 'map:s_map_house_b', active: user.getCache('s_map_house_b'), listmenu: mapSetting},
                        {type: 1, name: 'Иконки свободных домов', params: 'map:s_map_house_f', active: user.getCache('s_map_house_f'), listmenu: mapSetting},
                        {type: 1, name: 'Иконки квартир', params: 'map:s_map_condo', active: user.getCache('s_map_condo'), listmenu: mapSetting},
                        {type: 1, name: 'Иконки яхт', params: 'map:s_map_yacht', active: user.getCache('s_map_yacht'), listmenu: mapSetting},
                        {type: 1, name: 'Титульные территории', params: 'map:s_map_tt', active: user.getCache('s_map_tt'), listmenu: mapSetting},
                        {type: 1, name: 'Территории гетто банд', params: 'map:s_map_ghetto', active: user.getCache('s_map_ghetto'), listmenu: mapSetting},
                        {type: 1, name: 'Убежища криминальных организаций', params: 'map:s_map_spawns', active: user.getCache('s_map_spawns'), listmenu: mapSetting},
                    ]
                },
                {
                    name: 'Оптимизация',
                    settings: [
                        {type: 0, name: 'Доп. прогрузка моделей', params: 'main:load:model', active: user.getCache('s_load_model') ? 1 : 0},
                        {type: 0, name: 'Оптимизация теней', params: 'main:load:shadow', active: user.getCache('s_load_s') ? 1 : 0},
                        {type: 1, name: 'Прогрузка лодов транспорта', params: 'main:load:lod:v', active: user.getCache('s_load_v'), listmenu: lodSettings},
                        {type: 1, name: 'Прогрузка лодов игроков', params: 'main:load:lod:p', active: user.getCache('s_load_p'), listmenu: lodSettings},
                        {type: 1, name: 'Общая прорисовка транспорта и игроков', params: 'main:load:lod:all', active: user.getCache('s_load_lod'), listmenu: lodSettings},
                    ]
                },
                /*{
                    name: 'Назначение клавиш',
                    desc: 'Для того, чтобы перезанзначить клавишу, нажмите на синюю кнопку, а потом на желаемую клавишу',
                    settings: keys
                },*/
            ],
            settingsActive: tab
        };


        bind.allowKeyList.forEach(item => {

            let keys = {
                name: 'Назначение клавиш - ' + item.name,
                settings: []
            };

            item.keys.forEach(key => {
                if (keyName === key[1])
                    keys.settings.push({type: 2, name: key[0], params: `keys:${key[1]}`, btntext: `...`});
                else
                    keys.settings.push({type: 2, name: key[0], params: `keys:${key[1]}`, btntext: `${bind.getKeyName(user.getCache(key[1]))}`});
            });

            sendData.settingsData.push(keys);

            /*
            if (keyName === item[1])
                keys.push({type: 2, name: item[0], params: `keys:${item[1]}`, btntext: `...`});
            else
                keys.push({type: 2, name: item[0], params: `keys:${item[1]}`, btntext: `${bind.getKeyName(user.getCache(item[1]))}`});
            * */
        });

        ui.callCef('accmain', JSON.stringify(sendData));
    }
    catch (e) {
        methods.debug('mainMenu.updateInfoSettings', e.toString());
    }
};

mainMenu.updateInfoHeader = function() {
    let sendData = {
        type: 'updateInfo',
        accountId: user.getCache('id'),
        nick: user.getCache('social'),
        balance: methods.parseInt(user.getCashMoney() + user.getBankMoney())
    };
    ui.callCef('accmain', JSON.stringify(sendData));
};

mainMenu.updateInfoReport = function() {

    let data = [
        [
            {
                status: 0,
                type: 0,
                text: "По всем вопросам",
                time: "",
                number: user.getCache('id'),
                dialog: askList
            }
        ],
        [
            {
                status: 0,
                type: 1,
                text: "Если вы заметили нарушение, то пишите сюда",
                time: "",
                number: user.getCache('id'),
                dialog: reportList
            }
        ]
    ];

    let sendData = {
        type: 'updateInfoReport',
        reportData: data
    };
    ui.callCef('accmain', JSON.stringify(sendData));
};

mainMenu.updateInfoProperty = async function() {

    try {
        let houseData = {
            type: 'Дом',
            name: 'Отсутствует',
            address: 'Нет информации',
            doors: 'Нет информации',
            roommate: 0,
            carplace: 'Нет информации',
            gprice: 'Нет информации'
        };

        if (user.getCache('house_id') > 0) {
            let data = await user.getHouseData();

            houseData = {
                type: 'Дом',
                name: data.get('address'),
                address: data.get('street') + ' #' + data.get('number'),
                doors: `${methods.moneyFormat(data.get('tax_money') * -1, 0)}`,
                roommate: data.get('max_roommate'),
                carplace: data.get('ginterior1') >= 0 ? 'Есть' : 'Нет',
                gprice: data.get('price').toString(),
                x: data.get('x'),
                y: data.get('y'),
            }
        }

        let propertyData = [];
        let carsData = [];

        if (user.getCache('business_id')) {
            let data = await user.getBusinessData();
            propertyData.push(
                {
                    type: 0,
                    name: 'Бизнес',
                    price: data.get('price').toString(),
                    address: data.get('name'),
                    doors: `${methods.moneyFormat(data.get('tax_money') * -1, 0)}`,
                    x: -158,
                    y: -605,
                    img: 'https://appi-rp.ru/client/images/mmenu/office.jpg'
                },
            )
        }
        if (user.getCache('stock_id')) {
            let data = await user.getStockData();
            propertyData.push(
                {
                    type: 1,
                    name: 'Склад',
                    price: data.get('price').toString(),
                    address: `${data.get('address')}, ${data.get('street')} #${data.get('number')}`,
                    doors: `${methods.moneyFormat(data.get('tax_money') * -1, 0)}`,
                    x: data.get('x'),
                    y: data.get('y'),
                    img: 'https://appi-rp.ru/client/images/mmenu/stock.jpg'
                },
            )
        }
        if (user.getCache('condo_id')) {
            let data = await user.getCondoData();
            propertyData.push(
                {
                    type: 0,
                    name: 'Квартира',
                    price: data.get('price').toString(),
                    address: `${data.get('address')}, ${data.get('street')} #${data.get('number')}`,
                    doors: `${methods.moneyFormat(data.get('tax_money') * -1, 0)}`,
                    x: data.get('x'),
                    y: data.get('y'),
                    img: 'https://appi-rp.ru/client/images/mmenu/condo.jpg'
                },
            )
        }
        if (user.getCache('yacht_id')) {
            let data = await user.getYachtData();
            propertyData.push(
                {
                    type: 0,
                    name: 'Яхта',
                    price: data.get('price').toString(),
                    address: `${data.get('name')} #${data.get('id')}`,
                    doors: `${methods.moneyFormat(data.get('tax_money') * -1, 0)}`,
                    x: data.get('x'),
                    y: data.get('y'),
                    img: 'https://appi-rp.ru/client/images/mmenu/yacht.jpg'
                },
            )
        }

        (await user.getCarsData()).forEach(item => {
            try {
                if (item) {
                    let vInfo = methods.getVehicleInfo(item.get('name'));
                    carsData.push(
                        {
                            type: vInfo.class_name_ru,
                            name: vInfo.display_name,
                            vin: `${methods.moneyFormat(item.get('tax_money') * -1, 0)}`,
                            carclass: item.get('is_cop_park') > 0 ? 'Есть' : 'Нет',
                            def: item.get('fuel') > 0 ? 'Есть' : 'Нет',
                            number: item.get('number')
                        },
                    )
                }
            }
            catch (e) {}
        });

        let sendData = {
            type: 'updateInfoProperty',
            propertyHouse: [houseData],
            propertyBusiness: propertyData,
            propertyCars: carsData
        };
        ui.callCef('accmain', JSON.stringify(sendData));
    }
    catch (e) {
        methods.debug(e);
    }
};

mainMenu.updateInfoQuest = function() {

    let data = [];

    quest.getQuestAllNames().forEach(item => {
        try {
            if (!quest.getQuestCanSee(item))
                return;
            let taskList = [];
            let name = item;
            let qCount = user.getQuestCount(name);

            for (let i = 0; i < quest.getQuestLineMax(name); i++) {

                let idx = -1;
                if(qCount >= i)
                    idx = i;

                let status = 2;
                if (qCount === i)
                    status = 1;
                else if (qCount > i)
                    status = 0;

                let pos = quest.getQuestLinePos(name, i);
                if (status === 2)
                    taskList.push({title: 'Неизвестно', text: 'Описание недоступно', reward: quest.getQuestLinePrize(name, i), complete: status, x: pos.x, y: pos.y});
                else
                    taskList.push({title: quest.getQuestLineName(name, i), text: quest.getQuestLineInfo(name, i), reward: quest.getQuestLinePrize(name, i), complete: status, x: pos.x, y: pos.y});
            }

            let count = quest.getQuestLineMax(item) - qCount;
            if (count === 0)
                data.push({title: quest.getQuestName(item), subtitle: 'Выполнено', done: true, tasks: taskList});
            else
                data.push({title: quest.getQuestName(item), subtitle: 'Осталось заданий: ' + count, tasks: taskList});
        }
        catch (e) {
            methods.debug('FOREACH', e.toString());
        }
    });

    let sendData = {
        type: 'updateInfoQuest',
        questData: data
    };
    ui.callCef('accmain', JSON.stringify(sendData));
};

mainMenu.updateInfoGeneral = function() {

    let dataAccount = {
        nickname: user.getCache('name'),
        fraction: user.getFractionName(),
        gender: user.getSexName(),
        age: `${user.getCache('age')}`,
        husband: `${(user.getCache('partner') === '' ? 'Отсутствует' : user.getCache('partner'))}`,
        //husband: "Отсутствует",
        hours: `${methods.parseFloat(user.getCache('online_time') * 8.5 / 60).toFixed(1)}`,
        lastlogin: `${methods.unixTimeStampToDateTimeShort(user.getCache('login_date'))}`,
        created: `${methods.unixTimeStampToDateTimeShort(user.getCache('reg_timestamp'))}`,
        friends: user.getCache('stats_endurance') + 1,
        maxFriends: 100,
        death: user.getCache('stats_strength') + 1,
        maxdeath: 100,
        kills: user.getCache('stats_shooting') + 1,
        maxkills: 100,
        status: user.getRegStatusName(),
        statusDate: "_________",
        pocketmoney: `${methods.parseInt(user.getCashMoney())}`,
        cardmoney: `${methods.parseInt(user.getBankMoney())}`,
        medDate: user.getCache('med_lic') ? `активна до ${user.getCache('med_lic_end')}` : "не активна",
        medPercent: user.getCache('med_lic') ? "активна" : "не активна",
        medActive: user.getCache('med_lic') ? 100 : 0
    };

    let data = [];
    data.push({title: 'Репутация', subtitle: `${user.getRepName()}`});
    if (user.getCache('bank_card') > 0)
        data.push({title: 'Банковская карта', subtitle: `${methods.bankFormat(user.getCache('bank_card'))}`});
    if (user.getCache('phone') > 0)
        data.push({title: 'Мобильный телефон', subtitle: `${methods.phoneFormat(user.getCache('phone'))}`});

    data.push({title: 'Вы играли', subtitle: `${methods.parseFloat(user.getCache('online_time') * 8.5 / 60).toFixed(1)}ч.`});
    data.push({title: 'Вы играли сегодня', subtitle: `${methods.parseFloat(user.getCache('online_cont') * 8.5 / 60).toFixed(1)}ч.`});

    if (user.getCache('vip_type') === 1)
        data.push({title: 'VIP', subtitle: `LIGHT`});
    if (user.getCache('vip_type') === 2)
        data.push({title: 'VIP', subtitle: `HARD`});
    else
        data.push({title: 'VIP', subtitle: `Отсутствует`});

    data.push({title: 'Розыск', subtitle: `${user.getCache('wanted_level') > 0 ? 'В розыске' : 'Нет'}`});
    data.push({title: 'Предупреждений', subtitle: `${user.getCache('warns')}`});

    data.push({title: 'Work ID', subtitle: `${user.getCache('work_lic') != '' ? user.getCache('work_lic') : 'Нет'}`});
    data.push({title: 'Уровень рабочего', subtitle: `${user.getCache('work_lvl')}`});
    data.push({title: 'Опыт рабочего', subtitle: `${user.getCache('work_exp')}/${user.getCache('work_lvl') * 500}`});

    data.push({title: 'Лицензия категории `А`', subtitle: `${user.getCache('a_lic') ? 'Есть' : 'Нет'}`});
    data.push({title: 'Лицензия категории `B`', subtitle: `${user.getCache('b_lic') ? 'Есть' : 'Нет'}`});
    data.push({title: 'Лицензия категории `C`', subtitle: `${user.getCache('c_lic') ? 'Есть' : 'Нет'}`});
    data.push({title: 'Лицензия на авиатранспорт', subtitle: `${user.getCache('air_lic') ? 'Есть' : 'Нет'}`});
    data.push({title: 'Лицензия на водный транспорт', subtitle: `${user.getCache('ship_lic') ? 'Есть' : 'Нет'}`});
    data.push({title: 'Лицензия на оружие', subtitle: `${user.getCache('gun_lic') ? 'Есть' : 'Нет'}`});
    data.push({title: 'Лицензия на перевозку пассажиров', subtitle: `${user.getCache('taxi_lic') ? 'Есть' : 'Нет'}`});
    data.push({title: 'Лицензия юриста', subtitle: `${user.getCache('law_lic') ? 'Есть' : 'Нет'}`});
    data.push({title: 'Лицензия на предпринимательство', subtitle: `${user.getCache('biz_lic') ? 'Есть' : 'Нет'}`});
    data.push({title: 'Лицензия на рыболовство', subtitle: `${user.getCache('fish_lic') ? 'Есть' : 'Нет'}`});

    data.push({title: 'Навык взлома отмычкой', subtitle: `${(user.getCache('stats_lockpick')).toFixed(2)}%`});

    data.push({title: 'Убийств', subtitle: `${user.getCache('st_kill')}`});
    data.push({title: 'Контракты - Банкоматы', subtitle: `${user.getCache('st_order_atm_f')}`});
    data.push({title: 'Контракты - Банкоматы (Сегодня)', subtitle: `${user.getCache('st_order_atm_d')}`});
    data.push({title: 'Контракты - Закладки', subtitle: `${user.getCache('st_order_drug_f')}`});
    data.push({title: 'Контракты - Закладки (Сегодня)', subtitle: `${user.getCache('st_order_drug_d')}`});
    data.push({title: 'Контракты - Ламар', subtitle: `${user.getCache('st_order_lamar_f')}`});
    data.push({title: 'Контракты - Ламар (Сегодня)', subtitle: `${user.getCache('st_order_lamar_d')}`});

    data.push({title: 'Учавствовал в каптах', subtitle: `${user.getCache('st_capt')}`});
    data.push({title: 'Учавствовал в каптах (Побед)', subtitle: `${user.getCache('st_capt_win')}`});

    data.push({title: 'Учавствовал в каптах мафий/армии', subtitle: `${user.getCache('st_capt_m')}`});
    data.push({title: 'Учавствовал в каптах мафий/армии (Побед)', subtitle: `${user.getCache('st_capt_m_win')}`});

    data.push({title: 'Смертей', subtitle: `${user.getCache('st_death')}`});
    data.push({title: 'Посиделок в тюрьме', subtitle: `${user.getCache('st_jail')}`});
    data.push({title: 'Преступлений', subtitle: `${user.getCache('st_crime')}`});
    data.push({title: 'Дистанция ходьбы', subtitle: `${methods.parseInt(user.getCache('st_walk'))}м.`});
    data.push({title: 'Дистанция бега', subtitle: `${methods.parseInt(user.getCache('st_run'))}м.`});
    data.push({title: 'Дистанция плавания', subtitle: `${methods.parseInt(user.getCache('st_swim'))}м.`});
    data.push({title: 'Дистанция вождения', subtitle: `${methods.parseInt(user.getCache('st_drive'))}м.`});
    data.push({title: 'Дистанция полёта', subtitle: `${methods.parseInt(user.getCache('st_fly'))}м.`});

    enums.jobList.forEach(item => {
        if (item[5] > 0)
            data.push({title: item[0], subtitle: `${methods.parseFloat((user.getCache('job_' + item[4]) / item[5]) * 100).toFixed(2)}%`});
    });

    let sendData = {
        type: 'updateInfoGeneral',
        generalList: data,
        generalData: dataAccount
    };
    ui.callCef('accmain', JSON.stringify(sendData));
};

mainMenu.isHide = function() {
    return hidden;
};

mainMenu.updatePage = function(page) {
    let sendData = {
        type: 'activePage',
        page: page
    };
    ui.callCef('accmain', JSON.stringify(sendData));
};

new_events.add('client:mainMenu:status', function(status) {
    if (status)
        mainMenu.show();
    else
        mainMenu.hide();
});

new_events.add('client:mainMenu:hide', function(status) {
    methods.blockKeys(false);
    mp.gui.cursor.show(false, false);
    ui.DisableMouseControl = false;
    hidden = true;
    ui.showHud();
    mp.game.graphics.transitionFromBlurred(100);

    if (bind.isChange)
        bind.bindNewKey(0);
});

new_events.add('client:mainMenu:sendReportOrAsk', function(text, type) {
    if (text !== '' && text !== undefined) {
        if (type === 1) {
            reportList.push({type: 0, text: text, time: `${weather.getRealTime()}`});
            methods.callRemote('server:sendReport', text);
        }
        else {
            askList.push({type: 0, text: text, time: `${weather.getRealTime()}`});
            methods.callRemote('server:sendAsk', text);
        }
        mainMenu.updateInfoReport();
    }
});

new_events.add('client:mainMenu:addAsk', function(text, name) {
    if (text !== '' && text !== undefined) {
        askList.push({type: 1, text: text, time: `${weather.getRealTime()}`, name: name});
    }
});

new_events.add('client:mainMenu:addReport', function(text, name) {
    if (text !== '' && text !== undefined) {
        reportList.push({type: 1, text: text, time: `${weather.getRealTime()}`, name: name});
    }
});

new_events.add('client:mainMenu:sendReportOrAsk:focus', function(status) {
    cantClose = status;
    mp.gui.cursor.show(status, true);
});

new_events.add('client:mainMenu:sendPos', function(x, y) {
    x = methods.parseInt(x);
    y = methods.parseInt(y);
    if (x !== 0 && y !== 0) {
        user.setWaypoint(x, y);
    }
    else if (y === 99) {
        methods.callRemote('server:gps:findBank')
    }
    else if (y === 98) {
        methods.callRemote('server:gps:find247')
    }
    else if (y === 97) {
        methods.callRemote('server:gps:findClothShop')
    }
});

new_events.add('client:mainMenu:settings:btn', async function(btn) {
    if (btn.toLowerCase().slice(0, 5) === "keys:") {
        try {
            let key = btn.toLowerCase().replace('keys:', '');
            mp.game.ui.notifications.show(`~g~Нажмите на любую кнопку, для смены клавиши`);

            await bind.getChangeKey(key);

            mainMenu.updateInfoSettings(6);
            mainMenu.updatePage(0);
            mainMenu.updatePage(4);

            mp.game.ui.notifications.show(`~g~Вы изменили клавишу`);
        }
        catch (e) {
            methods.debug(e);
        }
    }
    else if (btn === "main:promocode") {
        mainMenu.hide();
        let promocode = await UIMenu.Menu.GetUserInput("Введите промокод", "", 128);
        if (promocode === '') return;
        methods.callRemote("server:activatePromocode", promocode);
    }
    else if (btn === "ui:reload") {
        mainMenu.hide();
        ui.fixInterface();
    }
    else if (btn === "ui:edit") {
        mainMenu.hide();
        ui.showOrHideEdit();
        mp.game.ui.notifications.show('Нажмите ~g~ПКМ~s~ чтобы вернуть в исходное положени');
        mp.game.ui.notifications.show('Нажмите ~g~F2~s~ чтобы завершить редактирование');
    }
    else if (btn === "ui:default") {
        user.set('s_pos', '[]');
        mp.game.ui.notifications.show('~b~Настройки были применены');
    }
    else if (btn === "voice:reload:1") {
        mp.voiceChat.cleanupAndReload(true, false, false);
        mp.game.ui.notifications.show('~b~Голосовой чат был перезагружен');
    }
    else if (btn === "voice:reload:2") {
        mp.voiceChat.cleanupAndReload(false, true, false);
        mp.game.ui.notifications.show('~b~Голосовой чат был перезагружен');
    }
    else if (btn === "voice:reload:3") {
        mp.voiceChat.cleanupAndReload(false, false, true);
        mp.game.ui.notifications.show('~b~Голосовой чат был перезагружен');
    }
    else if (btn === "voice:reload:4") {
        mp.voiceChat.cleanupAndReload(true, true, true);
        mp.game.ui.notifications.show('~b~Голосовой чат был перезагружен');
    }
    else if (btn === "chat:clear") {
        user.clearChat();
        mp.game.ui.notifications.show('~b~Чат был очищен');
    }
    else if (btn === "ui:openMenuDesign") {
        mainMenu.hide();
        setTimeout(function () {
            menuList.showSettingsMenuMenu();
        }, 50);
    }
});

new_events.add('client:mainMenu:settings:updateCheckbox', async function(btn, active) {
    if (btn === "main:load:model") {
        user.set('s_load_model', active);
        timer.allModelLoader();
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "main:load:shadow") {
        user.set('s_load_s', active);
        mp.game.graphics.setFarShadowsSuppressed(active === 1);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "main:showId") {
        user.set('s_show_id', active);
        mp.events.call('client:showId');
    }
    else if (btn === "main:showIdVeh") {
        user.set('s_show_v_id', active);
        mp.events.call('client:showvId');
    }
    else if (btn === "ui:curs") {
        user.set('s_hud_cursor', active);
        ui.DisableMouseControl = false;
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:notify") {
        user.set('s_hud_notify', active);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:quest") {
        user.set('s_hud_quest', active);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:keys") {
        user.set('s_hud_keys', active);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:shadow") {
        user.set('s_hud_shadow', active);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:logo") {
        user.set('s_hud_logo', active);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:hide:watch") {
        if (active)
            ui.showPosition('watch');
        else
            ui.hidePosition('watch');
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:hide:gps") {
        if (active)
            ui.showPosition('gps');
        else
            ui.hidePosition('gps');
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:hide:player-needs") {
        if (active)
            ui.showPosition('player-needs');
        else
            ui.hidePosition('player-needs');
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:hide:player-money") {
        if (active)
            ui.showPosition('player-money');
        else
            ui.hidePosition('player-money');
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:hide:car-fuel") {
        if (active)
            ui.showPosition('car-fuel');
        else
            ui.hidePosition('car-fuel');
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:hide:car-elements") {
        if (active)
            ui.showPosition('car-elements');
        else
            ui.hidePosition('car-elements');
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:autoreload") {
        user.set('s_hud_restart', active);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
});

new_events.add('client:mainMenu:settings:updateList', async function(btn, index) {
    if (btn === "main:clipset") {
        if (user.getSex() === 1) {
            user.set('clipset', enums.clopsetFemale[index][1]);
            user.setClipset(enums.clopsetFemale[index][1]);
        }
        else {
            user.set('clipset', enums.clopsetMale[index][1]);
            user.setClipset(enums.clopsetMale[index][1]);
        }
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    if (btn === "main:clipsetw") {
        user.set('clipset_w', enums.clipsetW[index][1]);
        user.setClipsetW(enums.clipsetW[index][1]);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:speedtype") {
        user.set('s_hud_speed', index === 1);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:speed") {
        user.set('s_hud_speed_type', index === 1);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:temp") {
        user.set('s_hud_temp', index === 1);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:indicator") {
        user.set('s_hud_raycast', index);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:bg") {
        let voiceVol = index / 10;
        user.set('s_hud_bg', voiceVol);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "ui:bgc") {
        user.set('s_hud_bgс', index);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "voice:vol") {
        let voiceVol = index / 10;
        user.set('s_voice_vol', voiceVol);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "voice:work") {
        user.set('s_mute_lvl', index + 1);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "chat:font") {
        user.set('s_chat_font', enums.fontList[index]);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "chat:fontSize") {
        let fontSizeList = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
        user.set('s_chat_font_s', fontSizeList[index]);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "chat:margin") {
        let lineSizeList = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
        user.set('s_chat_font_l', lineSizeList[index]);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "chat:bgStyle") {
        user.set('s_chat_bg_s', index);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "chat:bgopacity") {
        let num = index / 10;
        user.set('s_chat_bg_o', num);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "chat:opacity") {
        let num = index / 10;
        user.set('s_chat_opacity', num);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "chat:width") {
        let num = index * 5;
        user.set('s_chat_width', num);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "chat:height") {
        let num = index * 5;
        user.set('s_chat_height', num);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "chat:timeout") {
        user.set('s_chat_timeout', index);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "map:s_map_house_b") {
        user.set('s_map_house_b', index);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
        methods.displayTypeAllBlipById(40, enums.blipDisplayIds[index], 59);
        methods.displayTypeAllBlipById(492, enums.blipDisplayIds[index], 59);
    }
    else if (btn === "map:s_map_house_f") {
        user.set('s_map_house_f', index);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
        methods.displayTypeAllBlipById(40, enums.blipDisplayIds[index], 69);
        methods.displayTypeAllBlipById(492, enums.blipDisplayIds[index], 69);
    }
    else if (btn === "map:s_map_condo") {
        user.set('s_map_condo', index);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
        methods.displayTypeAllBlipById(40, enums.blipDisplayIds[index], 0);
    }
    else if (btn === "map:s_map_yacht") {
        user.set('s_map_yacht', index);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
        methods.displayTypeAllBlipById(455, enums.blipDisplayIds[index]);
    }
    else if (btn === "map:s_map_tt") {
        user.set('s_map_tt', index);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
        methods.displayTypeAllBlipById(310, enums.blipDisplayIds[index]);
    }
    else if (btn === "map:s_map_ghetto") {
        user.set('s_map_ghetto', index);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
        methods.displayTypeAllBlipById(5, enums.blipDisplayIds[index]);
    }
    else if (btn === "map:s_map_spawns") {
        user.set('s_map_spawns', index);
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
        methods.displayTypeAllBlipById(565, enums.blipDisplayIds[index]);
    }
    else if (btn === "main:load:lod:v") {
        user.set('s_load_v', index);
        if (index === 1)
            mp.vehicles.forEach(v => { if(mp.vehicles.exists(v)) v.setLodMultiplier(0.7); });
        else if (index === 2)
            mp.vehicles.forEach(v => { if(mp.vehicles.exists(v)) v.setLodMultiplier(0.4); });
        else
            mp.vehicles.forEach(v => { if(mp.vehicles.exists(v)) v.setLodMultiplier(1); });
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "main:load:lod:p") {
        user.set('s_load_p', index);
        if (index === 1)
            mp.players.forEach(p => { if(mp.players.exists(p)) p.setLodMultiplier(0.7); });
        else if (index === 2)
            mp.players.forEach(p => { if(mp.players.exists(p)) p.setLodMultiplier(0.4); });
        else
            mp.players.forEach(p => { if(mp.players.exists(p)) p.setLodMultiplier(1); });
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
    else if (btn === "main:load:lod:all") {
        user.set('s_load_lod', index);
        if (index === 1) {
            mp.vehicles.forEach(v => { if(mp.vehicles.exists(v)) v.setLodDist(150); });
            mp.players.forEach(p => { if(mp.players.exists(p)) p.setLodDist(150); });
        }
        else if (index === 2) {
            mp.vehicles.forEach(v => { if(mp.vehicles.exists(v)) v.setLodDist(100); });
            mp.players.forEach(p => { if(mp.players.exists(p)) p.setLodDist(100); });
        }
        else {
            mp.vehicles.forEach(v => { if(mp.vehicles.exists(v)) v.setLodDist(200); });
            mp.players.forEach(p => { if(mp.players.exists(p)) p.setLodDist(200); });
        }
        mp.game.ui.notifications.show('~b~Настройки были сохранены');
    }
});

export default mainMenu;