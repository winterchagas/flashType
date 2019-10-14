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
    this.roomId++;
    console.log('ROOM ADDED', this.roomId, this.rooms);
    return this.roomId;
  }

  joinRoom(roomId, playerId) {
    this.rooms[roomId].players.push(playerId);
    if (this.rooms[roomId].players.length > 4) {
      this.rooms[roomId].full = true;
    }
    console.log('PLAYER', playerId, 'JOINED', roomId);
    return this.rooms[roomId];
  }

  searchRooms() {
    let availableRoomId;
    for (const roomId of Object.keys(this.rooms)) {
      if (!this.rooms[roomId].full) {
        availableRoomId = roomId;
        break;
      }
    }
    console.log('ROOM FOUND', availableRoomId);
    return availableRoomId;
  }

  deleteRoom(roomId) {
    delete this.rooms[roomId];
  }
}

module.exports = {Users};