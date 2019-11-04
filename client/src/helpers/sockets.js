import { myUserInfo, setPlayersInfo } from "./helpers";
import { playersProgress } from "./typeEngine";

export function startSocketStartGame(socket, setIsReadyToPlay) {
	socket.on('startGame', function (playersData) {
		setPlayersInfo(playersData);
		setIsReadyToPlay(true);
	});
}

export function startSocketRemoteType(socket, setPlayersCurrentProgress) {
	socket.on('remoteType', function (userId, progress) {
		console.info('remoteCorrectType', userId, progress);
		console.info('playersProgress', playersProgress);
		playersProgress[userId] = progress;
		setPlayersCurrentProgress({ ...playersProgress });
	});
}

export function startSocketPlayerLeft(socket) {
	socket.on('playerLeft', function (userId) {
		console.info('playerLeft', userId);
	});
}