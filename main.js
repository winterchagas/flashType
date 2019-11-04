const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const {Users} = require('./server/services/users');
const {Rooms} = require('./server/services/rooms');
const {Matches} = require('./server/services/matches');

app.use(bodyParser.json());

const users = new Users();
const rooms = new Rooms();
const matches = new Matches();

require('./server/services/firebase')
  .initializeDatabase();
// require('./server/services/authentication');
require('./server/routes/authRoutes')
  .initializeRoutes(app, users);
require('./server/services/communication')
  .initializeCommunication(io, users, rooms, matches);

if (process.env.ENVIRONMENT === 'production') {
  const staticMiddleware = express.static("client/prodBuild");
  app.use(staticMiddleware);
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/prodBuild/index.html');
  });
} else {
  require('./server/config/devSetup').devSetup(app);
}


http.listen(5000, () => console.log('server started '));
