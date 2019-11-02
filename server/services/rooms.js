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
    console.log('ROOM ADDED', addedRoomId, this.rooms);
    return addedRoomId;
  }

  joinRoom(roomId, playerId) {
    let startGame = false;
    const room = this.rooms[roomId];
    const isPLayerInRoom = room.players.some(id => playerId === id);
    if (isPLayerInRoom) {
      return {failed: true};
    }
    room.players.push(playerId);
    if (room.players.length > 1) {
      room.full = true;
      startGame = true;
    }
    console.log('PLAYER', playerId, 'JOINED', roomId);
    return {startGame, playersIds: room.players};
  }

  searchRooms() {
    let availableRoomId;
    for (const roomId of Object.keys(this.rooms)) {
      if (!this.rooms[roomId].full) {
        availableRoomId = roomId;
        console.log('ROOM FOUND', availableRoomId);
        break;
      }
    }
    return availableRoomId;
  }

  deleteRoom(roomId) {
    if (this.rooms[roomId]) delete this.rooms[roomId];
    console.log('ROOM DELETED', roomId);
  }
}

module.exports = {Rooms};