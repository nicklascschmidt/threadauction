var db = require('../../models');

module.exports = app => {
	
	app.post('/api/auction/create', (req, res) => {
		console.log('req.body',req.body);
		db.Auction.create({

			UserId: req.body.userId,
			title: req.body.title,
			description: req.body.description,
			gender: req.body.gender,
			category: req.body.category,
			startingPrice: req.body.startingPrice,
			minBidIncrement: req.body.minBidIncrement,

		}).then(data => {
			res.json(data);
		}).catch(err => {
			console.log(err);
			res.sendStatus(500)
		});
	});
	
};