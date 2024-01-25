const attach = exports;

let methods = require('../modules/methods');

attach.initFunctions = (entity) =>
{
    entity._attachments = [];
    entity.addAttachment = _addAttachmentWrap;
    entity.hasAttachment = _hasAttachment;
    entity._occupants = [];
};

function serializeAttachments(attachments)
{
    methods.debug('canabisWar.serializeAttachments');
    return (attachments.map((hash) => (hash.toString(36)))).join("|");
}

function _addAttachment(entity, attachmentHash, remove)
{
    methods.debug('_addAttachment', entity, attachmentHash, remove);
    try {
        let idx = entity._attachments.indexOf(attachmentHash);

        if(idx === -1)
        {
            if(!remove)
            {
                entity._attachments.push(attachmentHash);
            }
        }
        else if(remove)
        {
            entity._attachments.splice(idx, 1);
        }

        entity.setVariable("attachmentsData", serializeAttachments(entity._attachments));
    }
    catch (e) {
        methods.error('_addAttachment', e);
    }
}

function _addAttachmentWrap(attachmentName, remove)
{
    methods.debug('_addAttachmentWrap', attachmentName, remove);
    try {
        let to = typeof(attachmentName);

        if(to === "number")
        {
            _addAttachment(this, attachmentName, remove);
        }
        else if(to === "string")
        {
            _addAttachment(this, mp.joaat(attachmentName), remove);
        }
    }
    catch (e) {
        methods.error('_addAttachmentWrap', e);
    }
}

function _hasAttachment(attachmentName)
{
    methods.debug('canabisWar._hasAttachment');
    return this._attachments.indexOf((typeof(attachmentName) === 'string') ? mp.joaat(attachmentName) : attachmentName) !== -1;
}

mp.events.add("playerReady", (player) =>
{
    player._weaponComponented = {};
    player._attachments = [];
    player.addAttachment = _addAttachmentWrap;
    player.hasAttachment = _hasAttachment;
});