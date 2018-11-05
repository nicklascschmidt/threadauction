
// for production - not sure if we need
// require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./models");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Static directory
app.use(express.static("client/build"));
// app.use('/static', express.static(path.join(__dirname, 'client/build/static')));


// Routes
require("./routes/api-routes/login-routes.js")(app);
require("./routes/api-routes/signup-routes.js")(app);
require("./routes/api-routes/profile-routes.js")(app);
require("./routes/api-routes/auction-routes.js")(app);
require("./routes/api-routes/auction-bid-routes.js")(app);


app.use((req, res, next) => {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// only force=true if we want to add columns or reset the data in the db
db.sequelize.sync(/*{ force: true }*/).then(function() {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});


module.exports = app;

