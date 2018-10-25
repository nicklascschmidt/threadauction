
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
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/Auction-routes.js")(app);
require("./routes/User-routes.js")(app);

// require('./routes/api-routes')(app);
// require('./routes/html-routes2')(app);

// app.use((req, res, next) => {
// 	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});




// not sure if we need
module.exports = app;

