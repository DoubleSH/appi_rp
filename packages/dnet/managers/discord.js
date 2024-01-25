const webhook = require("webhook-discord");

let mysql = require('../modules/mysql');
let methods = require('../modules/methods');
let user = require('../user');

let discord = exports;

discord.report = "https://discordapp.com/api/webhooks/682573681415028740/l0tkdhaVqlCLa_JZQ6xnAE1lE2aZejqq8Zj_x8QvUlAH8hoIB6frc6uZpUPfx3C7K8Ah";
discord.deadlist = "https://discord.com/api/webhooks/1026799431451951164/sQsgUg5Ig0N5JZkeuGzscoFe-dCOFWH14qHdW8pUFuxn8o23vzQyZdRyqysvmrPJhI0M";
discord.invaderAd = "https://discord.com/api/webhooks/800626231351312425/No7GOZ8TxubI-CbIX9ylGQmRoNv3sxG2ONJSSY2bwIrGdjwdILeulTYqgnedvl36-GPc";
discord.invaderNews = "https://discord.com/api/webhooks/1026800037814095902/RMdoJBFSZapddLDJPbRbSxLoShlvb-x6xEIbIF1zoTTd_A0lkI9L-3CUX-raxRRYFBsr";
discord.fractionNews = "https://discord.com/api/webhooks/1026800037814095902/RMdoJBFSZapddLDJPbRbSxLoShlvb-x6xEIbIF1zoTTd_A0lkI9L-3CUX-raxRRYFBsr";

discord.workBcsd = "https://discord.com/api/webhooks/1026806450506436608/EF_-zHgE62ctqGsKo-AFDbyhroasLwJXQ2y6DQkUp9ekqeAo1V-uWoNzrfxOimGBXU_L";
discord.workLspd = "https://discord.com/api/webhooks/1026805896891875398/mXhE8DYkNIleBfYrZkpakVvHABubwtpg_VBlfONq4alIwEanEVNRZ3RYq1u1UY55_uNz";
discord.workUsmc = "https://discord.com/api/webhooks/1026806950777860160/0CmQyE69eLR9DDvWjtURF5FWjh8RsUBBQMlu0THLiGsylM3k3aTjpG032PvjF9AEIb-m";
discord.workNews = "https://discord.com/api/webhooks/1026807182731251712/nF2Bu-i_Y937Hok39GzLno89vmMRnlE94217-xybgJDwR96NRRk1RNO2LLtYGSvub51C";
discord.workEms = "https://discord.com/api/webhooks/1026806684494086214/Nm7UuuErovHybeckf7Nt5z932oZ-1MNWqB20rQawxnQ-noo5CtGN1_fafdgN5DlGuuOm";
discord.workGov = "https://discord.com/api/webhooks/1026807387635580938/MPTMFn1zw-wwxkXl-6opTK2OR7ncTdEMdf1gwp-SAJzoMzE5WR1mQHe8tmXfkPxeCP9m";

discord.marketProperty = "https://discord.com/api/webhooks/1026801646212239360/Gn9m7js6l5J0nCrj9mbggilCKI-29ovLeFfqifxnf6D1FDGZSxmsDPw9zmuy_0uLaIvT";
discord.marketBusiness = "https://discord.com/api/webhooks/1026801544018018384/uyvc6_AolhU7VDvpa0C6AZQw0HBSaBo-aEa9Uqsq5UEbannpVnbMwpaHGlBNckKYW1VW";
discord.marketVehicles = "https://discord.com/api/webhooks/1026800537250836511/T-NZh5jK85_HqJm_8EvH_2AZXiXdpJ-njD_pja-TyI8tv-AIH1ORMqbK9Jgr_A10Tbgi";
discord.marketClothes = "https://discord.com/api/webhooks/1026801852236443678/JV4ow4zFT4aaWTVaNQTHW5rTHudli9Ab_WFr_reTeoMW5lsAvq8lTST6ry8hU_XKcUs4";
discord.marketGuns = "https://discord.com/api/webhooks/1026801723974635541/84tSwPytczrSCyB4h00xnP7WrmjAt20GOhW0F2_e9wvDpdCfcbiMk7l2ajH_NPTsuH90";
discord.marketServices = "https://discord.com/api/webhooks/1026801780182487110/C0iSL9Ks-lD2wBKcNmTsqveTpk3A9azFMqxiruz36L5wvxYbYKHnlSVqcf6taZtSVKLH";
discord.marketOther = "https://discord.com/api/webhooks/1026801914488307742/tTOe5T_mt-kf8vhzNOB-tbyCb_y1Jl-Dja4Qwm4hKwCURpMqCZ6qXBEazObXamJ1x-C_";

