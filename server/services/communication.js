const {buildRoomPlayersInfo} = require('../helpers/helpers');

function initializeCommunication(io, users, rooms) {
  io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('correctType', (userId, roomId, progress) => {
      socket.to(roomId).emit('remoteType', userId, progress);
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
          setTimeout(() => {
            io.to(availableRoomId).emit('gameStarted', playersInfo);
          }, 0);
          respondJoinedRoom(availableRoomId);
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