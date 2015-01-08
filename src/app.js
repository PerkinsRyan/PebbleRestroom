var UI = require('ui'),
    ajax = require('ajax'),
    Vibe = require('ui/vibe'),
    mainWindow;

var LOCATION = {
  UNKNOWN: 0,
  BATHROOM: 1,
  CONFERENCE_ROOM: 2
};

function init() {
  mainWindow = new UI.Menu({
    sections: [{
      title: "Restroom Status"
    }]
  });
  
  mainWindow.show();
  
  bindEvents();
  loadData();
}

function bindEvents() {
  mainWindow.on('select', function() {
    loadData(function() {
      Vibe.vibrate('short');
    });
  });
}

function loadData(callback) {
  ajax({
    url: "http://secondcity.nerderylabs.com/api/Locations",
    type: "json"
  }, function(data) {
    var items = [];
    
    for (var i = 0; i < data.length; i++) {
      if (data[i].Type == LOCATION.BATHROOM) {
        items[i] = {
          title: data[i].Id,
          subtitle: getStatus(data[i].IsAvailable, data[i].DataIsStale)
        };
      }
    }
    
    mainWindow.items(0, items);
    if (callback) {
      callback();
    }
  }, function(error) {
    console.log("Error");
  });
}

function getStatus(isAvailable, isStale) {
  if (isStale) {
    return "Connection Unavialable";
  } else if (isAvailable) {
    return "Available";
  }
  return "Unavailable";
}

init();