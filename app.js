const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const conn = require('./config/database');

const app = express();

//setup view-engine
app.set('view engine', 'ejs');

//create home route
app.get('/', (req, res) => {
    res.render('index');
});

//setup routes
app.use('/auth', authRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Listening on port 3000!");
});