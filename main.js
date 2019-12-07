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

require('./server/services/firebase').initializeDatabase();
require('./server/routes/authRoutes').initializeRoutes(app, users);
require('./server/routes/statsRoutes').initializeRoutes(app);
require('./server/services/communication').initializeCommunication(io, users, rooms, matches);

if (process.env.ENVIRONMENT === 'production') {
  const staticMiddleware = express.static("build");
  app.use(staticMiddleware);
  app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/build/index.html'));
  });
} else {
  require('./config/devSetup').devSetup(app);
}

http.listen(5000, () => console.log('server started '));
