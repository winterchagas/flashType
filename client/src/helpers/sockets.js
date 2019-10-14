export function initializeSockets(socket, ) {
  socket.on('connect', function () {
    console.info('FRONT END CONNECTED');
  });

  socket.on('gameStarted', function () {
    setGameStarted(true);
    console.info('GAME STARTED');
  });

  socket.on('remoteCorrectType', function (userId, progress) {
    // // playersCurrentProgress,
    //   setPlayersCurrentProgress({
    //
    //   });
    console.info('remoteCorrectType', userId, progress);
  });
}
