let user = require('../user');
let enums = require('../enums');

let methods = require('./methods');

let fraction = require('../property/fraction');

let gangWar = require('../managers/gangWar');
let mafiaWar = require('../managers/mafiaWar');
let canabisWar = require('../managers/canabisWar');
let racer = require('../managers/racer');
let graffiti = require('../managers/graffiti');

let chat = exports;

let range = 15;

chat.clRed = '#f44336';
chat.clBlue = '#03A9F4';
chat.clGreen = '#8BC34A';
chat.clOrange = '#FFC107';
chat.clWhite = '#FFFFFF';
chat.clBlack = '#000000';

chat.sendBCommand = function (player, text) {
    methods.debug('chat.sendBCommand');
    if (user.isLogin(player)) {
        mp.players.forEach(nplayer => {
            if (!user.exists(nplayer)) return;
            let name = user.getDating(nplayer, user.getId(player));
            if (name.length > 0) {
                if (nplayer.dimension == player.dimension && methods.distanceToPos(player.position, nplayer.position) <= range) {
                    nplayer.outputChatBoxNew(
                        `[${chat.getTime()}] !{2196F3} ${name} (${user.getSvId(player)}): !{FFFFFF} (( ${text} )) `
                    )
                }

            }
            else if (nplayer == player) {
                if (nplayer.dimension == player.dimension && methods.distanceToPos(player.position, nplayer.position) <= range) {
                    nplayer.outputChatBoxNew(
                        `[${chat.getTime()}] !{2196F3} ${user.getRpName(player)} (${user.getSvId(player)}): !{FFFFFF} (( ${text} )) `
                    )
                }

            }
            else {
                if (nplayer.dimension == player.dimension && methods.distanceToPos(player.position, nplayer.position) <= range) {
                    nplayer.outputChatBoxNew(
                        `[${chat.getTime()}] !{2196F3} Игрок (${user.getSvId(player)}): !{FFFFFF} (( ${text} )) `
                    )
                }

            }
        })
        methods.saveLog('log_chat', ['text'], [`/try ${user.getRpName(player)} (${user.getId(player)}): ${methods.removeQuotes(methods.removeQuotes2(text))}`]);
    }
};
chat.sendTryCommand = function (player, text) {
    methods.debug('chat.sendTryCommand');
    if (user.isLogin(player)) {
        let lucky = methods.getRandomInt(0, 2) == 0 ? '!{d90f0f} Не успешно !{FFFFFF}' : '!{20d604} Успешно !{FFFFFF}'
        mp.players.forEach(nplayer => {
            if (!user.exists(nplayer)) return;
            let name = user.getDating(nplayer, user.getId(player));
            if (name.length > 0) {
                if (nplayer.dimension == player.dimension && methods.distanceToPos(player.position, nplayer.position) <= range) {
                    nplayer.outputChatBoxNew(
                        `[${chat.getTime()}] !{C2A2DA}${user.getSvId(player)} ${text}`
                    )
                }

            }
            else if (nplayer == player) {
                if (nplayer.dimension == player.dimension && methods.distanceToPos(player.position, nplayer.position) <= range) {
                    nplayer.outputChatBoxNew(
                        `[${chat.getTime()}] !{C2A2DA} ${text} (( !{FFFFFF} ${lucky
                        } | !{FFFFFF} ${user.getRpName(player)} (${user.getSvId(player)}) !{C2A2DA}))`
                    )
                }

            } else {
                if (nplayer.dimension == player.dimension && methods.distanceToPos(player.position, nplayer.position) <= range) {
                    nplayer.outputChatBoxNew(
                        `[${chat.getTime()}] !{C2A2DA} ${text} (( !{FFFFFF} ${lucky
                        } | !{FFFFFF} Гражданин(${user.getSvId(player)}) !{C2A2DA}))`
                    )
                }

            }
        })

    }
};

