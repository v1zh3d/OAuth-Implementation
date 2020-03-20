const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
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
    var q = "select * from oauthvendors where email = '" + email + "'";
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
        var q = "select * from oauthvendors where email = '" + profile._json.email + "'";
        conn.query(q, (err, userResult, fields) => {
            if(err) throw err;
            if (isEmpty(userResult) || userResult[0].email != profile._json.email) {
                //add if new user
                var q = "insert into oauthvendors values ('" + profile.id + "', '" + profile._json.name + "', '" + profile._json.email + "', '" + profile._json.picture + "')";
                conn.query(q, (err, addedUserResult) => {
                    if (err) throw err;
                    console.log("User Added!");
                    var q = "select * from oauthvendors where email = '" + profile._json.email + "'";
                    conn.query(q, (err, newUserResult) => {
                        if (err) throw err;
                        done(null, newUserResult);
                    });
                });
            } else {
                console.log('User Already Exists!');
                var q1 = "select * from oauthvendors where email = '" + userResult[0].email + "'";
                conn.query(q1, (err, existingUserResult) => {
                    if (err) throw err;
                    done(null, existingUserResult);
                });
            }
        });
    })
);

passport.use(
    new FacebookStrategy({
        //options for strategy
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/oauth2callback',
        profileFields: ['id', 'displayName', 'picture.type(large)', 'email']
    }, (accessToken, refreshToken, profile, done) => {
        //retrieve-facebook-photo
        const picture = `https://graph.facebook.com/${profile.id}/picture?width=200&height=200&access_token=${accessToken}`;
        //passport callback function
        console.log('Passport Callback is fired!');
        //check already exist user
        var q = "select * from oauthvendors where email = '" + profile._json.email + "'";
        conn.query(q, (err, userResult, fields) => {
            if (err) throw err;
            if (isEmpty(userResult) || userResult[0].email != profile._json.email) {
                //add if new user
                var q = "insert into oauthvendors values ('" + profile.id + "', '" + profile._json.name + "', '" + profile._json.email + "', '" + picture + "')";
                conn.query(q, (err, addedUserResult) => {
                    if (err) throw err;
                    console.log("User Added!");
                    var q = "select * from oauthvendors where email = '" + profile._json.email + "'";
                    conn.query(q, (err, newUserResult) => {
                        if (err) throw err;
                        done(null, newUserResult);
                    });
                });
            } else {
                console.log('User Already Exists!');
                var q1 = "select * from oauthvendors where email = '" + userResult[0].email + "'";
                conn.query(q1, (err, existingUserResult) => {
                    if (err) throw err;
                    done(null, existingUserResult);
                });
            }
        });
    })
);