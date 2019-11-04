const {buildRoomPlayersInfo} = require('../helpers/helpers');

function initializeCommunication(io, users, rooms, matches) {
  io.on('connection', function (socket) {
    const userInfo = {};
    console.log('a user connected');

    socket.on('correctType', ({userId, roomId}, progress) => {
      socket.to(roomId).emit('remoteType', userId, progress);
      if (progress === 100) {
        matches.endUserTimer(roomId, userId);
        const userStats = matches.updateUserStats(roomId, userId);
        socket.to(roomId).emit('sendMatchStats', userStats);
      }
    });

    socket.on('joinRoom', (userId, respondJoinedRoom) => {
      let roomId;
      const availableRoomId = rooms.searchAvailableRoom();
      if (availableRoomId) {
        socket.join(availableRoomId);
        const {startGame, playersIds, failed} = rooms.joinRoom(availableRoomId, userId);
        if (failed) respondJoinedRoom(false);
        if (startGame) {
          setTimeout(() => {
            // todo make bots
            // https://namey.muffinlabs.com/name.json?count=4&with_surname=true&frequency=rare
            const playersInfo = buildRoomPlayersInfo(users, playersIds);
            matches.addMatch(availableRoomId, playersIds);
            io.to(availableRoomId).emit('startGame', playersInfo);
          }, 0);
        }
        socket.to(availableRoomId).emit('playerJoined', users.getUser(userId));
        roomId = availableRoomId;
      } else {
        const newRoomId = rooms.addRoom();
        rooms.joinRoom(newRoomId, userId);
        socket.join(newRoomId);
        roomId = newRoomId;
      }
      userInfo.userId = userId;
      userInfo.roomId = roomId;
      respondJoinedRoom(roomId);
    });

    // socket.on('playerFinished', ({roomId}) => {
    //   socket.leave(roomId);
    //   users.deleteUser(userId);
    //   rooms.deleteRoom(roomId)
    // });

    socket.on('disconnect', () => {
      const {roomId, userId} = userInfo;
      console.log('LEFT GAME', userId);
      if (!!roomId && !!userId) {
        socket.to(userInfo.roomId).emit('playerLeft', userId);
        users.deleteUser(userId);
        const roomNumberOfPlayers = rooms.leaveRoom(roomId, userId);
        if (roomNumberOfPlayers === 0) rooms.deleteRoom(roomId);
      }
    });
  });
}

module.exports = {initializeCommunication};