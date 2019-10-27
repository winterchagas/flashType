const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('../config/keys').cookieKey;
const {generateRandomName} = require('../helpers/helpers');

function initializeRoutes(app, users) {
  app.use(
    cookieSession({
      keys,
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/google', (req, res) => {

  });

  app.get('/auth/guest', (req, res) => {
    const userName = generateRandomName();
    const userAdded = users.addUser(userName);
    if (userAdded) {
      res.status(200).send(userAdded)
    } else {
      res.status(400).send(false);
    }
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};

module.exports = {initializeRoutes};