let firebase;

function initializeDatabase() {
  firebase = require('firebase/app');
  require('firebase/database');
  const {firebaseConfig} = require('../../config/keys');
  firebase.initializeApp(firebaseConfig);
}

async function createUser(profile) {
  try {
    await firebase.database()
      .ref(`users/${profile.userId}`)
      .set(profile);
    // console.log('CREATED USER', profile);
    return {userCreated: true}
  } catch (createUserError) {
    // console.log('ERROR CREATING USER', createUserError);
    return {createUserError}
  }
}

async function findUser(uuid) {
  try {
    const snapshot = await firebase.database()
      .ref(`users/${uuid}`)
      .once('value');
    // console.log('FIND USER RESPONSE', snapshot.val());
    return {
      ok: true,
      user: snapshot.val()
    }
  } catch (error) {
    // console.log('ERROR FINDING USER', error);
    return {
      ok: false,
      findUserError: error
    }
  }
}

async function getStats() {
  try {
    const snapshot = await firebase.database()
      .ref(`stats`)
      .once('value');
    // console.log('GET ALL STATS', snapshot.val());
    return {
      ok: true,
      stats: snapshot.val()
    }
  } catch (error) {
    // console.log('ERROR GETTING STATS', error);
    return {
      ok: false,
      statsError: error
    }
  }
}

async function updateStats(newStats) {
  try {
    await firebase.database()
      .ref(`stats`)
      .set(newStats);
    // console.log('STATS UPDATED', newStats);
  } catch (updateStatsError) {
    // console.log('ERROR UPDATING STATS', updateStatsError);
  }
}

function updateUser() {
}


// firebase.database().ref('users/uuid1').set({
//   name: 'magicLeonardos',
//   level: 1,
// })
//   .then(() => {
//     console.log('WORKED')
//   })
//   .catch((error) => {
//     console.log('error?', error);
//   });

// firebase.database()
//   .ref('users/uuid1')
//   .update({name: 'the master', level: 10})
//   .then((response) => {
//     console.log('error', response);
//   });

module.exports = {
  initializeDatabase,
  findUser,
  updateUser,
  createUser,
  getStats,
  updateStats
};