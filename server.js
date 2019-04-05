// Entry point of the application.
// Set up server, import routes, sync DB.

// Dependencies
const express = require("express");
const bodyParser = require("body-parser");

// Bring in routes, initialize express, define dev port
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 8080;

// Parse request body as JSON (for AJAX reqs) | body-parser for safety
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
app.use(express.static('client'));
app.use(routes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

const db = require("./models");

// only force=true if we want to add columns or reset the data in the db
const force = { force: false }

db.sequelize.sync(force).then(function() {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});

module.exports = app;
