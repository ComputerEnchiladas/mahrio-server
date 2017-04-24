process.env.NODE_URL='192.168.0.9';

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

  });

  console.log('Server Ready');
});
