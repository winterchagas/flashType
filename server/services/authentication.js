const authentication = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const {findUser, createUser} = require('./firebase');
const {buildDatabaseProfileObject} = require('../helpers');

authentication.serializeUser((user, done) => {
  console.log('serializeUser', user);
  done(null, user);
});

authentication.deserializeUser(async (user, done) => {
  console.log('deserializeUser', user);
  // todo FIND USER IN DB
  done(null, user);
});

authentication.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  let {ok, userFound, findUserError} = await findUser(profile.id);
  if (ok) {
    if (userFound) {
      done(null, userFound);
    }
    const profileObject = buildDatabaseProfileObject(profile);
    const {userCreated, createUserError} = await createUser(profileObject);
    if (userCreated) {
      done(null, profileObject);
    }
    done({error: createUserError});
  }
  done({error: findUserError});
}));
