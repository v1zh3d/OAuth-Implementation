const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
    new GoogleStrategy({
        //options for strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/oauth2callback'
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        console.log('Passport Callback is fired!');
        console.log(profile);
        console.log(profile._json.name);
        console.log(profile._json.email);
    })
);