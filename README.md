# mahrio-server

This is a simple demonstration to show a Hapi Server provision integrated with a Mobile App. The `server.js` uses the
npm module `mahrio` which abstracts the server setup and configuration to run the server. In addition, the server uses
socket.io to listen for socket connections.

## server.js

* `process.env.NODE_URL` is used to set the IP address where the server will run. This needs to be same IP address the
host machine uses to connect to the internet. If this line is commented it defaults to be '127.0.0.1' (localhost)

## mobile/

Inside this folder you will find the Ionic mobile app.

### mobile/www/index.html

This is the entry into Ionic. Here we include other dependencies such as scripts, styles, and ionic. This file also contains
the connection to the server via sockets. `var socket = io('<ip-address-of-server>');`

## Run Locally

* clone this repo (`git clone https://github.com/ComputerEnchiladas/mahrio-server.git`)
* update server.js with your IP address or comment out to use localhost
* update mobile/www/index.html with the server's IP address
* run node server (`node server.js`) 
* go to mobile folder, then run mobile app (`ionic serve`)
