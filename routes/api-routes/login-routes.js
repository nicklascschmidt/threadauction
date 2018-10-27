var db = require('../../models');

module.exports = app => {

	app.get('/api/user/login', (req, res) => {
		console.log('req.query',req.query);
		db.User.findOne({
			where: {
				username: req.query.username,
				password: req.query.password
			}
		}).then(data => {
			res.json(data);
		}).catch(err => {
			console.log(err);
			res.sendStatus(500);
		})
	})
	
};