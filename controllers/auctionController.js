const db = require("../models");

// Methods
module.exports = {
  // Finds an auction given the auctionId
  findOneAuction: function (req, res) {
    db.Auction
      .findOne({ where: { id: req.params.auctionId } })
      .then(data => res.json(data))
      .catch(err => res.sendStatus(422).json(err));
  },
  // Creates an auction
  create: function (req, res) {
    console.log('req.body',req.body);
    db.Auction
      .create({
        UserId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        imgLink: req.body.imgLink,
        createdAt: req.body.createdAt,
        category: req.body.category,
        gender: req.body.gender,
        minBidIncrement: req.body.minBidIncrement,
        startingPrice: req.body.startingPrice,
      })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },




  // Find movies (watched || unwatched), sort by most recently updated.
  findAll: function (req, res) {
    db.Movie
      .findAll({ where: req.query, order: [['updatedAt', 'DESC']] })
      .then(dbMovies => res.json(dbMovies))
      .catch(err => res.status(422).json(err));
  },
  // Deletes movie from DB
  remove: function (req, res) {
    db.Movie
      .destroy({ where: req.params })
      .then(deletedResp => res.json(deletedResp))
      .catch(err => res.status(422).json(err));
  },
  // Updates isWatched to the opposite (bool)
  updateWatched: function (req, res) {
    let id = { id: req.params.id };
    let opposite = req.body.isWatched === 'true' ? false : true;
    db.Movie
      .update({ isWatched: opposite }, { where: id })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  // Updates user rating
  updateRating: function (req, res) {
    let id = { id: req.params.id };
    db.Movie
      .update({ userRating: req.body.rating }, { where: id })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  // Looks for a movie on the user's watchlist. Send bool to the client if found || not found
  findOne: function (req, res) {
    db.Movie
      .findOne({ where: req.query })
      .then(data => (data) ? res.send(true) : res.send(false))
      .catch(err => res.status(422).json(err));
  }
};
