const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

if (process.env.ENVIRONMENT === 'production') {
  const staticMiddleware = express.static("client/prodBuild");
  app.use(staticMiddleware);
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/prodBuild/index.html');
  });
} else {
  require('./server/devSetup').devSetup(app);
}

const {Users} = require('./server/users');
const {Rooms} = require('./server/rooms');

const users = new Users();
const rooms = new Rooms();

let gameStarted = false;

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('login', (userName, callback) => {
    const userAdded = users.addUser(userName);
    if (userAdded) {
      callback(true, userAdded);
    } else {
      callback(false);
    }
  });

  socket.on('startGame', () => {
    console.log('startGame');
    gameStarted = true;
    io.emit('gameStarted');
  });

  socket.on('correctType', (userId, progress) => {
    console.log('correctType');
    socket.broadcast.emit('remoteCorrectType', userId, progress);
  });

  socket.on('joinRoom', (userId) => {
    console.log('correctType');
    socket.broadcast.emit('remoteCorrectType', userId, progress);
  });

});

http.listen(3000, () => console.log('server started '));
