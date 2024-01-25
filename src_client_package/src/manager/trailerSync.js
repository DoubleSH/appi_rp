import methods from "../modules/methods";
import new_events from "../check_events";
import user from "../user";
let trailers = {};
let reAttachInterval = {}
function attachTrailerByVehicle(trailer) {
    try {
        reAttachInterval[trailer.remoteId] = setInterval(() => {
            try {
                if (mp.vehicles.exists(trailer)) {
                    trailer.position = new mp.Vector3(9999,9999,9999)
                }
                else {
                    if (reAttachInterval[trailer.remoteId]) clearInterval(reAttachInterval[trailer.remoteId]);
                }
            } catch (e) {
            }
        }, 5);
    } catch (e) {
        user.showCustomNotify(e)
    }

};
new_events.add('Create::Trailer', (truck, position) => {
    try {
        let dosvidos = mp.vehicles.atRemoteId(truck.getVariable("trailer"))
        attachTrailerByVehicle(dosvidos);
        let trailer = mp.vehicles.new(dosvidos.model, position,
            {
                heading: truck.getHeading(),
                numberPlate: "APPI RP"
            });
        truck.attachToTrailer(mp.vehicles.atHandle(trailer.handle).handle, 1000);
    } catch (error) {
        user.showCustomNotify(error)
    }

});

new_events.add('entityStreamIn', (entity) => {
    if (entity.type == "vehicle") {
        if (entity.getVariable("trailer")) {
            mp.events.call("Create::Trailer", entity, entity.position);
        }
    }
});

new_events.add('entityStreamOut', (entity) => {
    if (entity.type == "vehicle") {
        if (entity.getVariable("TRAILERED")) {
            if(trailers[entity.remoteId] != null){
                trailers[entity.remoteId].destroy();
                trailers[entity.remoteId] = null;
                clearInterval(reAttachInterval[entity.getVariable("trailer")]);
            }
                
        }
    }
});