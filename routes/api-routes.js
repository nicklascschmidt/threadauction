var db = require('../models');

module.exports = app => {
	app.get('/api/userData', (req, res) => {
		db['userData'].findAll({}).then(dbUserData => {
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

	app.post('/api/userData/create', (req, res) => {
		console.log(req['body']);
		db['userData'].create({
            email: req['body']['email'],
            username: req['body']['username'],
			password: req['body']['password'],
			firstName: req['body']['firstName'],
			lastName: req['body']['lastName']
		}).then(dbUserData => {
			res.json(dbUserData);
		});
  });
};