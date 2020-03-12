const router = require('express').Router();
const passport = require('passport');

//auth-login
router.get('/login', (req, res) => {
    res.render('login');
});

//auth-with-google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

//auth-logout
router.get('/logout', (req, res) => {
    //handle with PasspotyJS
    res.send('Logging out!');
});

//callback-route-for-google-2-redirect
router.get('/google/oauth2callback', (req, res) => {
    res.send('You reached the callback URI!');
});

module.exports = router;