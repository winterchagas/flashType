function buildRoomPlayersInfo(users, playersInRoomIds) {
  const roomPlayers = {};
  playersInRoomIds.forEach((id) => {
    roomPlayers[id] = users.getUser(id);
  });
  return roomPlayers;
}

// function buildDatabaseProfileObject(profile) {
//   return {
//     id: profile.id,
//     email: profile._json.email,
//     photo: profile._json.picture,
//     firstName: profile.name.givenName,
//     lastName: profile.name.familyName,
//   }
// }

function generateRandomName() {
  return `guest-${Date.now()}`
}

function calculateWpm(match, playerId) {
  const {numberOfWords} = match;
  const {elapsedTime} = match[playerId];
  return numberOfWords / (elapsedTime / 60)
}

function calculateCps(match, playerId) {
  const {numberOfCharacters} = match;
	const {elapsedTime} = match[playerId];
  return numberOfCharacters / elapsedTime
}

module.exports = {
  buildRoomPlayersInfo,
  // buildDatabaseProfileObject,
  generateRandomName,
  calculateWpm,
  calculateCps
};