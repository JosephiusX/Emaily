const passport = require('passport');


module.exports = (app) => {
  app.get(// when user route
    '/auth/google', // Kick to OAuth flow. "google": internal identifyer of the strategy 
    passport.authenticate('google', {
      scope: ['profile', 'email'] // User information from account granted access to when authorized
    })
  );
  
  app.get('/auth/google/callback', passport.authenticate('google')); // tates user to the user profile

  app.get('/api/logout', (req, res) =>{
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

};