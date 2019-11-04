const calculateWpm = require('../helpers/helpers');
const calculateCps = require('../helpers/helpers');

class Matches {
  constructor() {
    this.matches = {};
  }

  addMatch(matchId, playersIds) {
    const match = this.matches[matchId] = {
      numberOfWords: null,
      numberOfCharacters: null,
    };
    playersIds.forEach((id) => {
      match[id] = {
        wpm: null,
        cps: null,
        startTime: null,
        endTime: null,
	      elapsedTime: null,
      }
    });
    console.log('MATCH ADDED', matchId);
    return true;
  }

  startUserTimer(matchId, playerId) {
    this.matches[matchId][playerId].startTime = Date.now();
  }

  endUserTimer(matchId, playerId) {
  	const match = this.matches[matchId][playerId];
    match.endTime = Date.now();
    match.elapsedTime = (match.endTime - match.startTime) / 1000;
  }

  updateUserStats(matchId, playerId) {
    const match = this.matches[matchId];
    match[playerId].wpm = calculateWpm(match, playerId);
    match[playerId].cps = calculateCps(match, playerId);
    return match[playerId];
  }

  // deleteMatch(matchId) {
  //   if (this.rooms[roomId]) delete this.rooms[roomId];
  //   console.log('ROOM DELETED ?', roomId, !this.rooms[roomId]);
  // }
}

module.exports = {Matches};