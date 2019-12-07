const {getStats, updateStats} = require('../services/firebase');
const sentences = require('./sentences');

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

const guestNames = ['Llama', 'Dog', 'Sloth', 'Monkey'];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateRandomName() {
  const randomName = guestNames[getRandomInt(4)];
  const date = String(Date.now());
  const randomPart = date.substring(date.length, date.length - 4);
  return `${randomName}-${randomPart}`
}

function calculateWpm(match, playerId) {
  const {numberOfWords} = match;
  const {elapsedTime} = match[playerId];
  return Number((numberOfWords / (elapsedTime / 60)).toFixed(1));
}

function calculateCps(match, playerId) {
  const {numberOfCharacters} = match;
  const {elapsedTime} = match[playerId];
  return Number((numberOfCharacters / elapsedTime).toFixed(2));
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
  const randomIndex = getRandomInt(16);
  const sentence = sentences[randomIndex];
  // const sentence = 'aaa';
 return {
    sentence,
    numberOfWords: countWords(sentence),
    numberOfCharacters: sentence.length
  };
}

function countWords(sentence) {
  return sentence.split(" ").length;
}

async function checkRecordBroken(userStats, userName) {
  const {ok, stats, statsError} = await getStats();
  let insertIndex;
  if (ok) {
    for (let i = 0; i < stats.length; i++) {
      if (userStats.cps > stats[i].cps) {
        insertIndex = i;
        break;
      }
    }
    if (!!insertIndex) {
      let arrayTop = [];
      let arrayBottom = [];
      if (insertIndex === 0) {
        arrayBottom = stats.slice(0, 9);
      } else if (insertIndex === 9) {
        arrayTop = stats.slice(0, 9);
      } else {
        arrayTop = stats.slice(0, insertIndex);
        arrayBottom = stats.slice(insertIndex, 9);
      }
      const builtNewStats = [
        ...arrayTop,
        {name: userName, cps: userStats.cps, wpm: userStats.wpm},
        ...arrayBottom
      ];
      updateStats(builtNewStats);
    }
  }
}

module.exports = {
  buildRoomPlayersInfo,
  // buildDatabaseProfileObject,
  generateRandomName,
  getRandomInt,
  calculateWpm,
  calculateCps,
  startGame,
  checkRecordBroken
};

// const a = {
//   key: "componentDidUpdate",
//   value: function (e, t, n) {
//     this.props.started &&
//     e.lineType != this.props.lineType &&
//     (
//       "single" == this.props.lineType ?
//         (this.contentContainerRef.current.setAttribute("style", "transition: none; transform: translateY(0px)"), this.scrollHorizontally()) :
//         "multi" == this.props.lineType && (this.goalOffset = this.currentLetterRef.current.offsetTop,
//       this.contentContainerRef.current.setAttribute("style", "transition: none; transform: translateY(-".concat(this.goalOffset, "px) translateX(0)")),
//       this.scrollTextVertically())
//     )
//   }
// }