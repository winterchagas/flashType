import {setPlayersInfo} from "./helpers";

export function startSocketGameStarted(socket, setIsReadyToPlay) {
  socket.on('gameStarted', function (playersData) {
    setPlayersInfo(playersData);
    setIsReadyToPlay(true);
  });
}

export function startSocketRemoteType(socket, playersCurrentProgress, setPlayersCurrentProgress) {
  socket.on('remoteType', function (userId, progress) {
    setPlayersCurrentProgress({
      ...playersCurrentProgress,
      [userId]: progress
    });
    console.info('remoteCorrectType', userId, progress);
  });
}