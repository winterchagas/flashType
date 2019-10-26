const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('../config/keys').cookieKey;

function initializeRoutes(app) {
  app.use(
    cookieSession({
      keys,
      maxAge: 30 * 24 * 60 * 60 * 1000
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    console.log('current_user', req.user);
    if (req.user) {
      res.send(req.user);
    }
    res.send({
      loggedIn: false
    });
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};

module.exports = {initializeRoutes};