chat.sendDoCommand = function (player, text) {
    methods.debug('chat.sendDoCommand');
    if (user.isLogin(player)) {
        mp.players.forEach(nplayer => {
            if (!user.exists(nplayer)) return;
            let name = user.getDating(nplayer, user.getId(player));
            if (name.length > 0) {
                if (nplayer.dimension == player.dimension && methods.distanceToPos(player.position, nplayer.position) <= range) {
                    nplayer.outputChatBoxNew(`[${chat.getTime()}] !{C2A2DA} ${text}  (( ${name} (${user.getSvId(player)}) )) `)
                }

            }
            else if (nplayer == player) {
                if (nplayer.dimension == player.dimension && methods.distanceToPos(player.position, nplayer.position) <= range) {
                    nplayer.outputChatBoxNew(`[${chat.getTime()}] !{C2A2DA} ${text}  (( ${user.getRpName(player)} (${user.getSvId(player)}) )) `)
                }

            } else {
                if (nplayer.dimension == player.dimension && methods.distanceToPos(player.position, nplayer.position) <= range) {
                    nplayer.outputChatBoxNew(`[${chat.getTime()}] !{C2A2DA} ${text}  (( Гражданин (${user.getSvId(player)}) )) `)
                }

            }
        })
        methods.saveLog('log_chat', ['text'], [`/do ${user.getRpName(player)} (${user.getId(player)}): ${methods.removeQuotes(methods.removeQuotes2(text))}`]);
    }
};
chat.sendMeCommand = function (player, text) {
    methods.debug('chat.sendMeCommand');
    if (user.isLogin(player)) {
        mp.players.forEach(nplayer => {
            if (!user.exists(nplayer)) return;
            let name = user.getDating(nplayer, user.getId(player));
            if (name.length > 0) {
                if (nplayer.dimension == player.dimension && methods.distanceToPos(player.position, nplayer.position) <= range) {
                    nplayer.outputChatBoxNew(
                        `[${chat.getTime()}] !{C2A2DA}* ${name} (${user.getSvId(player)}) ${text}`
                    )
                }

            }
            else if (nplayer == player) {
                if (nplayer.dimension == player.dimension && methods.distanceToPos(player.position, nplayer.position) <= range) {
                    nplayer.outputChatBoxNew(
                        `[${chat.getTime()}] !{C2A2DA}* ${user.getRpName(player)} (${user.getSvId(player)}) ${text}`
                    )
                }

            } else {
                if (nplayer.dimension == player.dimension && methods.distanceToPos(player.position, nplayer.position) <= range) {
                    nplayer.outputChatBoxNew(
                        `[${chat.getTime()}] !{C2A2DA}* Гражданин (${user.getSvId(player)}) ${text}`
                    )
                }

            }

        })
        methods.saveLog('log_chat', ['text'], [`/me ${user.getRpName(player)} (${user.getId(player)}): ${methods.removeQuotes(methods.removeQuotes2(text))}`]);
    }
};

chat.sendDiceCommandNumber = function (player, dice = 1) {
    methods.debug('chat.sendDiceCommandNumber');
    if (user.isLogin(player)) {
        mp.players.forEach(p => {
            if (user.isLogin(p) && p.dimension === player.dimension && methods.distanceToPos(player.position, p.position) <= range)
                p.outputChatBoxNew(`[${chat.getTime()}] !{FF9800}[Игра в кости] !{C2A2DA}${user.getSvId(player)} бросил кости !{FF9800}(( Выпало ${dice} ))`);
        });

        user.achiveDoneDailyById(player, 11);

        methods.saveLog('log_chat', ['text'], [`/dice ${user.getRpName(player)} (${user.getId(player)}): Выпало ${dice}`]);
    }
};
chat.send = function (player, text) {
    methods.debug('chat.send');
    if (user.isLogin(player)) {
        mp.players.forEach(nplayer => {
            if (!user.exists(nplayer)) return;
            let name = user.getDating(nplayer, user.getId(player));
            if (name.length > 0) {
                if (nplayer.dimension == player.dimension && methods.distanceToPos(player.position, nplayer.position) <= range) {
                    nplayer.outputChatBoxNew(
                        `[${chat.getTime()}] !{2196F3}${name} | (${user.getSvId(player)}) говорит:!{FFFFFF} ${text}`
                    )
                }

            } else if (nplayer == player) {
                if (nplayer.dimension == player.dimension && methods.distanceToPos(player.position, nplayer.position) <= range) {
                    nplayer.outputChatBoxNew(
                        `[${chat.getTime()}] !{2196F3}${user.getRpName(player)} (${user.getSvId(player)}) говорит:!{FFFFFF} ${text}`
                    )
                }

            } else {
                if (nplayer.dimension == player.dimension && methods.distanceToPos(player.position, nplayer.position) <= range) {
                    nplayer.outputChatBoxNew(
                        `[${chat.getTime()}] !{2196F3}Гражданин ( ${user.getSvId(player)} ) говорит:!{FFFFFF} ${text}`
                    )
                }

            }
        })
        methods.saveLog('log_chat', ['text'], [`${user.getRpName(player)} (${user.getId(player)}): ${methods.removeQuotes(methods.removeQuotes2(text))}`]);
    }
};

