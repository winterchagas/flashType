function buildRoomPlayersInfo(users, playersInRoomIds) {
  const roomPlayers = {};
  playersInRoomIds.forEach((id) => {
    roomPlayers[id] = users.getUser(id);
  });
  return roomPlayers;
}

function buildDatabaseProfileObject(profile) {
  return {
    id: profile.id,
    email: profile._json.email,
    photo: profile._json.picture,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
  }
}

function generateRandomName() {
  return `guest-${Date.now()}`
}

module.exports = {
  buildRoomPlayersInfo,
  buildDatabaseProfileObject,
  generateRandomName
};