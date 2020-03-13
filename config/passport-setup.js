const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const conn = require('./database');

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

passport.serializeUser((user, done) => {
    done(null, user[0].email);
});

passport.deserializeUser((email, done) => {
    var q = "select * from google where email = '" + email + "'";
    conn.query(q, (err, user, fields) => {
        if (err) throw err;
        done(null, user);
    });
});

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
        var q = "select * from google where id = '" + profile.id + "'";
        conn.query(q, (err, userResult, fields) => {
            if(err) throw err;
            if (isEmpty(userResult) || userResult[0].id != profile.id) {
                //add if new user
                var q = "insert into google values ('" + profile.id + "', '" + profile._json.name + "', '" + profile._json.email + "')";
                conn.query(q, (err, addedUserResult) => {
                    if (err) throw err;
                    console.log("User Added!");
                    var q = "select * from google where id = '" + profile.id + "'";
                    conn.query(q, (err, newUserResult) => {
                        if (err) throw err;
                        done(null, newUserResult);
                    });
                });
            } else {
                console.log('User Already Exists!');
                var q1 = "select * from google where id = '" + userResult[0].id + "'";
                conn.query(q1, (err, existingUserResult) => {
                    if (err) throw err;
                    done(null, existingUserResult);
                });
            }
        });
    })
);