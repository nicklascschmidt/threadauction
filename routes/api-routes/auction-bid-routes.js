var db = require("../../models");
var sequelize = require("sequelize");

module.exports = function(app) {
    app.post("/api/bid/create", function(req, res) {
        db.AuctionBid.create({
            AuctionId: req.body.auctionId,
            UserId: req.body.userId,
            bidAmount: req.body.bidAmount,
            bidSubmitTime: req.body.bidSubmitTime
        }).then(function(results) {
            res.json(results);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    });


    app.get("/api/bid/highestBid", (req, res) => {
        db.AuctionBid.max('bidAmount',{
            where: {
                AuctionId: req.query.auctionId,
            }
        }).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    });
    
    app.get("/api/bid/auctionBids", (req, res) => {
        db.AuctionBid.findAll({
            where: {
                UserId: req.query.userId,
            }
        }).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    });

    app.get("/api/bid/completedAuctionHighestBid", (req, res) => {
        db.AuctionBid.findAll({
            limit: 1,
            order: sequelize.literal('bidAmount DESC'),
            where: {
                AuctionId: req.query.auctionId,
            }
        }).then(data => {
            res.json(data[0]);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    });
};
