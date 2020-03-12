const express = require("express");

const app = express();

//setup view-engine
app.set('view engine', 'ejs');

//create home route
app.get('/', (req,res) => {
    res.render('index');
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Listening on port 3000!");
});