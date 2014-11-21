/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');

var main = new UI.Card({
  title: 'RESTroom',
  subtitle: 'Loading...'
});

main.show();

var ws = new WebSocket('ws://secondcity.nerderylabs.com/signalr/connect?transport=webSockets&clientProtocol=1.4&connectionToken=5Oe%2B4EZPMIDOwMQ9ru6aGKRfjNNKt3sc8Ei0XVMRSJmUH3XwXnTWHavUfCT3bFAtN6eHK%2ByFksGraCn7BL4a6KaiREQ7fkyedXkB%2BbFDYifqyt93YI%2Fjk0H2hTAhzNP3&connectionData=%5B%7B%22name%22%3A%22bathroomhub%22%7D%5D&tid=3');

ws.onopen = function() {
    console.log("Web Socket Opened");
};

ws.onmessage = function(evt) {
    console.log("onmessage", evt); 
  var loadScreen = new UI.Card({
      title: 'Loaded.',
    body: evt.data
    });
  loadScreen.show();
};

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
