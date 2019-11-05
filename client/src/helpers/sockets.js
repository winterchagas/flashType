import { setPlayersInfo, playersInfo } from "./helpers";
import { playersProgress } from "./typeEngine";

export function startSocketStartGame(socket, setIsReadyToPlay) {
	socket.on('startGame', function () {
		setIsReadyToPlay(true);
	});
}

export function startSocketRemoteType(socket, setPlayersCurrentProgress) {
	socket.on('remoteType', function (userId, progress) {
		playersProgress[userId] = progress;
		setPlayersCurrentProgress({ ...playersProgress });
	});
}

export function startSocketPlayerLeft(socket) {
	socket.on('playerLeft', function (userId) {
		console.info('playerLeft', userId);
	});
}

export function startSocketPlayerJoined(socket) {
	socket.on('playerJoined', function (user) {
		console.info('playerJoined', user);
		setPlayersInfo(user);
	});
}
