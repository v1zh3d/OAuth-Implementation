const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const conn = require('./database');

passport.use(
    new GoogleStrategy({
        //options for strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/oauth2callback'
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        console.log('Passport Callback is fired!');
        //check already exist user
        var q = "select id from google";
        conn.query(q, (err, result, fields) => {
            if(err) throw err;
            else if (result[0].id == profile.id) {
                console.log('User Already Exists!');
            }
            else {
                //add if new user
                var q = "insert into google values ('" + profile.id + "', '" + profile._json.name + "', '" + profile._json.email + "')";
                conn.query(q, (err, result) => {
                    if (err) throw err;
                    console.log("User Added!");
                });
            }
        });
    })
);