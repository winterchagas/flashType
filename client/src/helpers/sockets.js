import {setPlayersInfo} from "./helpers";

export function initializeSockets(socket, setIsReadyToPlay) {
  // socket.on('connect', function () {
  //   console.info('FRONT END CONNECTED');
  // });

  socket.on('gameStarted', function (playersData) {
    console.log('playersDdata', playersData);
    setPlayersInfo(playersData);
    setIsReadyToPlay(true);
  });

  socket.on('remoteCorrectType', function (userId, progress) {
    // // playersCurrentProgress,
    //   setPlayersCurrentProgress({
    //
    //   });
    console.info('remoteCorrectType', userId, progress);
  });
}

// TODO INITIALIZE REMOTE CORRECT TYPE ON GAME COMPONENT