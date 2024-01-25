const RadioRoomsContorller = require('./RadioRoomsContorller');
let methods = require('../modules/methods');
mp.events.add('playerJoin', (player) => {
  methods.debug('playerJoin RadioRoom')
  player.voice = {
    isEnabledMicrophone: false
  };

  player.radioRoom = '';
});

mp.events.add('playerQuit', (player) => {
  methods.debug('playerQuit RadioRoom')
  RadioRoomsContorller.onQuit(player.radioRoom, player);
});

//Инит
mp.events.add('voice.server.initRadio', (player, frequency) => {
  methods.debug('initRadio RadioRoom')
  if (!RadioRoomsContorller.hasRoom(frequency)) {
    RadioRoomsContorller.createRoom(frequency);
  }

  RadioRoomsContorller.onJoin(frequency, player);
});

//Изменить частоту рации
mp.events.add('voice.server.changeRadioFrequency', (player, frequency) => {
  methods.debug('changeRadioFrequency RadioRoom')
  RadioRoomsContorller.onQuit(player.radioRoom, player);

  if (!RadioRoomsContorller.hasRoom(frequency)) {
    RadioRoomsContorller.createRoom(frequency);
  }

  RadioRoomsContorller.onJoin(frequency, player);
});

// Выключение рации
mp.events.add('voice.server.quitRadio', (player) => {
  methods.debug('quitRadio RadioRoom')
  RadioRoomsContorller.onQuit(player.radioRoom, player);
});

mp.events.add('voice.server.enableMic', (player) => {
  methods.debug('enableMic RadioRoom')
  console.log("enableMic: "+player.radioRoom)
  RadioRoomsContorller.enableMic(player.radioRoom, player);
});

mp.events.add('voice.server.disableMic', (player) => {
  methods.debug('disableMic RadioRoom')
  console.log("disableMic: "+player.radioRoom)
  RadioRoomsContorller.disableMic(player.radioRoom, player);
});

/*
	MAIN VOICE EVENTS - start
*/
mp.events.add('voice.changeStateConnection', (player, state) => {
  methods.debug('changeStateConnection RadioRoom')
  player.data['voice.stateConnection'] = state;
});

mp.events.add('voice.toggleMicrophone', (player, isEnabled) => {
  methods.debug('toggleMicrophone RadioRoom')
  mp.players.call(player.streamedPlayers, 'voice.toggleMicrophone', [player, isEnabled]);
  player.voice.isEnabledMicrophone = isEnabled;
});

/*
	MAIN VOICE EVENTS - end
*/

/*
    UTILITY FUNCTIONS - start
*/

const setVoiceDistance = (player, distance) => {
  methods.debug('setVoiceDistance RadioRoom')
  player.data['voice.distance'] = distance;
};

const getVoiceDistance = (player) => {
  methods.debug('getVoiceDistance RadioRoom')
  player.data['voice.distance'];
}

const isEnabledMicrophone = (player) => {
  methods.debug('isEnabledMicrophone RadioRoom')
  player.voice.isEnabledMicrophone;
}

const setVoiceMuted = (player, muted) => {
  methods.debug('setVoiceMuted RadioRoom')
  player.data['voice.muted'] = muted;
};

const getVoiceMuted = (player) => {
  methods.debug('getVoiceMuted RadioRoom')
  player.data['voice.muted'];
}

const setMicrophoneKey = (player, key) => {
  methods.debug('setMicrophoneKey RadioRoom')
  player.voice.microphoneKey = key;
  player.call('voice.changeMicrophoneActivationKey', [key]);
};

const getMicrophoneKey = (player) => {
  methods.debug('getMicrophoneKey RadioRoom')
  player.voice.microphoneKey;
}

const vmethods = {
  getMicrophoneKey,
  setMicrophoneKey,
  getVoiceMuted,
  setVoiceMuted,
  getVoiceDistance,
  setVoiceDistance,
  isEnabledMicrophone
};

mp.events.add('voice.server.callMethod', (method, ...args) => {
  methods.debug('callMethod RadioRoom', ...args)
  if (typeof vmethods[method] === 'function') {
    return vmethods[method](...args);
  }
});

module.exports = vmethods;