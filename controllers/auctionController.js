const db = require("../models");

// Methods
module.exports = {
  findAllWithUserId: function(req, res) {
    db.Auction
      .findAll({ where: { UserId: req.params.userId }})
      .then(data => res.json(data))
      .catch(err => res.sendStatus(422).json(err));
  },



  
  // Find movies (watched || unwatched), sort by most recently updated.
  findAll: function(req, res) {
    db.Movie
      .findAll({ where: req.query, order: [['updatedAt','DESC']] })
      .then(dbMovies => res.json(dbMovies))
      .catch(err => res.status(422).json(err));
  },
  // Deletes movie from DB
  remove: function(req, res) {
    db.Movie
      .destroy({ where: req.params })
      .then(deletedResp => res.json(deletedResp))
      .catch(err => res.status(422).json(err));
  },
  // Updates isWatched to the opposite (bool)
  updateWatched: function(req, res) {
    let id = { id: req.params.id };
    let opposite = req.body.isWatched === 'true' ? false : true;
    db.Movie
      .update( { isWatched: opposite }, { where: id })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  // Updates user rating
  updateRating: function(req, res) {
    let id = { id: req.params.id };
    db.Movie
      .update( { userRating: req.body.rating }, { where: id })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  // Looks for a movie on the user's watchlist. Send bool to the client if found || not found
  findOne: function(req, res) {
    db.Movie
      .findOne({ where: req.query })
      .then(data => (data) ? res.send(true) : res.send(false))
      .catch(err => res.status(422).json(err));
  },
  // Adds movie to user's watchlist (i.e. the DB)
  create: function(req, res) {
    db.Movie
      .create(req.body)
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  }
};
