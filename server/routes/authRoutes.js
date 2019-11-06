const generateUuid = require('uuid/v1');
// const passport = require('passport');
// const cookieSession = require('cookie-session');
// const keys = require('../config/keys').cookieKey;
const { generateRandomName } = require('../helpers/helpers');
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
		let { ok, user, findUserError } = await findUser(req.body.userId);
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

	app.post('/play/google', (req, res) => {
		const {userName, userId} = req.body;
		const userAdded = users.addUser(userName, userId);
		if (userAdded) {
			res.status(200).send(true);
		} else {
			res.status(400).send(false);
		}
	});

	app.get('/play/guest', (req, res) => {
		const userName = generateRandomName();
		const userId = generateUuid();
		const userAdded = users.addUser(userName, userId);
		if (userAdded) {
			res.status(200).send(userAdded);
		} else {
			res.status(400).send(false);
		}
	});
};

module.exports = { initializeRoutes };