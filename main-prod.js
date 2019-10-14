// const path = require('path');
// const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
//
//
// // const staticMiddleware = express.static("/prodBuild");
// // app.use(staticMiddleware);
// app.get('/', function (req, res) {
//   console.log(__dirname + '/prodBuild/index.html');
//   res.sendFile(__dirname + '/prodBuild/index.html');
// });
//
// const {Users} = require('./server/users');
// const users = new Users();
//
// let gameStarted = false;
//
// io.on('connection', function (socket) {
//   console.log('a user connected');
//
//   socket.on('join', (userName, callback) => {
//     const userAdded = users.addUser(userName);
//     if (userAdded) {
//       callback(true, userAdded);
//     } else {
//       callback(false);
//     }
//   });
//
//   socket.on('startGame', () => {
//     console.log('startGame');
//     gameStarted = true;
//     io.emit('gameStarted');
//   });
//
//   socket.on('correctType', (userId, progress) => {
//     console.log('correctType');
//     socket.broadcast.emit('remoteCorrectType', userId, progress);
//   });
//
// });
//
// http.listen(3000, () => console.log('server started on port 3000'));
