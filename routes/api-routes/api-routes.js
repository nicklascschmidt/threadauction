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
				username: req['body']['username']
			}
		}).then(dbUserData => {
			res.json(dbUserData);
		});
	});


	app.post('/api/user/create', (req, res) => {
		console.log('req.body',req.body);
		db.User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			address: req.body.address,
			city: req.body.city,
			stateUSA: req.body.stateUSA,
			zip: req.body.zip
		}).then(dbUserData => {
			res.json(dbUserData);
		}).catch(err => {
			console.log(err);
			res.sendStatus(500)
		});
  });
};