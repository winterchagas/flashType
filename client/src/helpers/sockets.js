import {
  addPlayers,
  playersInfo,
  deletePlayer,
  makePlayersInRoom
} from "./helpers";
import { playersProgress, setSentence } from "./typeEngine";

export function startSocketStartGame(socket, setIsReadyToPlay) {
  socket.on("startGame", function(sentence) {
    setSentence(sentence);
    setIsReadyToPlay(true);
  });
}

export function startSocketRemoteType(socket, setPlayersCurrentProgress) {
  socket.on("remoteType", function(userId, progress) {
    playersProgress[userId] = progress;
    setPlayersCurrentProgress({ ...playersProgress });
  });
}

export function startSocketPlayerLeft(socket, setPlayersInRoom) {
  socket.on("playerLeft", function(userId) {
    console.info("playerLeft", playersInfo[userId]);
    deletePlayer(userId);
    const recentUsers = makePlayersInRoom();
    setPlayersInRoom(recentUsers);
  });
}

export function startSocketPlayerJoined(socket, setPlayersInRoom) {
  socket.on("playerJoined", function(user) {
    console.info("playerJoined", user[Object.keys(user)[0]]);
    addPlayers(user);
    const recentUsers = makePlayersInRoom();
    setPlayersInRoom(recentUsers);
  });
}

export function startSocketGetMatchStats(socket, setCurrentStats) {
  const allStats = [];
  socket.on("getMatchStats", function(userStats, userName) {
    allStats.push({ stat: userStats, name: userName });
    console.info("matchStats", allStats);
    setCurrentStats([...allStats]);
  });
}