chat.sendToPlayer = function (player, text) {
    methods.debug('chat.sendToPlayer');
    if (user.isLogin(player)) {
        player.outputChatBoxNew(`[${chat.getTime()}] ${text}`);
    }
};

chat.sendPos = function (pos, range, sender, text, color = '2196F3') {
    methods.debug('chat.sendPos');
    mp.players.forEach(p => {
        if (user.isLogin(p) && methods.distanceToPos(pos, p.position) <= range)
            p.outputChatBoxNew(`[${chat.getTime()}] !{${color}} ${sender}:!{FFFFFF} ${text}`);
    });

    //mp.players.broadcastInRange(pos, range, `[${chat.getTime()}] !{${color}} ${sender}:!{FFFFFF} ${text}`);
};

chat.sendToAll = function (sender, text, color = '2196F3') {
    methods.debug('chat.sendToAll');
    mp.players.forEach(nuser => {
        if (!user.exists(nuser)) return;
        if (user.isLogin(nuser)) nuser.outputChatBoxNew(`[${chat.getTime()}] !{${color}} ${sender}:!{FFFFFF} ${text}`);
    })
    methods.saveLog('log_chat', ['text'], [`/all ${user.getRpName(sender)} (${user.getId(sender)}): ${methods.removeQuotes(methods.removeQuotes2(text))}`]);
};
chat.sendToAllAdm = function (sender, text, color = 'e50505') {
    methods.debug('chat.sendToAllAdm');
    mp.players.forEach(nuser => {
        if (!user.exists(nuser)) return;
        if (user.isLogin(nuser)) nuser.outputChatBoxNew(`[${chat.getTime()}] !{${color}} Администратор ${user.getRpName(sender)} (${user.getSvId(sender)}): ${text}`);
    })
    methods.saveLog('log_chat', ['text'], [`/messageadm ${user.getRpName(sender)} (${user.getId(sender)}): ${methods.removeQuotes(methods.removeQuotes2(text))}`]);
};

chat.sendToAdmin = function (sender, text, color = '#f44336') {

    methods.debug('chat.sendToAdmin');
    mp.players.forEach(p => {
        if (user.isLogin(p) && user.isAdmin(p))
            p.outputChatBoxNew(`[${chat.getTime()}] !{${color}} ${sender}:!{FFFFFF} ${text}`);
    });

    methods.saveLog('log_chat', ['text'], [`A: ${methods.removeQuotes(methods.removeQuotes2(text))}`]);
    //mp.players.broadcast(`[${chat.getTime()}] !{${color}} ${sender}:!{FFFFFF} ${text}`);
};

chat.sendToHelper = function (sender, text, color = '#8BC34A') {

    methods.debug('chat.sendToHelper');
    mp.players.forEach(p => {
        if (user.isLogin(p) && user.isHelper(p))
            p.outputChatBoxNew(`[${chat.getTime()}] !{${color}} ${sender}:!{FFFFFF} ${text}`);
    });

    methods.saveLog('log_chat', ['text'], [`H: ${methods.removeQuotes(methods.removeQuotes2(text))}`]);
    //mp.players.broadcast(`[${chat.getTime()}] !{${color}} ${sender}:!{FFFFFF} ${text}`);
};

chat.sendToDep = function (sender, text, color = '#eb1043') {

    methods.debug('chat.sendToDep');
    mp.players.forEach(p => {
        if (!user.exists(p)) return;
        if (user.isLogin(p) && (user.isGos(p) || user.isNews(p)))
            p.outputChatBoxNew(`[${chat.getTime()}] !{#eb1043} ${sender}:!{FFFFFF} ${text}`);
    });

    methods.saveLog('log_chat', ['text'], [`DEP: ${methods.removeQuotes(methods.removeQuotes2(text))}`]);
    //mp.players.broadcast(`[${chat.getTime()}] !{${color}} ${sender}:!{FFFFFF} ${text}`);
};

