const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.serializeUser((userId, done) => {
  console.log('serializeUser', userId);
  done(null, userId);
});

passport.deserializeUser((id, done) => {
  console.log('deserializeUser', id);
  // todo FIND USER IN DB
  done(null, id);
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // todo PERSIST USER, PASS THE DB ID TO DONE
  done(null, profile.id);
}));