const {buildRoomPlayersInfo} = require('../helpers/helpers');

function initializeCommunication(io, users, rooms, matches) {
  io.on('connection', function (socket) {
    const userInfo = {};

    socket.on('gameStarted', () => {
      matches.startUserTimer(userInfo.roomId, userInfo.userId);
    });

    socket.on('correctType', (progress) => {
      const {roomId, userId} = userInfo;
      socket.to(roomId).emit('remoteType', userId, progress);
      if (progress === 100) {
        matches.endUserTimer(roomId, userId);
        const userStats = matches.updateUserStats(roomId, userId);
        socket.to(roomId).emit('getMatchStats', userStats);
      }
    });

    socket.on('joinRoom', (userId, respondJoinedRoom) => {
      let roomId, playersInfo;
      const availableRoomId = rooms.searchAvailableRoom();
      if (availableRoomId) {
        socket.join(availableRoomId);
        const {startGame, playersIds, failed} = rooms.joinRoom(availableRoomId, userId);
        if (failed) respondJoinedRoom(false);
        if (startGame) {
          setTimeout(() => {
            // todo make bots
            // https://namey.muffinlabs.com/name.json?count=4&with_surname=true&frequency=rare
            matches.addMatch(availableRoomId, playersIds);
            io.to(availableRoomId).emit('startGame');
          }, 3000);
        }
        socket.to(availableRoomId).emit('playerJoined', {
          [userId]: users.getUser(userId)
        });
        roomId = availableRoomId;
        playersInfo = buildRoomPlayersInfo(users, playersIds);
      } else {
        const newRoomId = rooms.addRoom();
        rooms.joinRoom(newRoomId, userId);
        socket.join(newRoomId);
        roomId = newRoomId;
      }
      userInfo.userId = userId;
      userInfo.roomId = roomId;
      respondJoinedRoom(roomId, playersInfo);
    });

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