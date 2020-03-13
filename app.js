const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

//setup view-engine
app.set('view engine', 'ejs');

//create cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//create home route
app.get('/', (req, res) => {
    res.render('index', {user: req.user});
});

//setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Listening on port 3000!");
});