chat.sendToFraction = function (player, sender, text, color = '#1E88E5') {

    methods.debug('chat.sendToFraction');
    mp.players.forEach(p => {
        if (user.isLogin(p)) {
            if (!user.exists(p)) return;
            if (user.get(player, 'fraction_id') > 0 && user.get(player, 'fraction_id') == user.get(p, 'fraction_id'))
                p.outputChatBoxNew(`[${chat.getTime()}] !{${color}} ${sender}:!{FFFFFF} ${text}`);
            else if (user.get(player, 'fraction_id2') > 0 && user.get(player, 'fraction_id2') == user.get(p, 'fraction_id2'))
                p.outputChatBoxNew(`[${chat.getTime()}] !{${color}} ${sender}:!{FFFFFF} ${text}`);
        }
    });

    methods.saveLog('log_chat', ['text'], [`FRACTION (${user.get(player, 'fraction_id')} | ${user.get(player, 'fraction_id2')}): ${methods.removeQuotes(methods.removeQuotes2(text))}`]);
    //mp.players.broadcast(`[${chat.getTime()}] !{${color}} ${sender}:!{FFFFFF} ${text}`);
};

chat.sendToFamily = function (player, sender, text, color = '#009688') {

    methods.debug('chat.sendToFamily');
    mp.players.forEach(p => {
        if (user.isLogin(p) && user.get(player, 'family_id') === user.get(p, 'family_id'))
            p.outputChatBoxNew(`[${chat.getTime()}] !{${color}} ${sender}:!{FFFFFF} ${text}`);
    });

    methods.saveLog('log_chat', ['text'], [`FAM (${user.get(player, 'family_id')}): ${methods.removeQuotes(methods.removeQuotes2(text))}`]);
    //mp.players.broadcast(`[${chat.getTime()}] !{${color}} ${sender}:!{FFFFFF} ${text}`);
};

chat.getTime = function () {
    let dateTime = new Date();
    return `${methods.digitFormat(dateTime.getHours())}:${methods.digitFormat(dateTime.getMinutes())}:${methods.digitFormat(dateTime.getSeconds())}`;
};

