let new_events = {};

let events_counts = {}

new_events.add = (eventName, func) => {
    events_counts[eventName] = events_counts[eventName] ? events_counts[eventName]+1 : 1
    mp.events.add(eventName, func)
}

new_events.check = () => {
    let keys = Object.keys(events_counts)
    if(keys.length > 0){
        for(let i=0; i < keys.length; i++) {
        if(mp.events.getAllOf(keys[i]).length != events_counts[keys[i]]) {
            return {error:`Event ${keys[i]} not true. Real count = ${mp.events.getAllOf(keys[i]).length} | Need = ${events_counts[keys[i]]}`}
        }
    }
    }
    
    return null
}


export default new_events;