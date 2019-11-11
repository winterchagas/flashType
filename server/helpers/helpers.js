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
  const date = String(Date.now());
  const randomPart = date.substring(date.length, date.length - 4);
  return `guest-${randomPart}`
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

function startGame(io, matches, availableRoomId, playersIds) {
  setTimeout(() => {
    const {sentence, numberOfWords, numberOfCharacters} = generateSentence();
    // todo make bots
    // https://namey.muffinlabs.com/name.json?count=4&with_surname=true&frequency=rare
    matches.addMatch(availableRoomId, playersIds, numberOfWords, numberOfCharacters);
    io.to(availableRoomId).emit('startGame', sentence);
  }, 500);
}

function generateSentence() {
  const sentence = 'The numbers in the table specifies the first browser version that fully supports the selector.';
  // const sentence = 'aa';
  return {
    sentence,
    numberOfWords: countWords(sentence),
    numberOfCharacters: sentence.length
  };
}

function countWords(sentence) {
  return sentence.split(" ").length;
}

module.exports = {
  buildRoomPlayersInfo,
  // buildDatabaseProfileObject,
  generateRandomName,
  calculateWpm,
  calculateCps,
  startGame
};