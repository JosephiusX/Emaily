const passport = require('passport');

module.exports = (app) => {
  app.get(// when user route
    '/auth/google', // Kick to OAuth flow. "google": internal identifyer of the strategy 
    passport.authenticate('google', {
      scope: ['profile', 'email'] // User information from account granted access to when authorized
    })
  );
  
  app.get(
    '/auth/google/callback',
     passport.authenticate('google'), // passport is a middleware specifically for this route
  (req,res) => { // allows us to test deployment in browser [railway]
    res.redirect('/surveys');// tates user to the user profile
  }); 

  app.get('/api/logout', (req, res) => {
    req.logout(() => { // Add a callback function here
      res.redirect('/'); // Redirect to the starting point after logout
    });
  });
  // this lets us know weather or not the user is logged in or not for condsitional rendering.
  app.get('/api/current_user',(req, res) => res.send(req.user)); 

};