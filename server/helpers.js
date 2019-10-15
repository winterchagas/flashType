function buildRoomPlayersInfo(users, playersInRoomIds) {
  const roomPlayers = {};
  playersInRoomIds.forEach((id) => {
    roomPlayers[id] = users.getUser(id);
  });
  return roomPlayers;
}

module.exports = {buildRoomPlayersInfo};