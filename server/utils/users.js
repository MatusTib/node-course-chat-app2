class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    this.users = this.users.filter((user) => user.id != id);
    return this.users;

  }
  getUser (id) {
    return this.users.filter((user) => user.id === id);
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) =>  user.name);
    return namesArray;
  }
  isDuplicate (name, room) {
    var usersList = this.users.find((user) => user.name === name && user.room === room);
    return (usersList != undefined);
  }

}

module.exports = {Users};
