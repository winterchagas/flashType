class Rooms {
  constructor() {
    this.rooms = {};
    this.roomId = 1;
  }

  addRoom() {
    this.rooms[this.roomId] = {
      players: [],
      full: false
    };
    const addedRoomId = this.roomId;
    this.roomId++;
    console.log('ROOM ADDED', addedRoomId, this.rooms);
    return addedRoomId;
  }

  joinRoom(roomId, playerId) {
    let startGame = false;
    const room = this.rooms[roomId];
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
    return Number(availableRoomId);
  }

  deleteRoom(roomId) {
    delete this.rooms[roomId];
  }
}

module.exports = {Rooms};