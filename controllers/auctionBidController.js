const db = require("../models");

module.exports = {
  findAllWithUserId: function (req, res) {
    db.AuctionBid
      .findAll({ where: { UserId: req.params.userId } })
      .then(data => res.json(data))
      .catch(err => res.sendStatus(422).json(err));
  },
  findMaxWithAuctionId: function (req, res) {
    db.AuctionBid
      .max('bidAmount', { where: { AuctionId: req.params.auctionId } })
      .then(data => res.json(data))
      .catch(err => res.sendStatus(422).json(err));
  },
  createBid: function (req, res) {
    db.AuctionBid
      .create(req.body)
      .then(data => res.json(data))
      .catch(err => res.sendStatus(422).json(err));
  }
};
