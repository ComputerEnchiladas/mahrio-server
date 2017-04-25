process.env.NODE_URL='192.168.0.9';

var five = require("johnny-five");
var board = new five.Board();
var servoX, servoY;;
board.on("ready", function() {
  servoX = new five.Servo({pin:3, center: true, range: [60,120]});
  servoY = new five.Servo({pin: 5, center: true, range: [60, 120]});
});

require('mahrio').runServer( process.env, __dirname ).then( function( server ) {

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: ['../public/']
      }
    }
  });

  var io = require('socket.io').listen( server.listener );
  io.on('connection', function( socket ) {
    console.log('connection: ', socket.id );
    socket.emit('event:hello');
  
    //BEGIN LISTENING FOR SOCKET MESSAGES FROM CLIENTS
    //Example:
    //socket.on('myCustomMessage', function( val ){ console.log( val ); });

    // SERVO MOTORS WITH JOHNNY-FIVE
    socket.on('cam:X', function(){ servoX.sweep(); servoY.stop(); });
    socket.on('cam:Y', function(){ servoY.sweep(); servoX.stop(); });
    socket.on('cam:0', function(){ servoY.stop(); servoX.stop(); });
    socket.on('cam:XY', function(){ servoY.sweep(); servoX.sweep(); });
    socket.on('cam:--', function(){ servoY.center(); servoX.center(); });
    socket.on('cam:__', function(point){ servoX.to(point.x); servoY.to(point.y); });
  });

  var state = false;
  setInterval( function(){
    io.sockets.emit('event:led:state', state = !state );
  }, 1000);

  console.log('Server Ready');
});
