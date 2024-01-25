import npc from '../manager/npc';
import methods from '../modules/methods';


let dealerPed = {};




let dealerVariations = [
    [[3,0,0], [1,0,0], [3,0,0], [1,0,0], [0,0,0], null, [1,0,0], [2,0,0], [3,0,0], null, [1,0,0], [1,0,0]],
    [[2,2,0], [1,0,0], [4,0,0], [0,3,0], [0,0,0], null, [1,0,0], [2,0,0], [1,0,0], null, [1,0,0], [1,0,0]],
    [[2,1,0], [1,0,0], [2,0,0], [0,3,0], [0,0,0], null, [1,0,0], [2,0,0], [1,0,0], null, [1,0,0], [1,0,0]],
    [[2,0,0], [1,0,0], [3,0,0], [1,3,0], [0,0,0], null, [1,0,0], [2,0,0], [3,0,0], null, [1,0,0], [1,0,0]],    
    [[4,2,0], [1,0,0], [3,0,0], [0,0,0], [0,0,0], null, [1,0,0], [2,0,0], [1,0,0], null, [1,0,0], [1,0,0]],
    [[4,0,0], [1,0,0], [0,0,0], [0,0,0], [0,0,0], null, [1,0,0], [2,0,0], [1,0,0], null, [1,0,0], [1,0,0]],    
    [[4,1,0], [1,0,0], [4,0,0], [1,0,0], [0,0,0], null, [1,0,0], [2,0,0], [3,0,0], null, [1,0,0], [1,0,0]],    
    [[1,1,0], [0,0,0], [1,0,0], [0,3,0], [0,0,0], null, [0,0,0], [0,0,0], [0,0,0], null, [0,0,0], [0,0,0]],
    [[1,1,0], [0,0,0], [1,1,0], [1,3,0], [0,0,0], null, [0,0,0], [2,0,0], [1,0,0], null, [0,0,0], [0,0,0]],    
    [[2,0,0], [0,0,0], [2,0,0], [1,3,0], [0,0,0], null, [0,0,0], [0,0,0], [2,0,0], null, [0,0,0], [0,0,0]],    
    [[2,1,0], [0,0,0], [2,1,0], [1,3,0], [1,0,0], null, [1,0,0], [2,0,0], [3,0,0], null, [0,0,0], [0,0,0]],    
    [[3,0,0], [0,0,0], [3,0,0], [0,1,0], [1,0,0], null, [1,0,0], [1,0,0], [0,0,0], null, [0,0,0], [0,0,0]],    
    [[3,1,0], [0,0,0], [3,1,0], [1,1,0], [1,0,0], null, [1,0,0], [2,0,0], [1,0,0], null, [0,0,0], [0,0,0]],    
    [[4,0,0], [0,0,0], [4,0,0], [1,1,0], [1,0,0], null, [1,0,0], [1,0,0], [2,0,0], null, [0,0,0], [0,0,0]],
]


dealerPed.create = async (position, heading, dealerType) => {
    if(dealerType < 0 && dealerType > 13) return false
    let dealerGenre = dealerType >= 6 ? 1 : 0
    const dealer = await npc.createPedLocally(dealerGenre ? mp.game.joaat('s_f_y_casino_01') : mp.game.joaat('S_M_Y_Casino_01'), new mp.Vector3(position.x, position.y, position.z+1.0), heading)
    await methods.sleep(500)
    if(!dealer || !mp.peds.exists(dealer)) {
        methods.debug('error: dealerPed can not created')
        return false;
    }
    dealer.setCanBeDamaged(false)
    dealer.setAsEnemy(false)
    dealer.setBlockingOfNonTemporaryEvents(true)
    dealer.setResetFlag(249, true)
    dealer.setResetFlag(185, true)
    dealer.setResetFlag(108, true)
    mp.game.invoke('0x352E2B5CF420BF3B', dealer.handle, 1)
    dealer.setCanEvasiveDive(false)
    mp.game.invoke('0x2F3C3D9F50681DE4', dealer.handle, 1)
    dealer.setCanRagdollFromPlayerImpact(false)
    dealer.setConfigFlag(208, true)
    dealer.setAsMission(true, false);

    dealer.position = position
    dealerPed.fixComponents(dealer, dealerType)
    return dealer
}

dealerPed.fixComponents = (dealer, dealerType) => {
    dealer.setDefaultComponentVariation()

    for(let componentId = 0; componentId < 12; componentId++) {
        let [drawableId, textureId, paletteId] = dealerVariations[dealerType][componentId] || [-1,-1,-1]
        if(drawableId != -1) dealer.setComponentVariation(componentId, drawableId, textureId, paletteId);
    }
    if(dealerType == 11 || dealerType == 13) dealer.setPropIndex(1,0,0,false)
}



dealerPed.loadAll = () => {
    try {
        methods.debug('Execute: dealerPed.loadAll');
        // positions.map((position) => {
            // blackJack.createTable(1, position.position, position.heading);
        // })
        // createBind()
    } catch (e) {
        methods.debug('Exception: dealerPed.loadAll');
        methods.debug(e);
    }
};


export default dealerPed;