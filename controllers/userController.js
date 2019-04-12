const db = require("../models");

// Methods
module.exports = {
  // Add user from signup page
  create: function(req,res) {
    db.User
      .create(req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  // Check user login credentials
  findUser: function(req,res) {
    db.User
      .findOne({ where: req.query })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  // Load user info on profile page
  findProfile: function(req,res) {
    db.User
      .findOne({ where: { id: req.query.userId }})
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
};
