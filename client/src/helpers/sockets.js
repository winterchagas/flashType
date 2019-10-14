export function initializeSockets(socket, setIsReadyToPlay) {
  console.log('initializeSockets');

  // socket.on('connect', function () {
  //   console.info('FRONT END CONNECTED');
  // });

  socket.on('gameStarted', function () {
    setIsReadyToPlay(true);
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
