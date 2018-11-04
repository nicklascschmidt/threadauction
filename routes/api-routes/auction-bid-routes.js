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
        // db.AuctionBid.findAll({
        //     where: {
        //         AuctionId: req.query.auctionId,
        //     }
        // }).then(data => {
        //     res.json(data);
        // }).catch(err => {
        //     console.log(err);
        //     res.sendStatus(500);
        // })
    });

    
	
};
