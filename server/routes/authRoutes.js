// const passport = require('passport');
// const cookieSession = require('cookie-session');
// const keys = require('../config/keys').cookieKey;
const { generateRandomName, buildDatabaseProfileObject } = require('../helpers/helpers');
const { findUser, createUser } = require('../services/firebase');

function initializeRoutes(app, users) {
	// app.use(
	//   cookieSession({
	//     keys,
	//     maxAge: 30 * 24 * 60 * 60 * 1000
	//   })
	// );
	//
	// app.use(passport.initialize());

	app.post('/auth/google', async (req, res) => {
		console.log(' --------------   REQUEST BODY  ------------------');
		console.log(req.body);
		let { ok, user, findUserError } = await findUser(req.body.id);
		if (ok) {
			if (user) {
				res.status(200)
					.send(
						JSON.stringify({
							ok: true,
							message: 'user found'
						}));
				return;
			}
			const { userCreated, createUserError } = await createUser(req.body);
			if (userCreated) {
				res.status(200)
					.send(
						JSON.stringify({
							ok: true,
							message: 'user created'
						}));
				return;
			}
			res.status(503)
				.send(
					JSON.stringify({
						ok: false,
						message: `Failed to create user - ${createUserError}`
					}));
			return;
		}
		res.status(503)
			.send(
				JSON.stringify({
					ok: false,
					message: `Failed to find user - ${findUserError}`
				}));
	});

	app.get('/auth/guest', (req, res) => {
		const userName = generateRandomName();
		const userAdded = users.addUser(userName);
		if (userAdded) {
			res.status(200).send(userAdded);
		} else {
			res.status(400).send(false);
		}
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

module.exports = { initializeRoutes };