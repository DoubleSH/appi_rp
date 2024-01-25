import user from '../user';
import phone from "../phone";
import inventory from "../inventory";

import ui from "../modules/ui";

import jobPoint from "./jobPoint";
import weather from "./weather";

import vehicles from "../property/vehicles";
import methods from "../modules/methods";
import photo from "../jobs/photo";
import npc from "./npc";
import new_events from "../check_events";

let quest = {};

let questNames = [
    'role_0',
    'standart',
    'driftking',
    //'craft',
    'gang',
    'fish',
    //'business',
    'detective',
    'weekend',
    /*'work',
    'top',*/
];

let gangTakeBoxPos = new mp.Vector3(10.247762680053711, -1902.8265380859375, 21.602693557739258);
let gangPutBoxPos = new mp.Vector3(-119.17330932617188, -1769.6900634765625, 28.85245704650879);

let _checkpointId = -1;
let _currentCheckpointId = 0;

let isLamar = false;

let questLamarShop = [
    new mp.Vector3(-182.99929809570312, -1694.6654052734375, 31.857234954833984),
    new mp.Vector3(-14.589057922363281, -1832.5186767578125, 24.252771377563477),
    new mp.Vector3(435.4407043457031, -2027.0235595703125, 22.212621688842773),
    new mp.Vector3(816.9234008789062, -2444.7568359375, 23.11887550354004),
    new mp.Vector3(1328.7283935546875, -1629.90087890625, 51.09795379638672),
];