discord.dednetImg = "https://appi-rp.ru/client/images/logo/logo.png";
discord.socialClub = "https://a.rsg.sc/n/";

discord.imgGov = "https://i.imgur.com/eFGOitl.png";
discord.imgLspd = "https://i.imgur.com/uRUp6ig.png";
discord.imgFib = "https://i.imgur.com/KaMdGAl.png";
discord.imgUsmc = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Seal_of_the_United_States_Marine_Corps.svg/1012px-Seal_of_the_United_States_Marine_Corps.svg.png";
discord.imgSheriff = "https://i.imgur.com/sOPdklt.png";
discord.imgEms = "https://i.imgur.com/MoMutqI.png";
discord.imgInvader = "https://i.imgur.com/AQgXiqa.png";

discord.colorGov = "#795548";
discord.colorLspd = "#2196F3";
discord.colorFib = "#212121";
discord.colorUsmc = "#9E9E9E";
discord.colorSheriff = "#8BC34A";
discord.colorEms = "#f44336";
discord.colorInvader = "#FFEB3B";

discord.sendFractionList = function (title, sender, message, senderImg = discord.dednetImg, avatar = discord.imgGov, color = "#f44336") {
    methods.debug('discord.sendFractionList', title, sender, message, senderImg, avatar, color);
    const Hook = new webhook.Webhook(discord.fractionNews);
    const msg = new webhook.MessageBuilder()
        .setName('Новости Штата')
        .setTitle(sender)
        .setAvatar(avatar)
        .setDescription(methods.replaceAllGtaSymb(message))
        .setFooter(title, senderImg)
        .setColor(color)
        .setTime();

    Hook.send(msg);
};

discord.sendDeadList = function (target, desc, reason, sender = 'Server', senderImg = discord.dednetImg, color = "#f44336") {

    methods.debug('discord.sendDeadList', target, desc, reason, sender, senderImg, color);

    const Hook = new webhook.Webhook(discord.deadlist);

    const msg = new webhook.MessageBuilder()
        .setName("Нарушения")
        .setTitle(target)
        .addField("Описание", desc)
        .addField("Причина", reason)
        .setFooter(sender, senderImg)
        .setColor(color)
        .setTime();

    Hook.send(msg);
};

discord.sendAd = function (title, name, text, phone, editor, editorImg) {

    methods.debug('discord.sendAd', title, name, text, phone, editor, editorImg);

    let hookUrl = discord.marketOther;
    if (title === 'Бизнес')
        hookUrl = discord.marketBusiness;
    if (title === 'Недвижимость')
        hookUrl = discord.marketProperty;
    if (title === 'Транспорт')
        hookUrl = discord.marketVehicles;
    if (title === 'Оружие')
        hookUrl = discord.marketGuns;
    if (title === 'Одежда')
        hookUrl = discord.marketClothes;
    if (title === 'Услуга')
        hookUrl = discord.marketServices;

    const Hook = new webhook.Webhook(hookUrl);

    let color = "#607D8B";
    const msg = new webhook.MessageBuilder()
        .setName('Рекламное объявление')
        .setTitle(title)
        .setAvatar(discord.imgInvader)
        .addField(`Телефон`, `\`\`\`${phone}\`\`\``, true)
        .addField(`Отправитель`, `\`\`\`${name}\`\`\``, true)
        .setDescription(`\`\`\`fix\n${text}\`\`\``)
        .setFooter(editor, 'https://a.rsg.sc/n/' + editorImg.toLowerCase())
        .setColor(color)
        .setTime();

    Hook.send(msg);
};

