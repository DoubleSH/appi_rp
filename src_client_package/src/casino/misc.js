import methods from "../modules/methods";
import user from "../user";
import Container from "../modules/data";
import timer from "../manager/timer";
import blackJack from "./blackJack";


const CASINO_INTERIOR_ID = 275201
let in_casino = false


const CasinoChecks = () => {
    try {
        const position = mp.players.local.position || { x: 0.0, y: 0.0, z: 0.0 }
        if(mp.game.interior.getInteriorAtCoords(position.x, position.y, position.z) == CASINO_INTERIOR_ID) {
            if(!in_casino) {
                in_casino = true
                user.setVariable('in_casino', true)
                CasinoEnter()
            }
        }
        else {
            if(in_casino) {
                in_casino = false
                user.setVariable('in_casino', false)
                CasinoLeave()
            }
        }
    }
    catch (e) {
        methods.error(`catch in CasinoChecks`, e.toString())
    }
};
timer.createInterval('casino.500msTimer', CasinoChecks, 500);


const CasinoEnter = () => {
    try {
        blackJack.casinoEnter()
    }
    catch (e) {
        methods.error(`catch in CasinoEnter`, e.toString())
    }
}

global.casinoEnter = () => {
    CasinoEnter()
}

const CasinoLeave = () => {
    try {

    }
    catch (e) {
        methods.error(`catch in CasinoEnter`, e.toString())
    }
}


const Misc = {}

Misc.getChipModel = (betAmount) => {
    if (betAmount < 10) return mp.game.joaat('vw_prop_vw_coin_01a')
    else if (betAmount >= 10 && betAmount < 500) return mp.game.joaat('vw_prop_chip_10dollar_x1')
    else if (betAmount >= 500 && betAmount < 1000) return mp.game.joaat('vw_prop_chip_50dollar_x1')
    else if (betAmount >= 1000 && betAmount < 10000) return mp.game.joaat('vw_prop_chip_100dollar_x1')
    else if (betAmount >= 10000 && betAmount < 25000) return mp.game.joaat('vw_prop_chip_500dollar_x1')
/*    else if (betAmount >= 1000 && betAmount < 5000) return mp.game.joaat('vw_prop_chip_1kdollar_x1')
    else if (betAmount >= 5000 && betAmount < 15000) return mp.game.joaat('vw_prop_vw_chips_pile_01a')
    else if (betAmount >= 15000 && betAmount < 25000) return mp.game.joaat('vw_prop_vw_chips_pile_02a')
    else return mp.game.joaat('vw_prop_vw_chips_pile_03a')
*/
    else return mp.game.joaat('vw_prop_chip_1kdollar_x1')
}

Misc.taskSeat = async (player, x, y, z, rot, withWalk=true) => {
    return new Promise((res, _) => {
        const sitAnim = [
            'sit_enter_left',
            'sit_enter_right',
            'sit_enter_left_side',
            'sit_enter_right_side'
        ]

        const animDict = 'anim_casino_b@amb@casino@games@shared@player@'

        const anim = sitAnim[Math.floor(Math.random()*4)]

        const animPos = mp.game.ped.getAnimInitialOffsetPosition(animDict, anim, x, y, z, 0, 0, rot.z != undefined ? rot.z : (rot+0.001), 0.01, 2)
        const animRot = mp.game.ped.getAnimInitialOffsetRotation(animDict, anim, x, y, z, 0, 0, rot.z != undefined ? rot.z : (rot+0.001), 0.01, 2)
        if(withWalk) {
            player.taskFollowNavMeshToCoord(animPos.x, animPos.y, animPos.z, 1, 3000, 0.01, true, animRot);
        }

        let seatTimeout = setTimeout(() => {
            seatTimeout = null
            return res(false)
        }, 10000);

        const seatInterval = setInterval(() => {
            if(methods.distanceToPos(animPos, player.position) <= 0.7 || !withWalk) {
               const sceneId = mp.game.ped.createSynchronizedScene(x, y, z, rot.x!=undefined?rot.x:0.0, rot.y!=undefined?rot.y:0.0, rot.z!=undefined?rot.z:rot, 2);
                player.taskSynchronizedScene(sceneId, animDict, anim, 3.0, -3.0, 13, 16, 2.0, 0)
                const animTime = mp.game.entity.getEntityAnimDuration(animDict, anim)

                if(player == mp.players.local) mp.game.invoke('0x79C0E43EB9B944E2', -2124244681)
                setTimeout(() => {
                    if(player.handle) player.taskPlayAnim("anim_casino_b@amb@casino@games@shared@player@", "idle_cardgames", 1000.0, -2.0, -1, 2, 1148846080, false, false, false)
                    if(seatTimeout) clearTimeout(seatTimeout)
                    return res(true)
                }, animTime*0.5*1000);
  //              setTimeout(() => {
//                    if(player.handle) player.taskPlayAnim("anim_casino_b@amb@casino@games@shared@player@", "idle_cardgames", 1000.0, -2.0, -1, 2, 1148846080, false, false, false)
    //            }, animTime)
                clearInterval(seatInterval)

            }
        }, 100);
    })
}
/*

/eval mp.players.local.taskSynchronizedScene(mp.game.ped.createSynchronizedScene(1147.9951171875, 247.18157958984375, -52.04090118408203, 0.0, 0.0, 180, 2), 'anim_casino_b@amb@casino@games@shared@player@', 'sit_enter_right', 3.0, -3.0, 13, 16, 2.0, 0)

/eval mp.players.local.taskSynchronizedScene(mp.game.ped.createSynchronizedScene(1148.0950927734375, 248.14968872070312, -52.04090118408203, 0.0, 0.0, 90-45-90, 2), 'anim_casino_b@amb@casino@games@shared@player@', 'sit_enter_left', 3.0, -3.0, 13, 16, 2.0, 0)

/eval mp.players.local.taskSynchronizedScene(mp.game.ped.createSynchronizedScene(1147.9951171875, 247.18157958984375, -52.04090118408203, 0.0, 0.0, 90, 2), 'anim_casino_b@amb@casino@games@shared@player@', 'sit_enter_right_side', 3.0, -3.0, 13, 16, 2.0, 0)
*/

export default Misc