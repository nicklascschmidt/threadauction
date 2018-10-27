var db = require('../../models');

module.exports = app => {
	
	app.get('/api/user', (req, res) => {
		db.User.findAll({}).then(dbUserData => {
			res.json(dbUserData);
		});
	});

	app.post('/api/userData', (req, res) => {
		db['userData'].findOne({
			where: {
				username: req.body.username
			}
		}).then(dbUserData => {
			res.json(dbUserData);
		});
	});

};