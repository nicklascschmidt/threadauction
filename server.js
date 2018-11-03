
// for production - not sure if we need
// require('dotenv').config();

// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");


// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// app.use('/static', express.static(path.join(__dirname, 'client/build/static')));


// Static directory
app.use(express.static("client/build"));

// Routes
// =============================================================
// require("./routes/api-routes/api-routes.js")(app);
require("./routes/api-routes/login-routes.js")(app);
require("./routes/api-routes/signup-routes.js")(app);
require("./routes/api-routes/auction-routes.js")(app);
require("./routes/api-routes/profile-routes.js")(app);


// app.use((req, res, next) => {
// 	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// Syncing our sequelize models and then starting our Express app
// =============================================================
// only force=true if we want to add columns or reset the data in the db
db.sequelize.sync(/*{ force: true }*/).then(function() {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});




// not sure if we need
module.exports = app;