let gate = null;
mp.events.add('playerCommand', (player, command) => {

    try {

        methods.debug('playerCommand', command);
        if (command.toLowerCase().slice(0, 3) === "me ") {
            chat.sendMeCommand(player, command.substring(3));
        }
        else if (command.toLowerCase().slice(0, 3) === "at ") {
            if (!user.isLogin(player) || !user.isAdmin(player))
                return;
            let args = command.toLowerCase().split(' ');
            try {
                let target = mp.players.at(methods.parseInt(args[1]))
                let text = 3 + args[1].length
                if (command.substring(text).length <= 0) return user.showCustomNotify(player, 'Сообщение не может быть пустым', 1, 9)
                mp.players.forEach(function (p) {
                    if (!user.isLogin(p))
                        return;
                    if (user.isAdmin(p))
                        p.outputChatBoxNew(`[${chat.getTime()}] !{#d32f2f}${user.getRpName(player)} ответил на репорт игроку  ${user.getRpName(target)} (id:${methods.parseInt(args[1])}):!{#FFFFFF} ${command.substring(text)}`);
                    if (p.id != methods.parseInt(args[1]))
                        return;
                    p.call('client:mainMenu:addReport', [command.substring(text), `${user.getRpName(player)} (${player.id})`]);
                    p.outputChatBoxNew(`[${chat.getTime()}] !{#f44336}Ответ от администратора ${user.getRpName(player)}:!{#FFFFFF} ${command.substring(text)}`);
                    //methods.saveLog('AnswerReport', `${user.getRpName(player)} (${user.getId(player)}) to ${id}: ${msg}`);
                    user.set(player, 'count_aask', user.get(player, 'count_aask') + 1);
                    methods.saveLog('log_chat', ['text'], [`REPORT ASK: ${user.getRpName(player)} (${user.getId(player)}) to ${user.getRpName(p)} (${user.getId(p)}): ${methods.removeQuotes(methods.removeQuotes2(command.substring(text)))}`]);
                });
            }
            catch (e) {

            }
        }
        else if (command.toLowerCase().slice(0, 4) === "ans ") {
            if (!user.isLogin(player) || !user.isAdmin(player) || !user.isHelper(player))
                return;
            let args = command.toLowerCase().split(' ');
            try {
                let target = mp.players.at(methods.parseInt(args[1]))
                let text = 4 + args[1].length
                if (command.substring(text).length <= 0) return user.showCustomNotify(player, 'Сообщение не может быть пустым', 1, 9)
                mp.players.forEach(function (p) {
                    if (!user.isLogin(p))
                        return;
                    if (user.isAdmin(p) || user.isHelper(player))
                        p.outputChatBoxNew(`[${chat.getTime()}] !{#FBC02D}${user.getRpName(player)} ответил на вопрос игроку ${user.getRpName(target)} (id:${methods.parseInt(args[1])}):!{#FFFFFF} ${command.substring(text)}`);
                    if (p.id != methods.parseInt(args[1]))
                        return;
                    p.outputChatBoxNew(`[${chat.getTime()}] !{#FFC107}Вам ответил ${user.getRpName(player)}:!{#FFFFFF} ${command.substring(text)}`);
                    //methods.saveLog('AnswerAsk', `${user.getRpName(player)} (${user.getId(player)}) to ${id}: ${msg}`);
                    user.set(player, 'count_hask', user.get(player, 'count_hask') + 1);

                    p.call('client:mainMenu:addAsk', [command.substring(text), `${user.getRpName(player)} (${player.id})`]);

                    let money = (command.substring(text).length / 2) * user.get(player, 'helper_level');
                    user.showCustomNotify(player, `Вы получили премию за ответ на вопрос ${methods.moneyFormat(money)}`, 2, 9);
                    user.addCashMoney(player, money, `The answer to the question (${methods.removeQuotes(methods.removeQuotes2(command.substring(text))).substring(0, 230)})`)
                    methods.saveLog('log_chat', ['text'], [`HELPER ASK: ${user.getRpName(player)} (${user.getId(player)}) to ${user.getRpName(p)} (${user.getId(p)}): ${methods.removeQuotes(methods.removeQuotes2(command.substring(text)))}`]);
                });
            }
            catch (e) {

            }
        }
        else if (command.toLowerCase().slice(0, 3) === "do ") {
            chat.sendDoCommand(player, command.substring(3));
        }
        else if (command.toLowerCase().slice(0, 4) === "try ") {
            chat.sendTryCommand(player, command.substring(4));
        }
        else if (command.toLowerCase().slice(0, 2) === "b ") {
            chat.sendBCommand(player, command.substring(2));
        }
        else if (command.toLowerCase().slice(0, 2) === "f ") {
            if (user.get(player, 'family_id') > 0)
                chat.sendToFamily(player, `${user.getRpName(player)} (${player.id})`, command.substring(2));
            else if (user.get(player, 'fraction_id') > 0 || user.get(player, 'fraction_id2') > 0)
                player.notify('~r~Необходимо состоять в семье, используйте /r чтобы писать во фракционный чат');
            else
                player.notify('~r~Необходимо состоять в семье');
        }
        else if (command.toLowerCase().slice(0, 2) === "r ") {
            if (user.get(player, 'fraction_id') > 0)
                chat.sendToFraction(player, `[${user.getRankName(player)}] ${user.getRpName(player)} (${player.id})`, command.substring(2));
            else if (user.get(player, 'fraction_id2') > 0)
                chat.sendToFraction(player, `${user.getRpName(player)} (${player.id})`, command.substring(2));
            else
                player.notify('~r~Необходимо состоять в организации')
        }
        else if (command.toLowerCase().slice(0, 4) === "msg ") {
            if (user.isAdmin(player))
                chat.sendToAllAdm(player, command.substring(4));
        }
        else if (command.toLowerCase().slice(0, 2) === "d ") {
            if (user.isGos(player) || user.isNews(player))
                chat.sendToDep(`[${user.getFractionName(player)} | ${user.getRankName(player)}] ${user.getRpName(player)} (${player.id})`, command.substring(2));
            else
                player.notify('~r~Необходимо состоять в гос. организации')
        }
        else if (command.toLowerCase().slice(0, 2) === "a ") {
            if (user.isAdmin(player))
                chat.sendToAdmin(`[Admin LVL: ${user.get(player, 'admin_level')}] ${user.getRpName(player)} (${player.id})`, command.substring(2), '#4CAF50');
        }
        else if (command.toLowerCase().slice(0, 2) === "h ") {
            if (user.isHelper(player))
                chat.sendToHelper(`[Helper LVL: ${user.get(player, 'helper_level')}] ${user.getRpName(player)} (${player.id})`, command.substring(2));
        }
        /*else if (command.toLowerCase().slice(0, 2) === "z ") {
            console.log(gangWar.isInZone(player, methods.parseInt(command.substring(2))));
        }*/
        else if (command.toLowerCase() === "ping" || command.toLowerCase() === "netstat") {
            player.notify("~g~Ping: " + player.ping + "ms\n~g~PacketLoss: " + player.packetLoss + "ms");
        }
        else if (command.toLowerCase() === "crimewar" || command.toLowerCase().slice(0, 9) === "crimewar ") {
            if (!user.isAdmin(player))
                return;
            fraction.createCargoWar(methods.parseInt(command.substring(9)));
        }
        else if (command.toLowerCase() === "graffwar") {
            if (!user.isAdmin(player))
                return;
            graffiti.createWar();
        }
        else if (command.toLowerCase() === "capture") {
            try {
                if (user.isGang(player))
                    player.call('client:menuList:showGangZoneAttackMenu', [gangWar.getNearZoneId(player.position)]);
                if (user.isMafia(player))
                    player.call('client:menuList:showMafiaZoneAttackMenu', [canabisWar.getNearZoneId(player.position)]);
            }
            catch (e) { }
        }
        else if (command.toLowerCase() === "crimemwar") {
            if (!user.isAdmin(player))
                return;
            fraction.createCargoMafiaWar();
        }
        else if (command.toLowerCase() === "crimebwar") {
            if (!user.isAdmin(player))
                return;
            fraction.createCargoBigWar();
        }
        else if (command.toLowerCase() === "crimeawar") {
            if (!user.isAdmin(player))
                return;
            fraction.createCargoArmyWar();
        }
        else if (command.toLowerCase().slice(0, 3) === "sp ") {
            if (!user.isLogin(player))
                return;

            if (player.spectateTarget) return user.stopSpectate(player);
            let args = command.split(' ');
            if (methods.parseInt(args[1]) === -1) {
                user.stopSpectate(player, player.spectateTarget.position)
                return;
            }
            else if (methods.parseInt(args[1]) === -2) {
                player.alpha = 255;
                user.stopSpectate(player, player.spectatePosition)
                return;
            } else {
                let target = methods.parseInt(args[1]);

                let tarPlayer = mp.players.at(target);
                if (!user.isLogin(tarPlayer)) {
                    user.showCustomNotify(player, 'Игрок не найден на сервере', 1, 9);
                    return;
                }
                user.startSpectate(player, tarPlayer)
            }

        }
        else if (command.toLowerCase() === "bwar") {
            if (!user.isAdmin(player))
                return;
            mafiaWar.startWar(1);
            mafiaWar.startWar(2);
            mafiaWar.startWar(3);
        }
        else if (command.toLowerCase() === "randmask") {
            if (!user.isAdmin(player, 5))
                return;
            let winner = methods.getRandomPlayer();
            if (user.isLogin(winner)) {
                user.giveRandomMask(winner, 0, true);
            }
        }
        else if (command.toLowerCase() === "randvip") {
            if (!user.isAdmin(player, 5))
                return;
            let winner = methods.getRandomPlayer();
            if (user.isLogin(winner)) {
                user.giveVip(winner, methods.getRandomInt(1, 8), 2, true);
            }
        }
        else if (command.toLowerCase() === "randveh") {
            if (!user.isAdmin(player, 5))
                return;
            let winner = methods.getRandomPlayer();
            if (user.isLogin(winner)) {
                user.giveVehicle(winner, enums.vehWinList[methods.getRandomInt(0, enums.vehWinList.length)], 1, true);
            }
        }
        else if (command.slice(0, 7) === "racerc ") {
            if (!user.isAdmin(player))
                return;

            let args = command.toLowerCase().split(' ');
            racer.createRace(methods.parseInt(args[1]), args[2]);
        }
        else if (command.toLowerCase().slice(0, 4) === "pay ") {
            if (!user.isLogin(player))
                return;
            let args = command.split(' ');
            let target = methods.parseInt(args[1]);

            let remotePlayer = mp.players.at(target);
            if (!user.isLogin(remotePlayer)) {
                user.showCustomNotify(player, 'Игрок не найден на сервере', 1, 9);
                return;
            }

            if (user.getCashMoney(player) < args[2]) {
                user.showCustomNotify(player, "У вас нет столько денег", 1, 9);
                return;
            }

            if (remotePlayer && user.isLogin(remotePlayer)) {

                if (methods.distanceToPos(remotePlayer.position, player.position) > 3) {
                    user.showCustomNotify(player, 'Вы слишком далеко', 1, 9);
                    return;
                }
                if (args[2] < 1) return;
                user.removeCashMoney(player, args[2]);
                user.addCashMoney(remotePlayer, args[2]);

                user.playAnimationWithUser(player, remotePlayer, 6);

                user.showCustomNotify(remotePlayer, 'Вам передали ' + methods.moneyFormat(args[2]), 2, 9);
                user.showCustomNotify(player, 'Вы передали ' + methods.moneyFormat(args[2]), 2, 9);

                methods.saveLog('log_give_money',
                    ['type', 'user_from', 'user_to', 'sum'],
                    ['CASH', `${user.getRpName(player)} (${user.getId(player)})`, `${user.getRpName(remotePlayer)} (${user.getId(remotePlayer)})`, args[2]],
                );
            }
        }
        else if (command.toLowerCase() === "racers") {
            if (!user.isAdmin(player))
                return;
            racer.startRace();
        }
        else if (command.toLowerCase() === "racern") {
            if (!user.isAdmin(player))
                return;
            racer.notifyRace();
        }
        else if (command.slice(0, 6) === "seval ") {
            if (!user.isLogin(player))
                return;
            if (!user.isAdmin(player))
                return;
            let evalCmd = command.substring(6);
            player.outputChatBoxNew(`SEval ${evalCmd}`);
            let result;
            try {
                result = eval(evalCmd);
                player.outputChatBoxNew(`SResult ${result}`);
            } catch (e) {
                result = e;
                player.outputChatBoxNew(`SResult ${result}`);
            }
        }
        else if (command.toLowerCase().slice(0, 7) === "getcar " || command.toLowerCase().slice(0, 4) === "tpv ") {
            if (!user.isLogin(player) || !user.isAdmin(player))
                return;
            let args = command.toLowerCase().split(' ');
            try {
                if (!user.isAdmin(player))
                    return;
                let v = mp.vehicles.at(methods.parseInt(args[1]));
                if (vehicles.exists(v)) {
                    let pos = player.position;
                    v.position = pos;

                    let vehInfo = methods.getVehicleInfo(v.model);
                    methods.saveLog('log_admin', ['name', 'type', 'do'], [`${user.getRpName(player)}`, 'VEH_TP_TO_ADMIN', `${v.numberPlate} | ${vehInfo.display_name} | ${v.id} | ${methods.parseInt(pos.x)} | ${methods.parseInt(pos.y)} | ${methods.parseInt(pos.z)}`]);
                }
            }
            catch (e) {

            }
        }
        else if (command.slice(0, 6) === "report ") { }
        else if (command.slice(0, 6) === "help ") { }
        else if (command.toLowerCase() === "help") {
            player.outputChatBoxNew(`!{FFC107}Список доступных команд`);
            player.outputChatBoxNew(`!{FFC107}Чаты:!{FFFFFF} /d - Департамент, /r - Фракционный, /f - Семейный`);
            player.outputChatBoxNew(`!{FFC107}РП процесс:!{FFFFFF} /me - Действия от 1 лица, /do - Действие от 3 лица, /try - Рандомайзер, /b ООС чат`);
            player.outputChatBoxNew(`!{FFC107}Разное:!{FFFFFF} /help [текст] - Вопрос у хелперов, /report [текст] - жалоба, /ping - Узнать свой пинг`);
        }
        else {
            // player.outputChatBoxNew(`!{FFC107}На сервере нет команд, кроме: /me, /do, /try, /b, /f, /r, /d, /report, /help. Используйте меню на кнопку M`);
        }
    }
    catch (e) {
        methods.error('playerCommand', e);
    }
});