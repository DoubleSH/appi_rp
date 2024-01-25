let methods = require('./methods');
let mysql = require('./mysql');
let enums = require('../enums');
let vehicles = require('../property/vehicles');

let vehicleInfo = exports;

vehicleInfo.loadAll = function() {
    methods.debug('vehicleInfo.loadAll');
    mysql.executeQuery(`SELECT id, display_name, class_name, class_name_ru, hash, sbag, stock, stock_full, fuel_full, fuel_min, fuel_type, type, price, sb, sm, engine_id FROM veh_info ORDER BY display_name ASC`, function (err, rows, fields) {
        try {
            rows.forEach(function (item) {
                enums.vehicleInfo.push(item);
            });
        }
        catch (e) {
            methods.error('vehicleInfo.loadAll', e);
        }
        methods.debug('Vehicle Info Loaded: ' + enums.vehicleInfo.length);
        setTimeout(vehicles.loadAllOldVehShop, 10000);
    });
    mysql.executeQuery(`SELECT * FROM veh_engine`, function (err, rows, fields) {
        try {
            rows.forEach(function (item) {
                enums.vehicleInfoEngine.push(item);
            });
        }
        catch (e) {
            methods.error('vehicleInfo.vehicleInfoEngine', e);
        }
        methods.debug('Vehicle Info Engine Loaded: ' + enums.vehicleInfoEngine.length);
    });
};