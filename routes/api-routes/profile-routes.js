var db = require('../../models');

module.exports = app => {

	app.get('/api/user/profile', (req, res) => {
		console.log('req.body',req.body);
		db.User.findOne({

			where: {
				id: req.query.userId
			}

		}).then(data => {
			res.json(data);
		}).catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
	});
	
};
