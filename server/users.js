class Users {
  constructor() {
    this.users = {};
    this.id = 1;
  }

  addUser(name) {
    const isDuplicatedUser = Object.keys(this.users)
      .some(key => this.users[key].name === name);
    if (isDuplicatedUser) {
      return null;
    }
    // const user = {name};
    const id = this.id;
    this.users[this.id] = name;
    this.id++;
    console.log('USER ADDED', name, this.users);
    return {name, id};
  }


  getUser(userId) {
    return this.users[userId];
  }

  resetUsers() {
    this.users = [];
    this.id = 1;
  }
}

module.exports = {Users};