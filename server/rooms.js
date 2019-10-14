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
    this.rooms[roomId].players.push(playerId);
    if (this.rooms[roomId].players.length > 1) {
      this.rooms[roomId].full = true;
      startGame = true;
    }
    console.log('PLAYER', playerId, 'JOINED', roomId);
    return startGame;
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
    delete this.rooms[roomId];
  }
}

module.exports = {Rooms};