const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user) {
        //if user not logged in
        res.redirect('/auth/login');
    } else {
        //if user logged in
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('profile', {user: req.user[0]});
});

module.exports = router;