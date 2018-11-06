var db = require("../../models");
module.exports = function(app) {
    app.post("/api/bid/create", function(req, res) {
        console.log("Bid Data:");
        console.log('req.body',req.body);

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
        console.log("get highest bid -- req.query", req.query);

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
        console.log("get all bids for one auction -- req.query", req.query);

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

    app.get("/api/bid/completedAuctionBids", (req, res) => {
        console.log("get all bids completed auctions -- req.query", req.query);

        db.AuctionBid.findAll({
            where: {
                AuctionId: req.query.completedAuctionIdArray,
                UserId: req.query.userId,
            }
        }).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    });
	
};
