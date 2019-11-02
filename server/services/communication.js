const {buildRoomPlayersInfo} = require('../helpers/helpers');

function initializeCommunication(io, users, rooms) {
  io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('correctType', ({userId, roomId}, progress) => {
      socket.to(roomId).emit('remoteType', userId, progress);
    });

    socket.on('joinRoom', (userId, respondJoinedRoom) => {
      const availableRoomId = rooms.searchRooms();
      if (availableRoomId) {
        socket.join(availableRoomId);
        const {
          startGame,
          playersIds,
          failed
        } = rooms.joinRoom(availableRoomId, userId);
        if (failed) {
          respondJoinedRoom(false);
        } else if (startGame) {
          const playersInfo = buildRoomPlayersInfo(users, playersIds);
          setTimeout(() => {
            // todo make bots
            // https://namey.muffinlabs.com/name.json?count=4&with_surname=true&frequency=rare
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

    socket.on('gameOver', ({roomId}) => {
      socket.leave(roomId);
      rooms.deleteRoom(roomId)
    });

    socket.on('playerLeft', ({userId, roomId}) => {
      users.deleteUser(userId);
      // todo if it is last player delete room
    });
  });
}

module.exports = {initializeCommunication};