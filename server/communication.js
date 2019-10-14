const {Users} = require('./users');
const {Rooms} = require('./rooms');

const users = new Users();
const rooms = new Rooms();

let gameStarted = false;

function initializeCommunication(io) {
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

    socket.on('correctType', (userId, progress) => {
      console.log('correctType');
      socket.broadcast.emit('remoteCorrectType', userId, progress);
    });

    socket.on('joinRoom', (userId, sendBackRoomId) => {
      const availableRoomId = rooms.searchRooms();
      if (availableRoomId) {
        socket.join(availableRoomId);
        const startGame = rooms.joinRoom(availableRoomId, userId);
        if (startGame) {
          setTimeout(() => {
            io.to(availableRoomId).emit('gameStarted');
          }, 330);
        }
        sendBackRoomId(availableRoomId);
      } else {
        const newRoomId = rooms.addRoom();
        rooms.joinRoom(newRoomId, userId);
        socket.join(newRoomId);
        sendBackRoomId(newRoomId);
      }
      // console.log('correctType');
      // socket.broadcast.emit('remoteCorrectType', userId, progress);
    });

  });
}

module.exports.initializeCommunication = initializeCommunication;