const generateUuid = require('uuid/v1');

class Rooms {
  constructor() {
    this.rooms = {};
  }

  addRoom() {
    const addedRoomId = generateUuid();
    this.rooms[addedRoomId] = {
      players: [],
      full: false
    };
    // console.log('ROOM ADDED', addedRoomId, this.rooms);
    return addedRoomId;
  }

  joinRoom(roomId, playerId) {
    let shouldStartGame = false;
    const room = this.rooms[roomId];
    const isPLayerInRoom = room.players.some(id => playerId === id);
    if (isPLayerInRoom) {
      return {failed: true};
    }
    room.players.push(playerId);
    if (room.players.length > 1) {
      room.full = true;
      shouldStartGame = true;
    }
    // console.log('PLAYER', playerId, 'JOINED', roomId);
    return {shouldStartGame, playersIds: room.players};
  }

  leaveRoom(roomId, playerId) {
    const room = this.rooms[roomId];
    room.players = room.players.filter(userId => playerId !== userId);
    // console.log('leaveRoom', room.players);
    return room.players.length;
  }

  searchAvailableRoom() {
    let availableRoomId;
    for (const roomId of Object.keys(this.rooms)) {
      if (!this.rooms[roomId].full) {
        availableRoomId = roomId;
        // console.log('ROOM FOUND', availableRoomId);
        break;
      }
    }
    return availableRoomId;
  }

  deleteRoom(roomId) {
    if (this.rooms[roomId]) delete this.rooms[roomId];
    // console.log('ROOM DELETED ?', roomId, !this.rooms[roomId]);
  }
}

module.exports = {Rooms};