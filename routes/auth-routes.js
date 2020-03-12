const router = require('express').Router();

//auth-login
router.get('/login', (req, res) => {
    res.render('login');
});

//auth-with-google
router.get('/google', (req, res) => {
    //handle with PassportJS
    res.send('Logging in with Google!');
});

//auth-logout
router.get('/logout', (req, res) => {
    //handle with PasspotyJS
    res.send('Logging out!');
});

module.exports = router;