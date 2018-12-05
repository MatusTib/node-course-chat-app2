class Rooms {
  constructor () {
    this.rooms = [];
  }

  addRoom (room) {
    let found = (this.rooms.find((e) => e === room) != undefined);
    // console.log('room Found?', found);
    if (!found) {
      this.rooms.push(room);  //If chat room does not already exist add to list
    }
      
  }
  getRoomList () {
    return this.rooms;
  }
}
module.exports = {Rooms};