let questList = {
    role_0: {
        name: "Первые шаги",
        skin: "s_f_y_beachbarstaff_01",
        skinRot: 147.77825927734375,
        anim: "WORLD_HUMAN_CLIPBOARD",
        pos: new mp.Vector3(5002.990234375, -5752.30419921875, 19.880247116088867),
        tasks: [
            ["Лицензия", "Купить лицензию категории B (Доп. информация в М - Квесты)", "$100 + Лицензия категории А", 5011, -5750],
            ["Первая работа", "Устроиться на работу садовника или строителя в здании правительства", "$200", 5011, -5750],
            ["Аренда", "Арендуйте транспорт", "$250", -1261, -608],
            ["Первые деньги", "Заработайте первые деньги", "$500", -1585, -234],
            ["Банковская карта", "Оформите банковскую карту в любом из доступных банков", "$200", 0, 99],
            ["Урчащий животик", "Купить еду и воду в палатке или магазине", "$200", 0, 98],
            ["Приодеться", "Купить любую одежду", "$500", -817, -1079],
            ["Швейный завод", "Для того, чтобы получить бинты, необходимо обменять любую одежду на ткань в швейной фабрике, после чего через инвентарь будет возможность их скрафтить", "Рецепт малой аптечки", 718, -977],
            ["Ламар", "Познакомиться с Ламаром", "Автомобиль", -218, -1368],
            ["Бричка", "Найти и припарковать свой транспорт (Найти можно через телефон в приложении UVeh)", "$500", -218, -1368],
            ["Кчау", "Примите участие в гонках на Maze Bank Arena", "$2000", -255, -2026],
            ["Сила револьвера", "Примите участие в дуэли", "$2000", -255, -2026],
            ["Время пострелять", "Примите участие в GunZone", "$2000", -255, -2026],
            ["По карьерной лестнице", "Устроиться на работу в Правительство/LSPD/BCSD/Армию/Службу новостей, на ваш выбор", "$20,000", 0, 0],
        ],
        canSee: () => { return false }
    },
    standart: {
        name: "Первые шаги",
        skin: "a_f_y_business_02",
        skinRot: -46.52558,
        anim: "WORLD_HUMAN_CLIPBOARD",
        pos: new mp.Vector3(-1288.153, -561.6686, 31.71216),
        tasks: [
            ["Лицензия", "Купить лицензию категории B (Доп. информация в М - Квесты)", "$100 + Лицензия категории А", -1290, -571],
            ["Первая работа", "Устроиться на работу садовника или строителя в здании правительства", "$200", -1290, -571],
            ["Аренда", "Арендуйте транспорт", "$250", -1261, -608],
            ["Первые деньги", "Заработайте первые деньги", "$500", -1585, -234],
            ["Банковская карта", "Оформите банковскую карту в любом из доступных банков", "$200", 0, 99],
            ["Урчащий животик", "Купить еду и воду в палатке или магазине", "$200", 0, 98],
            ["Приодеться", "Купить любую одежду", "$500", -817, -1079],
            ["Швейный завод", "Для того, чтобы получить бинты, необходимо обменять любую одежду на ткань в швейной фабрике, после чего через инвентарь будет возможность их скрафтить", "Рецепт малой аптечки", 718, -977],
            ["Ламар", "Познакомиться с Ламаром", "$200", -218, -1368],
            ["Бричка", "Найти и припарковать свой транспорт (Найти можно через телефон в приложении UVeh)", "$500", -218, -1368],
            ["Кчау", "Примите участие в гонках на Maze Bank Arena", "$2000", -255, -2026],
            ["Сила револьвера", "Примите участие в дуэли", "$2000", -255, -2026],
            ["Время пострелять", "Примите участие в GunZone", "$2000", -255, -2026],
            ["По карьерной лестнице", "Устроиться на работу в Правительство/LSPD/BCSD/Армию/Службу новостей, на ваш выбор", "$20,000", 0, 0],
        ],
        canSee: () => {
            if (user.getCache('role') === 2) {
                questList.standart.tasks = [
                    ["Лицензия", "Купить лицензию категории B (Доп. информация в М - Квесты)", "$100 + Лицензия категории А", 5011, -5750],
                    ["Первая работа", "Устроиться на работу садовника или строителя в здании правительства", "$200", 5399, -5172],
                    ["Аренда", "Арендуйте транспорт", "$250", 4974, -5716],
                    ["Первые деньги", "Заработайте первые деньги", "$500", 4974, -5716],
                    ["Банковская карта", "Оформите банковскую карту в местном банке", "$200", 5011, -5750],
                    ["Урчащий животик", "Купить еду и воду в палатке или магазине", "$200", 0, 98],
                    ["Приодеться", "Купить любую одежду", "$500", 5007, -5786],
                    ["Швейный завод", "Для того, чтобы получить бинты, необходимо обменять любую одежду на ткань в швейной фабрике, после чего через инвентарь будет возможность их скрафтить", "Рецепт малой аптечки", 5063, -4591],
                    ["Ламар", "Познакомиться с Ламаром", "$200", -218, -1368],
                    ["Бричка", "Найти и припарковать свой транспорт (Найти можно через телефон в приложении UVeh)", "$500", -218, -1368],
                    ["Кчау", "Примите участие в гонках на Maze Bank Arena", "$2000", -255, -2026],
                    ["Сила револьвера", "Примите участие в дуэли", "$2000", -255, -2026],
                    ["Время пострелять", "Примите участие в GunZone", "$2000", -255, -2026],
                    ["По карьерной лестнице", "Устроиться на работу в Правительство/LSPD/BCSD/Армию/Службу новостей, на ваш выбор", "$20,000", 0, 0],
                ]
            }

            return true
        }
    },
    driftking: {
        name: "Твоя первая мечта",
        skin: "ig_oneil",
        skinRot: 26.7,
        anim: "WORLD_HUMAN_CLIPBOARD",
        pos: new mp.Vector3(-877.7675170898438, -2741.1162109375, 13.932750701904297),
        tasks: [
            ["Забрать автомобиль", "Поезжайте в аэропорт и заберите ваш автомобиль", "Неизвестно", -877, -2741],
            ["В чем дело?", "Езжайте в полицейский участок и напишите заявление", "Отсутствует", 450, -984],
            ["Ламар", "Попросить Ламара о помощи", "Отсутствует", -218, -1368], //$5000
            ["deadinside.py", "Пробейте номер авто", "Отсутствует"],
            ["Адрес", "Приехать на адрес и найти информацию о авто", "Отсутствует"],
            ["Продуктивный разговор", "Узнайте новую информацию о вашем авто", "Отсутствует", -968, -2070], //$5000
            ["Найдите авто", "Езжайте в указанный район и найдите ваш автомобиль", "Отсутствует"],
            ["Ночь", "Дождитесь ночи и угоните автомобиль", "Автомобиль"],
            ["Плохое предчувствие", "Проверьте ваш автомобиль", "Отсутствует"],
            ["Купить запчасти", "Купитие свечи для автомобиля", "Отсутствует"],
            ["Свечи", "Замените свечи", "Навык автомеханика"],
            ["Аккумулятор", "Замените аккумулятор", "Навык автомеханика"],
            ["Колёса", "Замените колеса", "Навык автомеханика"],
            ["Топливная система", "Замените топливную систему", "Навык автомеханика"],
            ["Тормозная система", "Замените тормозную систему", "Навык автомеханика"],
            ["Трансмиссия", "Замените трансмиссию", "Навык автомеханика"],
            ["Двигатель", "Замените двигатель", "Навык автомеханика"],
            ["Капот", "Установите капот", "Навык автомеханика"],
            ["Багажник", "Установите багажник", "Навык автомеханика"],
            ["Двери", "Установите все двери", "Навык автомеханика"],
            ["Стёкла", "Установите все стёкла", "Навык автомеханика"],
            ["Обкатка", "Испытайте ваш автомобиль на дрифт-площадке", "Уникальный костюм"],
        ],
        canSee: () => { return true }
    },
    gang: {
        name: "Тёмная сторона",
        skin: "ig_lamardavis",
        skinRot: 43.398406982421875,
        anim: "WORLD_HUMAN_SMOKING",
        pos: new mp.Vector3(-218.75608825683594, -1368.4576416015625, 31.25823402404785),
        tasks: [
            ["Знакомство", "Найти Ламара и поговорить с ним", "Доступ к консоли в телефоне", -218, -1368],
            ["Фургоны", "Перевезите фургон у Ламара и заработайте свои первые BitCoin", "$200", -218, -1368],
            ["Криминальный мир", "Познакомьтесь с криминальными организациями штата", "$500", -218, -1368],
            ["Купите сумку", "Купите сумку в любом магазине одежды", "$500", -680, 5832],
            ["Купите маску", "Купите маску в магазине масок на пляже Del Pierro", "$1000", -1338, -1278],
            ["Console v1", "Обновите пакеты в консоли через команду apt-get update", "1btc", -218, -1368],
            ["Угон", "Угоните транспорт любым доступным способом и продайте его через консоль введя команду ecorp -car -getpos", "1btc", -218, -1368],
            ["BitCoin", "Узнайте ваш баланс BitCoin с помощью команды ecorp -balance", "1btc", -218, -1368],
            ["Вывод", "Выведите BitCoin на вашу карту с помощью команды ecorp -coin -toBankCard [Сумма]", "1btc",-218, -1368],
            ["Организация", "Вступите в любую криминальную организацию", "10btc", -218, -1368],
            ["Стволы", "Купите любое оружие и экипируйте его", "10btc", -218, -1368],
            ["Разгрузка", "Разгрузите фургон с войны за грузы", "20btc", -218, -1368],
            ["Кассы", "Взломайте кассу и ограбьте магазин", "50btc", -218, -1368],
            ["Отмыв", "Отмойте вашу выручку любым доступным способом например через ecorp -money -clear", "50btc", -218, -1368],
            ["Ограбление банка", "Ограбьте ячейку в банке", "100btc", -218, -1368],
        ],
        canSee: () => { return true }
    },
    fish: {
        name: "Рыболов",
        skin: "",
        skinRot: 0,
        anim: "",
        pos: new mp.Vector3(0, 0, 0),
        tasks: [
            ["Лицензия", "Приобрести лицензию на рыболовство в здании правительства", "$500", -1290, -571],
            ["Удочка", "Купить удочку в рыболовном магазине", "$100", -1599, 5202],
            ["Ловля рыбы", "Поймать 10шт любой рыбы", "$200"],
            ["Сбыт", "Продать рыбу в любом 24/7", "$500", 0, 98],
            ["По-крупному", "Поймать Американская палия 25шт", "Рецепт крафта улучшенной удочки + $1000"],
            ["Крафт", "Скрафтить улучшенную удочку", "$250"],
            ["Макрель", "Поймать Калифорнийский макрель 5шт", "$1500"],
            ["Тунец", "Поймать Желтопёрый тунец 5шт", "$5000"],
        ],
        canSee: () => { return true }
    },
    /*business: {
        name: "Бизнесмен",
        skin: "",
        skinRot: 0,
        anim: "",
        pos: new mp.Vector3(0, 0, 0),
        tasks: [
            ["Лицензия", "Приобрести лицензию на предпренимательство в здании правительства", "$500", -1290, -571],
            ["В горы", "Купить любой бизнес", "$500", -158, -605],
            ["Налоги", "Положить на счёт продуктов $10,000 за одну операцию", "$5000", -158, -605],
        ],
        canSee: () => { return true }
    },*/
    detective: {
        name: "Частный детектив",
        skin: "csb_undercover",
        skinRot: -1,
        anim: "WORLD_HUMAN_SMOKING",
        pos: new mp.Vector3(427.3970031738281, -986.3198852539062, 30.711612701416016),
        tasks: [ //Не сцы писать диалоги с матом, смелые или рофельные, если что с диалогами помогу тебе
            ["Знакомство", "Познакомиться с детективом", "Отсутствует", 427, -986], //Познакомился, детектив рассказал о себе
            ["Пропал человек", "Найти заказчика и поговорить с ним", "Отсутствует", -810, -992], //Суть в том, что ты приезжаешь к мужу, он ищет пропавшую жену, по итогу муж ебанутый шизик и она от него ушла уже несколько лет назад
            ["Поиск матери", "Поезжайте в полицейский участок Сэнди-шорс и разузнайте, где проживает Мэри Шифелд", "Отсутствует", 1850, 3680], //Приезжаешь в Сенди, Шерифф говорит да мамка работает в магазе алко езжай туды
            ["Разговор с матерью", "Поговорите с матерью пропавшей, разузнайте о ее местоположении", "Отсутствует", 1392, 3598], //Мамка сказала, что не ебет где доченька, они давно не общаются и тд
            ["Сделай сам", "Изготовьте объявления розыска пропавшего у Шерифа", "Отсутствует", 1850, 3680], //Берешь кароче изготавливаешь листы
            ["Развесьте объявления", "Разместите объявления о пропаже человека по столбам Сэнди-Шорса", "Отсутствует", -99999, -99999], //бегаешь по чекпоинтам, расклеиваешь по сенди
            ["Встреча", "Езжайте в рыболовный магазин", "Отсутствует", -1597, 5205], //Через время приходит СМС, как квест "Твоя первая мечта", когда ты пишешь заявление в ПД и ждешь 2 часа, тут тоже самое. Жена рассказывает что муж ебанат, она съебалась от него и живет в рыболовном магазине с новым ебырем
            ["Развязка", "Поговорить с мужем", "Отсутствует", -810, -992], //Алко, Нарко, Оружие, Деньги //Тут кароче приезжаешь к мужу, надо зайти в интерьер, ты видишь что он мертвый и ты можешь обыскать труп, (как в прологе)
            ["Вознаграждение", "Отправиться за вознаграждением", "Неизвестно", 427, -986], //1000 //Награда 1000$, в диалоге с детективом ты можешь признаться что нашел или скрыть этот факт, если признаешься, он направит тебя к ИГРОКАМ к ПДшникам и сдашь им этот весь конфискат и получишь от ИГРОКОВ награду
            ["Новая задача", "Получить новое задание", "Отсутствует", 427, -986], //Он рассказывает что мертвая бабка, по делу фигурирует улика, очень дорогое калье, ты покупаешь ИТЕМ ломату, едешь копать могилу НО только ночью и тихо
            ["На раскопки", "Раскопайте труп на кладбище", "Отсутствует", -1763, -262], //Раскапываешь труп
            ["Поиск", "Обыщите труп", "Отсутствует", -1763, -262], //Ищешь калье и можешь еще рандомно запихать какой нить итем туда дать эксклюзивный или золотую пушку с шансом 5%
            ["Ничего и не было", "Закопайте труп обратно", "Отсутствует", -1763, -262], //Закапываешь
            ["Вознаграждение", "Отправиться за вознаграждением", "Неизвестно", 427, -986], //2500 //Едешь к детекитву получаешь награду в 2500 баксов
            ["Новая задача", "Получить новое задание", "Отсутствует", 427, -986], //Пропала собака, пудель, в миррор парке
            ["Поиск животного", "Найти животное в районе Миррор Парка", "Отсутствует"], //Бегаешь по меткам, ищешь опрашиваешь типа, можешь ботов расставить для красоты, в магазин там погооврить с продавцом, барбером и тд, с ботами было бы на самом деле клево поговорить, поговорил и чета пока безуспешно, один из ботов говорит (под конец поисков) что видел ее в районе оврага
            ["Расширяем поиски", "Поискать животное в водном канале", "Отсутствует", 985, -356], //a_c_poodle //Ищешь мертвого пса в овраге, юерешь его и в руках ящик с мертвым псом, так и написать
            ["Что делать?", "Забрать труп животного", "Отсутствует", 427, -986], //Забрал этот ящик, едешь к детективу
            ["Похороны", "Закопать животное рядом с трупом той бабки", "Отсутствует", -1763, -262], //Детектив гооврит "Да я ебу что с ней делать? Вон езжай к бабке туда и закопай его там, че голову ебешь", у тебя есть возмоность закопать где угодно труп, кто додумается закопает в переклке, кто нет поедет на кладбище
            ["Вознаграждение", "Отправиться за вознаграждением", "Неизвестно", 427, -986], //2500 //Получаешь возграждадение в виде $2500
        ],
        canSee: () => { return true }
    },
    weekend: {
        name: "Мальчишник в Вегасе",
        skin: "",
        skinRot: 0,
        anim: "",
        pos: new mp.Vector3(0, 0, 0),
        tasks: [
            ["Стиль", "Набейте любое тату", "Уникальный предмет"],
            ["Напиться в стельку", "Напейтесь до потери сознания", "Уникальный предмет"],
            ["F*ck", "Показать фак всему миру", "Уникальный предмет"],
            ["Детка, танцуй", "Станцуйте 13 танец в стрип-клубе", "Уникальный предмет"],
            ["Smoke Weed Everyday", "Покурить травку", "Уникальный предмет"],
            ["Бывают и дети", "Займитесь сексом с партнером любого пола", "Уникальный предмет"],
            ["Если все таки появились", "Сыграйте свадьбу в церкви", "Уникальный предмет"],
            ["Красотка", "Накрасить губы в любой парикмахерской", "Уникальный предмет"],
            ["Бррр, прохладно", "Пройтись зимой голым", "Уникальный автомобиль"],
        ],
        canSee: () => { return true }
    },
    craft: {
        name: "Мастер на все руки",
        skin: "",
        skinRot: 0,
        anim: "",
        pos: new mp.Vector3(0, 0, 0),
        tasks: [
            ["Подготовка к экспидиции", "Сделай то да сё", "Уникальный предмет"],
            ["Экспидиция", "Сделай то да сё", "Уникальный предмет"],
            ["Подготовка к экспидиции", "Сделай то да сё", "Уникальный предмет"],

            ["Разведите костер", "Добудьте палки, бумагу и спички", "Уникальный предмет"],
            ["Создание палатки", "Купите 10шт ткани, сшейте из нее полотно", "Уникальный предмет"],
            ["Экспидиция", "Создание полотна палатки: 10шт ткани, иголка, нить.", "Уникальный предмет"],
            ["Экспидиция", "Разбитие(сбор) палатки: полотно, камни или молоток, палки", "Уникальный предмет"],
            ["Экспидиция", "крафт костра: палки, бумага, спички", "Уникальный предмет"],
            ["Экспидиция", "создание удочки: палка, нить, скрепка", "Уникальный предмет"],
            ["Экспидиция", "крафт бич сумки: веревка и мешок", "Уникальный предмет"],
            ["Экспидиция", "крафт мешка: 2шт ткани, иголка, нить.", "Уникальный предмет"],


        ],
        canSee: () => { return true }
    },
    /*work: {
        name: "Работяга",
        skin: "",
        skinRot: 0,
        anim: "",
        pos: new mp.Vector3(0, 0, 0),
        tasks: [
            ["Лицензия", "Приобрести лицензию на предпренимательство в здании правительства", "$500"],
            ["В горы", "Купить любой бизнес", "$500"],
            ["Выручка", "Снять выручку в размере $10,000 за одну операцию", "$1000"],
        ],
        canSee: () => { return true }
    },
    top: {
        name: "Миллионер",
        skin: "",
        skinRot: 0,
        anim: "",
        pos: new mp.Vector3(0, 0, 0),
        tasks: [
            ["Первый шаг", "Иметь на руках ", "$500"],
            ["В горы", "Купить любой бизнес", "$500"],
            ["Выручка", "Снять выручку в размере $10,000 за одну операцию", "$1000"],
        ],
        canSee: () => { return true }
    },*/
};

