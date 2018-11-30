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
    // var foundUser = this.users.filter((user) => user.id === id);
    // return foundUser;
    // return this.users.filter((user) => user.id === id)[0];
    return this.users.filter((user) => user.id === id);
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) =>  user.name);
    return namesArray;
  }
  isDuplicate (name) {
    var usersList = this.users.find((user) => user.name === name);
    // console.log('usersList', usersList);
    return (usersList != undefined);
  }

}

module.exports = {Users};

// class Person {
//   constructor (name,age) {
//       this.name = name;
//       this.age = age;
//   }
//   getUserDescription() {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// let me = new Person('Florence',25);
// let description = me.getUserDescription();
// console.log(description);
