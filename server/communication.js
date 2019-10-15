const {Users} = require('./users');
const {Rooms} = require('./rooms');
const {buildRoomPlayersInfo} = require('./helpers');

const users = new Users();
const rooms = new Rooms();

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

    socket.on('correctType', (userId, roomId, progress) => {
      console.log('correctType');
      socket.to(roomId).emit('remoteCorrectType', userId, progress);
    });

    socket.on('joinRoom', (userId, respondJoinedRoom) => {
      const availableRoomId = rooms.searchRooms();
      if (availableRoomId) {
        socket.join(availableRoomId);
        const {
          startGame,
          playersIds
        } = rooms.joinRoom(availableRoomId, userId);
        if (startGame) {
          const playersInfo = buildRoomPlayersInfo(users, playersIds);
          io.to(availableRoomId).emit('gameStarted', playersInfo);
        }
      } else {
        const newRoomId = rooms.addRoom();
        rooms.joinRoom(newRoomId, userId);
        socket.join(newRoomId);
        respondJoinedRoom(newRoomId);
      }
    });

  });
}

module.exports = {initializeCommunication};