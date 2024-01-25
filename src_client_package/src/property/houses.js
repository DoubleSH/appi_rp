import user from '../user';
import Container from '../modules/data';
import methods from '../modules/methods';
import enums from '../enums';
import business from "./business";

let houses = {};

houses.enter = function (id) {
    methods.callRemote('server:houses:enter', id);
};

houses.enterv = function (id) {
    methods.callRemote('server:houses:enterv', id);
};

houses.enterGarage = function (id, houseId) {
    methods.callRemote('server:houses:enterGarage', id, houseId);
};

houses.exit = function (x, y, z, rot) {
    user.setVirtualWorld(0);
    user.teleport(x, y, z + 1, rot);
};

houses.exitv = function (id) {
    methods.callRemote('server:houses:exitv', id);
};

houses.getData = async function(id) {
    return await Container.Data.GetAll(enums.offsets.house + methods.parseInt(id));
};

houses.get = async function(id, key) {
    return await Container.Data.Get(enums.offsets.house + methods.parseInt(id), key);
};

houses.buy = function (id) {
    if (user.getCacheData().get('house_id') > 0) {
        mp.game.ui.notifications.show('~r~У Вас уже есть дом');
        return false;
    }
    methods.callRemote('server:houses:buy', id);
    return true;
};

houses.updatePin = function (id, pin) {
    methods.callRemote('server:houses:updatePin', id, pin);
};

houses.updateSafe = function (id, pin = 1) {
    methods.callRemote('server:houses:updateSafe', id, pin);
};

houses.lockStatus = function (id, lockStatus) {
    methods.callRemote('server:houses:lockStatus', id, lockStatus);
};

export default houses;