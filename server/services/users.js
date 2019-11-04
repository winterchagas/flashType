class Users {
  constructor() {
    this.users = {};
  }

  addUser(userName, userId) {
    // const isDuplicatedUser = Object.keys(this.users)
    //   .some(key => this.users[key].name === name);
    // if (isDuplicatedUser) {
    //   return null;
    // }
    // const user = {name};
    this.users[userId] = userName;
    console.log('USER ADDED', userName, this.users);
    return {userName, userId};
  }

  getUser(userId) {
    return this.users[userId];
  }

  deleteUser(userId) {
    if (this.users[userId]) delete this.users[userId];
    console.log('USER DELETED', userId);
  }

  resetUsers() {
  }
}

module.exports = {Users};