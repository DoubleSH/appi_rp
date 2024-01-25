import user from "../user";
import methods from "../modules/methods";
import vSync from "./vSync";
import new_events from "../check_events";

new_events.add("entityStreamIn", (entity) => {
    try {
        if (!user.isLogin())
            return;

        if (entity.getVariable('itemId'))
            entity.setLodDist(100);
        else {

            if (entity.type === 'player' && mp.players.exists(entity)) {
                if (user.getCache('s_load_p') === 1)
                    entity.setLodMultiplier(0.7);
                else if (user.getCache('s_load_p') === 2)
                    entity.setLodMultiplier(0.4);
                else
                    entity.setLodMultiplier(1);
            }
            if (entity.type === 'vehicle' && mp.vehicles.exists(entity)) {
                if (user.getCache('s_load_v') === 1)
                    entity.setLodMultiplier(0.7);
                else if (user.getCache('s_load_v') === 2)
                    entity.setLodMultiplier(0.4);
                else
                    entity.setLodMultiplier(1);
            }


            if (user.getCache('s_load_lod') === 1)
                entity.setLodDist(150);
            else if (user.getCache('s_load_lod') === 2)
                entity.setLodDist(100);
            else
                entity.setLodDist(200);
        }
    }
    catch (e) {
        methods.error('lod:entityStreamIn', e.toString());
    }
});