discord.sendNews = function (title, text, editor, editorImg) {
    methods.debug('discord.sendNews', title, text, editor, editorImg);

    const Hook = new webhook.Webhook(discord.invaderNews);
    const msg = new webhook.MessageBuilder()
        .setName('Новости')
        .setTitle(title)
        .setDescription(methods.replaceAllGtaSymb(text))
        .setFooter(editor, 'https://a.rsg.sc/n/' + editorImg.toLowerCase())
        .setColor("#f44336")
        .setTime();

    Hook.send(msg);
};

discord.sendWork = function (url, player, dscrd, text) {
    if (!user.isLogin(player))
        return;
    methods.debug('discord.sendWork', url, dscrd, text);

    let history = '';
    let sender = `${user.getRpName(player)} (${user.getId(player)})`;
    let phone = methods.phoneFormat(user.get(player, 'phone'));
    let senderImg = player.socialClub.toLowerCase();

    mysql.executeQuery(`SELECT * FROM log_player WHERE user_id = ${user.getId(player)} AND type = 1 ORDER BY id DESC LIMIT 5`, (err, rows, fields) => {
        if (rows.length > 0) {
            try {
                rows.forEach(row => {
                    history += `${methods.unixTimeStampToDateTimeShort(row['timestamp'])} | ${row['do']}\n`;
                });
            }
            catch (e) {
                methods.debug(e);
            }
        }

        if (history === '')
            history = 'Криминальной истории - нет';

        const Hook = new webhook.Webhook(url);
        const msg = new webhook.MessageBuilder()
            .setName('Заявление')
            .setTitle(sender)
            .setDescription(text)
            .addField(`Телефон`, `\`\`\`${phone}\`\`\``, true)
            .addField(`Дискорд`, `\`\`\`${dscrd}\`\`\``, true)
            .addField(`Work ID`, `\`\`\`${user.get(player, 'work_lvl')} / ${user.get(player, 'work_exp')}\`\`\``, true)
            .addField(`История`, `\`\`\`${history}\`\`\``)
            .setFooter(sender, 'https://a.rsg.sc/n/' + senderImg)
            .setColor("#f44336")
            .setTime();

        Hook.send(msg);
    });
};

discord.sendMarketProperty = function (title, text) {
    methods.debug('discord.sendMarketProperty', title, text);
    const Hook = new webhook.Webhook(discord.marketProperty);
    const msg = new webhook.MessageBuilder()
        .setName('Новости имущества')
        .setTitle(title)
        .setDescription(`\`\`\`ml\n${text}\`\`\``)
        .setFooter('Правительство', discord.imgGov)
        .setColor("#f44336")
        .setTime();
    Hook.send(msg);
};

discord.sendMarketBusiness = function (title, text) {
    methods.debug('discord.sendMarketBusiness', title, text);
    const Hook = new webhook.Webhook(discord.marketBusiness);
    const msg = new webhook.MessageBuilder()
        .setName('Новости бизнеса')
        .setTitle(title)
        .setDescription(`\`\`\`ml\n${text}\`\`\``)
        .setFooter('Правительство', discord.imgGov)
        .setColor("#f44336")
        .setTime();
    Hook.send(msg);
};

discord.sendMarketVehicles = function (title, text, imgUrl) {
    methods.debug('discord.sendMarketVehicles', title, text, imgUrl);
    const Hook = new webhook.Webhook(discord.marketVehicles);
    const msg = new webhook.MessageBuilder()
        .setName('Новости транспорта')
        .setTitle(title)
        .setDescription(`\`\`\`ml\n${text}\`\`\``)
        .setImage(imgUrl)
        .setFooter('Правительство', discord.imgGov)
        .setColor("#f44336")
        .setTime();
    Hook.send(msg);
};