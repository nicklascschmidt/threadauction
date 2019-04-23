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
