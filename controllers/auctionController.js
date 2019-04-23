const db = require("../models");
const moment = require('moment');
const { Op } = require('sequelize');


module.exports = {
  // Find all auctions, filter for gender & category & createdAt.
  findAllAuctions: function (req, res) {
    let { gender, category } = req.query;
    let where = {
      createdAt: {
        // [Op.gte]: moment().subtract(7, 'days').toDate()
        [Op.gte]: moment('20181107').subtract(7, 'days').toDate() // snapshot of auction listings at Nov 7th
      }
    };
    if (req.query.gender !== '') { where.gender = gender};
    if (req.query.category !== '') { where.category = category};

    db.Auction
      .findAll({where})
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  // Finds all auctions for a certain user
  findUserAuctions: function (req, res) {
    db.Auction
      .findAll({ where: { UserId: req.params.userId } })
      .then(data => res.json(data))
      .catch(err => res.sendStatus(422).json(err));
  },
  // Finds an auction given the auctionId - Product page
  findOneAuction: function (req, res) {
    db.Auction
      .findOne({ where: { id: req.params.auctionId } })
      .then(data => res.json(data))
      .catch(err => res.sendStatus(422).json(err));
  },
  // Creates an auction
  create: function (req, res) {
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
};
