var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');
var Accel = require('ui/accel');

// Show splash screen while waiting for data
var splashWindow = new UI.Window();

// Text element to inform user
var text = new UI.Text({
  position: new Vector2(0, 36),
  size: new Vector2(144, 168),
  text:'Downloading game data...',
  font:'GOTHIC_28_BOLD',
  color:'white',
  textOverflow:'wrap',
  textAlign:'center',
});

// Add to splashWindow and show
splashWindow.add(text);
splashWindow.show();

ajax(
  {
    url: 'https://tn-find-next-game.herokuapp.com/api/team/17947',
    type: 'json'
  },
  function(data) {
    splashWindow.hide();
    
    // Create the Card for detailed view
    var detailCard = new UI.Card({
      title: data.teamName,
      subtitle: data.next.rinkLocation + ' ' + data.next.rinkNumber,
      body: data.next.date
    });

    detailCard.show();
  },
  function(error) {
    splashWindow.hide();
    console.log('Download failed: ' + error);
    
    var errorCard = new UI.Card({
      title: 'Error occured...',
      body: 'Unable to connect to API.'
    });

    errorCard.show();
  }
);

// Prepare the accelerometer
Accel.init();