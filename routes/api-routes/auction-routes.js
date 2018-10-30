var db = require("../../models/");
module.exports = function(app) {
    app.post("/api/auction/create", function(req, res) {
        console.log("Auction Data:");
        console.log(req.body);

        db.Auction.create({
            UserId: req.body.UserId,
            title: req.body.title,
            description: req.body.description,
            createdAt: req.body.createdAt,
            category: req.body.category,
            gender: req.body.gender,
            minBidIncrement: req.body.minBidIncrement,
            startingPrice: req.body.startingPrice,
        }).then(function(results) {
            res.json(results);
        });

    });


    app.get("api/auction/ID", (req, res) => {
        console.log("req.query", req.query);
        db.Auction.findOne({
            where: {
                id: req.query.id,
            }
        }).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    });
	
	
};
