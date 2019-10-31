import {myUserInfo, setPlayersInfo} from "./helpers";
import {playersProgress} from "./typeEngine";

export function startSocketGameStarted(socket, setIsReadyToPlay) {
  socket.on('gameStarted', function (playersData) {
    setPlayersInfo(playersData);
    setIsReadyToPlay(true);
  });
}

export function startSocketRemoteType(socket, setPlayersCurrentProgress) {
  console.info('startSocketRemoteType');
  socket.on('remoteType', function (userId, progress) {
    console.info('remoteCorrectType', userId, progress);
    console.info('playersProgress', playersProgress);
    playersProgress[userId] = progress;
    setPlayersCurrentProgress({...playersProgress});
  });
}

export function emitEventGameOver(socket) {
  console.info('emitEventGameOver');
  socket.emit('gameOver', myUserInfo);
}