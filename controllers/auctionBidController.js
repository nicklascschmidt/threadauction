const db = require("../models");

// Methods
module.exports = {
  findAllWithUserId: function(req, res) {
    db.AuctionBid
      .findAll({ where: { UserId: req.params.userId }})
      .then(data => res.json(data))
      .catch(err => res.sendStatus(422).json(err));
  },
};
