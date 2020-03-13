const router = require('express').Router();
const passport = require('passport');

//auth-login
router.get('/login', (req, res) => {
    res.render('login');
});

//auth-with-google
router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

//callback-route-for-google-2-redirect
router.get('/google/oauth2callback', passport.authenticate('google'), (req, res) => {
    res.send(req.user);
});

//auth-logout
router.get('/logout', (req, res) => {
    //handle with PassportJS
    res.send('Logging out!');
});

module.exports = router;