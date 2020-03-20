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
router.get('/google/oauth2callback', passport.authenticate('google', {
            failureRedirect: '/login'
        }), (req, res) => {
    res.redirect('/profile/');
});

//auth-with-facebook
router.get('/facebook', passport.authenticate('facebook', {
    authType: 'rerequest',
    scope: ['email']
}));

//callback-route-for-facebook-2-redirect
router.get('/facebook/oauth2callback', passport.authenticate('facebook', {
            failureRedirect: '/login'
        }), (req, res) => {
    res.redirect('/profile/');
});

//auth-logout
router.get('/logout', (req, res) => {
    //handle with PassportJS
    req.logOut();
    res.redirect('/');
});

module.exports = router;