quest.loadAllBlip = function() {
    quest.getQuestAllNames().forEach(item => {
        try {
            if (!quest.getQuestCanSee(item))
                return;

            if (user.getQuestCount(item) >= quest.getQuestLineMax(item))
                return;

            if (questList[item].skin === '' || item === 'standart')
                return;

            if (user.getQuestCount(item) > 0) {
                mp.blips.new(280, quest.getQuestPos(item),
                    {
                        color: 5,
                        scale: 0.6,
                        drawDistance: 100,
                        shortRange: true,
                        dimension: -1
                    });
            }
            else {
                mp.blips.new(280, quest.getQuestPos(item),
                    {
                        color: 5,
                        scale: 0.6,
                        drawDistance: 100,
                        shortRange: false,
                        dimension: -1
                    });
            }
        }
        catch (e) {
            methods.debug('LOAD_ALL_QUESTS_BLIPS', e.toString())
        }
    });
};

quest.notify = function(title, award) {
    mp.game.ui.notifications.showWithPicture(title, '~g~Задание выполнено', `Вы получили награду ~g~${award}`, "CHAR_ACTING_UP", 1);
};

quest.notifyDone = function(title) {
    mp.game.ui.notifications.showWithPicture(title, '~g~Задание выполнено', `Вы выполнили квест`, "CHAR_ACTING_UP", 1);
};
quest.detective = function(isBot = false, start = -1, done = 0) {

    try {
        let qName = 'detective';

        if (start < 0)
            start = user.getQuestCount(qName);

        if (start >= quest.getQuestLineMax(qName))
            return;

        switch (start) {
            case 0: {

                if (!isBot)
                    return;
                user.setQuest(qName, 1);

                npc.showDialogDetective('Меня звать Фрич, я детектив. Короче ближе к сути, у меня сейчас дело, по поводу пропажи человека вот его координаты, сгоняй узнай информацию, остальное пришлю тебе на телефон.');
                setTimeout(() => {
                    user.setWaypoint(-810.9563598632812, -992.243896484375)
                    user.sendPhoneNotify('Детектив', 'Работенка', 'Так, координаты я тебе прислал, давай, пиздуй туда и всё разнюхай.')
                }, 6500);
                break;
            }
            case 1: {
                if (done === start) {
                    return;
                }
                if (!isBot)
                    return;
                
                break;
            }
            case 2: {

                if (isLamar) {
                    isLamar = false;
                    jobPoint.delete();

                    user.setQuest(qName, 3);
                    user.addCashMoney(100, 'Помощь Ламару');
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    return;
                }

                if (!isBot)
                    return;
                isLamar = true;
                npc.showDialogLamar('Так, я хочу рассказать что у нас есть большое количество различных группировок, с частью из них я познакомлю тебя прямо сейчас, координаты дам тебе в GPS, отправляйся туда и освойся, но будь аккуратен, ребята не очень любят когда долго чужаки тусят на их районе');
                _checkpointId = jobPoint.create(questLamarShop[_currentCheckpointId], true, 3);
                break;
            }
            case 3: {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(500);
                    quest.gang();
                    return;
                }
                if (!isBot)
                    return;
                npc.showDialogLamar(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 4: {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(1000);
                    quest.gang();
                    user.save();
                    return;
                }
                if (!isBot)
                    return;
                npc.showDialogLamar(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 5:
            case 6:
            case 7:
            case 8:
            {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCryptoMoney(1);
                    quest.gang();
                    return;
                }
                if (!isBot)
                    return;
                npc.showDialogLamar(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 9:
            case 10:
            {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCryptoMoney(10);
                    quest.gang();
                    return;
                }
                if (!isBot)
                    return;
                npc.showDialogLamar(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 11:
            {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCryptoMoney(20);
                    quest.gang();
                    return;
                }
                if (!isBot)
                    return;
                npc.showDialogLamar(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 12:
            case 13:
            {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCryptoMoney(50);
                    quest.gang();
                    return;
                }
                if (!isBot)
                    return;
                npc.showDialogLamar(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 14:
            {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCryptoMoney(100);
                    quest.gang();
                    user.save();
                    return;
                }
                if (!isBot)
                    return;
                npc.showDialogLamar(quest.getQuestLineInfo(qName, start));
                break;
            }
        }
    }
    catch (e) {
        methods.debug('Q_GANG', e.toString())
    }
};
quest.gang = function(isBot = false, start = -1, done = 0) {

    try {
        quest.standart(false, -1, 8);

        let qName = 'gang';

        if (start < 0)
            start = user.getQuestCount(qName);

        if (start >= quest.getQuestLineMax(qName))
            return;

        switch (start) {
            case 0: {

                if (phone.getType() == 0) {
                    mp.game.ui.notifications.show(`~r~Для того, чтобы начать квест, необходимо иметь телефон`);
                    return;
                }
                if (!isBot)
                    return;
                user.setQuest(qName, 1);
                
                methods.callRemote('server:user:generateCryptoCard');

                npc.showDialogLamar('Васап друг, вот держи ссылку, теперь у тебя есть доступ к приложению E-Corp, мы все сейчас через него работаем, крутая штука. Если подробнее, то открой консоль в телефоне и впиши команду ecorp. В общем, вся криминальная жизнь проходит через приложение E-Corp. Люди сами выбирают как будет выглядеть их организация и чем она будет заниматься, но чтобы ты смог в неё попасть или создать свою, тебе необходимо иметь соответсвующую репутацию. Все наводки от меня, у тебя доступны в приложении E-Corp, я буду тебе всё присылать.');
                break;
            }
            case 1: {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(200);
                    quest.gang();
                    ui.showDialog('Теперь вам доступны перевозки фургона Ламара, как дополнительный доход. Для того, чтобы продолжить квестовое задание, езжайте к Ламару', 'Информация');
                    return;
                }
                if (!isBot)
                    return;
                npc.showDialogLamar(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 2: {

                if (isLamar) {
                    isLamar = false;
                    jobPoint.delete();

                    user.setQuest(qName, 3);
                    user.addCashMoney(100, 'Помощь Ламару');
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    return;
                }

                if (!isBot)
                    return;
                isLamar = true;
                npc.showDialogLamar('Так, я хочу рассказать что у нас есть большое количество различных группировок, с частью из них я познакомлю тебя прямо сейчас, координаты дам тебе в GPS, отправляйся туда и освойся, но будь аккуратен, ребята не очень любят когда долго чужаки тусят на их районе');
                _checkpointId = jobPoint.create(questLamarShop[_currentCheckpointId], true, 3);
                break;
            }
            case 3: {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(500);
                    quest.gang();
                    return;
                }
                if (!isBot)
                    return;
                npc.showDialogLamar(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 4: {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(1000);
                    quest.gang();
                    user.save();
                    return;
                }
                if (!isBot)
                    return;
                npc.showDialogLamar(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 5:
            case 6:
            case 7:
            case 8:
            {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCryptoMoney(1);
                    quest.gang();
                    return;
                }
                if (!isBot)
                    return;
                npc.showDialogLamar(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 9:
            case 10:
            {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCryptoMoney(10);
                    quest.gang();
                    return;
                }
                if (!isBot)
                    return;
                npc.showDialogLamar(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 11:
            {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCryptoMoney(20);
                    quest.gang();
                    return;
                }
                if (!isBot)
                    return;
                npc.showDialogLamar(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 12:
            case 13:
            {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCryptoMoney(50);
                    quest.gang();
                    return;
                }
                if (!isBot)
                    return;
                npc.showDialogLamar(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 14:
            {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCryptoMoney(100);
                    quest.gang();
                    user.save();
                    return;
                }
                if (!isBot)
                    return;
                npc.showDialogLamar(quest.getQuestLineInfo(qName, start));
                break;
            }
        }
    }
    catch (e) {
        methods.debug('Q_GANG', e.toString())
    }
};

quest.role0 = function(isBot = false, start = -1) {

    try {
        return;
        /*if (user.getCache('role') !== 0)
            return;*/

        let qName = 'role_0';

        if (start < 0)
            start = user.getQuestCount(qName);

        if (start >= quest.getQuestLineMax(qName))
            return;

        switch (start) {
            case 0: {
                if (!isBot)
                    return;
                user.showCustomNotify('Список ваших квестов можно посмотреть через M -> Квесты', 0, 5, 20000);
                ui.showDialog('Привет, я смотрю ты только приехал, у меня для тебя работка есть, уверен лишние деньги тебе не помешают. В общем, необходимо разгрузить 20 ящиков с корабля, как будешь готов, я выдам тебе форму', 'Каспер');
                break;
            }
            case 1: {
                if(user.getCache('work_lic') != '') {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.set('work_lvl', user.getCache('work_lic') + 1);
                    user.setQuest(qName, 2);
                    return;
                }
                if (!isBot)
                    return;
                ui.showDialog('Ты не плохо справился, езжай теперь к зданию правительства, там можешь поговорить с Сюзанной', 'Каспер');
                user.setWaypoint(-1379.659, -499.748);
                break;
            }
        }
    }
    catch (e) {
        methods.debug('Q_ROLE', e.toString());
    }
};

quest.standart = function(isBot = false, start = -1, done = 0) {

    try {
        let qName = 'standart';

        if (start < 0)
            start = user.getQuestCount(qName);

        if (start >= quest.getQuestLineMax(qName))
            return;

        switch (start) {
            case 0: {

                if(user.getCache('b_lic')) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(100);
                    user.buyLicense('a_lic', 0.10);
                    quest.standart();
                    return;
                }

                if (!isBot)
                    return;
                user.showCustomNotify('Список ваших квестов можно посмотреть через M -> Квесты', 0, 5, 20000);
                if (ui.isIslandZone())
                    npc.showDialogStandartIsland('Привет, тебе необходимо сейчас в здании правительства, которое находиться позади меня, оформить лицензию категории B. И да, не забудь экипировать телефон, он у тебя в инвентаре.');
                else
                    npc.showDialogStandart('Привет, тебе необходимо сейчас в здании правительства, которое находиться позади меня, оформить лицензию категории B. И да, не забудь экипировать телефон, он у тебя в инвентаре.');
                break;
            }
            case 1: {
                if(user.getCache('job') > 0) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(200);
                    quest.standart();
                    return;
                }
                if (!isBot)
                    return;
                if (ui.isIslandZone())
                    npc.showDialogStandartIsland('Устройся на работу садовника или строителя, чтобы заработать свои первые деньги');
                else
                    npc.showDialogStandart('Устройся на работу садовника или строителя, чтобы заработать свои первые деньги');
                break;
            }
            case 2: {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(250);
                    quest.standart();
                    user.save();
                    return;
                }
                if (!isBot)
                    return;
                if (ui.isIslandZone())
                    npc.showDialogStandartIsland(quest.getQuestLineInfo(qName, start));
                else
                    npc.showDialogStandart(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 3: {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(500);
                    quest.standart();
                    return;
                }
                if (!isBot)
                    return;
                if (ui.isIslandZone())
                    npc.showDialogStandartIsland(quest.getQuestLineInfo(qName, start));
                else
                    npc.showDialogStandart(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 4:
            case 5:
            case 6:
            {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(200);
                    quest.standart();
                    return;
                }
                if (!isBot)
                    return;
                if (ui.isIslandZone())
                    npc.showDialogStandartIsland(quest.getQuestLineInfo(qName, start));
                else
                    npc.showDialogStandart(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 7: {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    inventory.addItem(474, 1, 1, user.getCache('id'), 1, 0, JSON.stringify({id:1}));
                    quest.standart();
                    user.save();
                    inventory.hide();
                    ui.showDialog('На проекте есть рецепты для крафта различных компонентов, некоторые вы получаете игровым путем, рецепт на большую аптечку можно купить у сотрудников EMS, также некоторые предметы имеют свойство ломаться, например оружие и бронежилеты, их необходимо чинить на специальных зонах для крафта, которые находятся в складах или в подвалах у банд', 'Информация');
                    return;
                }
                if (!isBot)
                    return;
                if (ui.isIslandZone())
                    npc.showDialogStandartIsland(quest.getQuestLineInfo(qName, start));
                else
                    npc.showDialogStandart(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 8: {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    quest.standart();
                    user.addCashMoney(200);
                    //let vehList = ['Emperor2', 'Tornado3', 'Tornado4', 'Rebel', 'Voodoo2'];
                    //user.giveVehicle(vehList[methods.getRandomInt(0, vehList.length)], 1, false, '', true);
                    return;
                }
                if (!isBot)
                    return;
                if (ui.isIslandZone())
                    npc.showDialogStandartIsland(quest.getQuestLineInfo(qName, start));
                else
                    npc.showDialogStandart(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 9: {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    quest.standart();
                    user.addCashMoney(500);
                    user.save();
                    ui.showDialog('У каждого транспорта есть свои уникальные характеристики, их можно посмотреть через панель транспорта нажав кнопку 2, открыв вкладку характеристики. Учтите, транспорт при авариях может повреждаться и из-за этого его ходовые качества будут изменяться', 'Информация');
                    return;
                }
                if (!isBot)
                    return;
                if (ui.isIslandZone())
                    npc.showDialogStandartIsland(quest.getQuestLineInfo(qName, start));
                else
                    npc.showDialogStandart(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 10:
            case 11:
            case 12:
            {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    quest.standart();
                    user.addCashMoney(2000);
                    return;
                }
                if (!isBot)
                    return;
                if (ui.isIslandZone())
                    npc.showDialogStandartIsland(quest.getQuestLineInfo(qName, start));
                else
                    npc.showDialogStandart(quest.getQuestLineInfo(qName, start));
                break;
            }
            case 13:
            {
                if (done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    quest.standart();
                    user.addCashMoney(20000);
                    user.save();
                    return;
                }
                if (!isBot)
                    return;
                if (ui.isIslandZone())
                    npc.showDialogStandartIsland(quest.getQuestLineInfo(qName, start));
                else
                    npc.showDialogStandart(quest.getQuestLineInfo(qName, start));
                break;
            }
        }
    }
    catch (e) {
        methods.debug('Q_ST', e.toString());
    }
};

quest.fish = function(isBot = false, start = -1, done = 0) {

    try {
        let qName = 'fish';

        if (start < 0)
            start = user.getQuestCount(qName);

        if (start >= quest.getQuestLineMax(qName))
            return;

        switch (start) {
            case 0: {
                if(user.getCache('fish_lic')) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(500);
                    return;
                }
                break;
            }
            case 1: {
                if(done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(100);
                    return;
                }
                break;
            }
            case 2: {
                if(done === start) {
                    let qParams = user.getQuestParams(qName);
                    if (methods.parseInt(qParams[0]) === 9) {
                        quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                        user.setQuest(qName, start + 1);
                        user.addCashMoney(200);
                    }
                    else {
                        qParams[0] = methods.parseInt(qParams[0]) + 1;
                        user.setQuest(qName, start, qParams);
                        mp.game.ui.notifications.show(`Квест\n~b~Вы поймали: ${qParams[0]}шт рыбы`);
                    }
                    return;
                }
                break;
            }
            case 3: {
                if(done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(200);
                    return;
                }
                break;
            }
            case 4: {
                if(done === start) {
                    let qParams = user.getQuestParams(qName);
                    if (methods.parseInt(qParams[1]) === 25) {
                        quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                        user.setQuest(qName, start + 1);
                        user.addCashMoney(1000);
                        inventory.addItem(474, 1, 1, user.getCache('id'), 1, 0, JSON.stringify({id:3}));
                    }
                    else {
                        qParams[1] = methods.parseInt(qParams[1]) + 1;
                        user.setQuest(qName, start, qParams);
                        mp.game.ui.notifications.show(`Квест\n~b~Вы поймали: ${qParams[1]}шт американская палии`);
                    }
                    return;
                }
                break;
            }
            case 5: {
                if(done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(250);
                    return;
                }
                break;
            }
            case 6: {
                let qParams = user.getQuestParams(qName);
                if (methods.parseInt(qParams[2]) === 5) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(1500);
                }
                else {
                    qParams[2] = methods.parseInt(qParams[2]) + 1;
                    user.setQuest(qName, start, qParams);
                    mp.game.ui.notifications.show(`Квест\n~b~Вы поймали: ${qParams[2]}шт рыбы`);
                }
                break;
            }
            case 7: {
                let qParams = user.getQuestParams(qName);
                if (methods.parseInt(qParams[3]) === 5) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(5000);
                }
                else {
                    qParams[3] = methods.parseInt(qParams[3]) + 1;
                    user.setQuest(qName, start, qParams);
                    mp.game.ui.notifications.show(`Квест\n~b~Вы поймали: ${qParams[3]}шт рыбы`);
                }
                break;
            }
        }
    }
    catch (e) {
        methods.debug('Q_FISH', e.toString());
    }
};

quest.business = function(isBot = false, start = -1, done = 0) {

    try {
        let qName = 'business';

        if (start < 0)
            start = user.getQuestCount(qName);

        if (start >= quest.getQuestLineMax(qName))
            return;

        switch (start) {
            case 0: {
                if(user.getCache('biz_lic')) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(500);
                    return;
                }
                break;
            }
            case 1: {
                if(user.getCache('business_id') > 0) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(500);
                    return;
                }
                break;
            }
            case 2: {
                if(done === start) {
                    quest.notify(quest.getQuestLineName(qName, start), quest.getQuestLinePrize(qName, start));
                    user.setQuest(qName, start + 1);
                    user.addCashMoney(5000);
                    return;
                }
                break;
            }
        }
    }
    catch (e) {
        methods.debug('Q_BIZ', e.toString());
    }
};

quest.driftking = function(isBot = false, start = -1, done = 0) {

    try {
        let qName = 'driftking';

        if (start < 0)
            start = user.getQuestCount(qName);

        if (start >= quest.getQuestLineMax(qName))
            return;

        switch (start) {
            case 0: {
                if (done === start) {
                    quest.notifyDone(quest.getQuestLineName(qName, start));
                    user.setQuest(qName, start + 1);
                    return;
                }
                break;
            }
            case 1: {
                let qParams = user.getQuestParams(qName);
                if (methods.parseInt(qParams[0]) === 0) {
                    user.setQuest(qName, start, [1]);
                    user.sendMessageNumber('911', user.getCache('phone'), 'Ваше заявление было принято сотрудинками LSPD', 's/GTAO/n/gtao38.png');
                    return;
                }
                else if(methods.parseInt(qParams[0]) >= 8) {
                    user.setQuest(qName, start + 1);
                    user.sendMessageNumber('Фрэнк', user.getCache('phone'), 'Привет, я слышал твою тачку угнали, обратись к Ламару за помощью, я уверен он сможет тебе помочь', 's/MaxPayne3/n/MP3_24.png');
                    return;
                }
                qParams[0] = methods.parseInt(qParams[0]) + 1;
                user.setQuest(qName, start, qParams);
                break;
            }
            case 2: {
                let qParams = user.getQuestParams(qName);
                if (methods.parseInt(qParams[0]) === 0) {
                    if (user.getCashMoney() < 5000) {
                        mp.game.ui.notifications.show(`~r~У вас нет $5000 долларов с собой наличными, чтобы заплатить Ламару`);
                        return;
                    }
                    user.removeCashMoney(5000, 'Взятка Ламару');
                    user.setQuest(qName, start, [1]);
                    user.sendMessageNumber('Ламар', user.getCache('phone'), 'Ожидай по тачке инфу, я ее скоро закину', 's/GTAO/n/gtao45.png');
                    return;
                }
                else if(methods.parseInt(qParams[0]) >= 8) {
                    user.setQuest(qName, start + 1);
                    user.sendMessageNumber('Ламар', user.getCache('phone'), 'Нашел малыху, тебе надо ебануть через консоль, команда deadinside.py и пробить тачку по номеру LGBT, говорят эти хуесосы водятся в корейском районе, удачи бро', 's/GTAO/n/gtao45.png');
                    return;
                }
                if (!isBot) {
                    qParams[0] = methods.parseInt(qParams[0]) + 1;
                    user.setQuest(qName, start, qParams);
                }
                break;
            }
            case 3: {
                user.setQuest(qName, start + 1);
                user.sendMessageNumber('deadinside.py', user.getCache('phone'), 'Информация по транспорту: ' + user.getCache('prolog_vehicle') + ', транспорт зарегистрирован в аэропорту Sandy на имя Сальвадоре', 's/Exclusives/n/Skull.png');
                break;
            }
            case 4: {
                user.setQuest(qName, start + 1);
                break;
            }
            case 5: {
                //user.setQuest(qName, start + 1);
                break;
            }
        }
    }
    catch (e) {
        methods.debug('Q_BIZ', e.toString());
    }
};

quest.weekend = function(isBot = false, start = -1, done = 0) {

    try {
        let qName = 'weekend';

        if (start < 0)
            start = user.getQuestCount(qName);

        if (start >= quest.getQuestLineMax(qName))
            return;

        switch (start) {
            case 0: {
                if (done === start) {
                    quest.notifyDone(quest.getQuestLineName(qName, start));
                    user.setQuest(qName, start + 1);
                    inventory.takeNewItemJust(261);
                    return;
                }
                break;
            }
            case 1: {
                if (done === start) {
                    quest.notifyDone(quest.getQuestLineName(qName, start));
                    user.setQuest(qName, start + 1);
                    inventory.takeNewItemJust(254);
                    return;
                }
                break;
            }
            case 2: {
                if (done === start) {
                    quest.notifyDone(quest.getQuestLineName(qName, start));
                    user.setQuest(qName, start + 1);
                    inventory.takeNewItemJust(255);
                    return;
                }
                break;
            }
            case 3: {
                if (done === start) {
                    quest.notifyDone(quest.getQuestLineName(qName, start));
                    user.setQuest(qName, start + 1);
                    inventory.takeNewItemJust(256);
                    return;
                }
                break;
            }
            case 4: {
                if (done === start) {
                    quest.notifyDone(quest.getQuestLineName(qName, start));
                    user.setQuest(qName, start + 1);
                    inventory.takeNewItemJust(260);
                    return;
                }
                break;
            }
            case 5: {
                if (done === start) {
                    quest.notifyDone(quest.getQuestLineName(qName, start));
                    user.setQuest(qName, start + 1);
                    inventory.takeNewItemJust(257);
                    return;
                }
                break;
            }
            case 6: {
                if (done === start) {
                    quest.notifyDone(quest.getQuestLineName(qName, start));
                    user.setQuest(qName, start + 1);
                    inventory.takeNewItemJust(258);
                    return;
                }
                break;
            }
            case 7: {
                if (done === start) {
                    quest.notifyDone(quest.getQuestLineName(qName, start));
                    user.setQuest(qName, start + 1);
                    inventory.takeNewItemJust(259);
                    return;
                }
                break;
            }
            case 8: {
                if (done === start) {
                    quest.notifyDone(quest.getQuestLineName(qName, start));
                    user.setQuest(qName, start + 1);
                    user.giveVehicle('Speedo2');
                    return;
                }
                break;
            }
        }
    }
    catch (e) {
        methods.debug('Q_WEEKEND', e.toString());
    }
};

quest.getQuestAllNames = function() {
    return questNames;
};

quest.getQuestAll = function() {
    return questList;
};

quest.getQuestName = function(type) {
    try {
        return questList[type].name;
    }
    catch (e) {}
    return '';
};

quest.getQuestPos = function(type) {
    try {
        return questList[type].pos;
    }
    catch (e) {}
    return new mp.Vector3(0,0,0);
};

quest.getQuestCanSee = function(type) {
    try {
        return questList[type].canSee();
    }
    catch (e) {}
    return false;
};

quest.getQuestLineMax = function(type) {
    try {
        return questList[type].tasks.length;
    }
    catch (e) {}
    return 0;
};

quest.getQuestLineName = function(type, lineId) {
    try {
        return questList[type].tasks[lineId][0];
    }
    catch (e) {}
    return 'Квест завершён';
};

quest.getQuestLinePos = function(type, lineId) {
    try {
        return {x: methods.parseInt(questList[type].tasks[lineId][3]), y: methods.parseInt(questList[type].tasks[lineId][4])};
    }
    catch (e) {}
    return {x: 0, y: 0};
};

quest.getQuestLineInfo = function(type, lineId) {
    try {
        return questList[type].tasks[lineId][1];
    }
    catch (e) {}
    return 'Квест завершён';
};

quest.getQuestLinePrize = function(type, lineId) {
    try {
        return questList[type].tasks[lineId][2];
    }
    catch (e) {}
    return 'Квест завершён';
};

new_events.add("playerEnterCheckpoint", (checkpoint) => {
    try {
        if (_checkpointId == -1 || _checkpointId == undefined)
            return;
        if (checkpoint.id == _checkpointId) {

            if (isLamar) {

                if (_currentCheckpointId === 0)
                    ui.showDialog('Это банда The Ballas Gang, этническая состовляющая - Афроамериканцы. Баллас одеты в цвета баскетбольной команды Los Santos Panic и бейсбольной команды Los Santos Boars. Фиолетовые в общем.', 'Информация');
                if (_currentCheckpointId === 1)
                    ui.showDialog('Это банда The Families, этническая состовляющая - Афроамериканцы. Банда не едина, и поэтому по контролируемой территории кенты делятся на отдельные группировки, называемые сэтами.', 'Информация');
                if (_currentCheckpointId === 2)
                    ui.showDialog('Это банда Los Santos Vagos, этническая состовляющая - Латиноамериканцы. По слухам — самая многочисленная мексиканская уличная банда в Лос-Сантосе.', 'Информация');
                if (_currentCheckpointId === 3)
                    ui.showDialog('Это банда The Bloods, этническая состовляющая - Афроамериканцы. Предводитель этой банды Mathew Fox, заняли себе самое сочное место в промозоне, потому что именно здесь хранятся огромное количество нелегала', 'Информация');
                if (_currentCheckpointId === 4)
                    ui.showDialog('Это банда Marabunta Grande, этническая состовляющая - Латиноамериканцы. Членов банды легко идентифицировать по многочисленным татуировкам, в том числе и на лицах.', 'Информация');

                _currentCheckpointId++;
                if (_currentCheckpointId >= questLamarShop.length) {
                    quest.gang();
                    return;
                }
                _checkpointId = jobPoint.create(questLamarShop[_currentCheckpointId], true, 3);
            }
        }
    }
    catch (e) {
        
    }
});

export default quest;