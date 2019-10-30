import React, { useState, useEffect } from 'react';
import { setMyUserInfo, myUserInfo, buildGoogleSignInPayload } from "../../helpers/helpers";
import { startSocketGameStarted } from "../../helpers/sockets";

const ModalLogin =
	({
		 socket,
		 setIsReadyToPlay,
		 isUserLoggedIn,
		 setIsUserLoggedIn,
		 googleAuth
	 }) => {
		const [isWaitingForPlayers, setIsWaitingForPlayers] = useState(false);

		useEffect(() => {
			startSocketGameStarted(socket, setIsReadyToPlay);
		}, []);

		async function handlePlayAsGuest() {
			const response = await fetch('/auth/guest');
			setMyUserInfo(await response.json());
		}

		async function handleGoogleLogin() {
			const currentUser = await googleAuth.signIn();
			const payload = buildGoogleSignInPayload(currentUser);
			const response = await fetch('/auth/google', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			});
			console.log(await response.json());
			// console.log('ACCESS TOKEN', currentUser.getAuthResponse().access_token);
			// console.log('ID TOKEN', currentUser.getAuthResponse().id_token);
		}

		async function handleGoogleLogout() {
			await googleAuth.signOut();
			console.log('LOGGED OUT');
			setIsUserLoggedIn(false);
		}

		function handleLookForGame() {
			socket.emit('joinRoom', myUserInfo.id, (roomId) => {
				if (roomId) {
					setMyUserInfo({ roomId });
					setIsWaitingForPlayers(true);
				}
			});
		}

		return (
			isUserLoggedIn ?
				isWaitingForPlayers ?
					<div>
						WAITING FOR OTHER PLAYERS..
					</div>
					:
					<>
						<div>
							<button onClick={handleLookForGame}>
								READY TO PLAY!
							</button>
						</div>
						<div>
							<button onClick={handleGoogleLogout}>
								LOGOUT
							</button>
						</div>
					</>
				:
				<>
					<div>
						<button onClick={handlePlayAsGuest}>
							PLAY AS A GUEST
						</button>
					</div>
					<div>
						<button onClick={handleGoogleLogin}>
							LOGIN WITH GOOGLE
						</button>
					</div>
				</>
		);
	};

export default ModalLogin;

// this.googleAuth.signIn().then(response => {
// 	IS_CONSOLE_LOG_OPEN && console.log("signUp response", response);
// 	if (response.Zi.token_type === "Bearer") {
// 		let photoUrl = response.w3.Paa;
// 		let googleAccessTokenExpiresOn = new Date();
// 		googleAccessTokenExpiresOn.setSeconds(
// 			googleAccessTokenExpiresOn.getSeconds() + response.Zi.expires_in
// 		);
// 		const googleAccessToken = this.googleAuth.currentUser
// 			.get()
// 			.getAuthResponse().access_token;
// 		let config = { method: "POST" };
// 		config.body = {
// 			client_id: jobHaxClientId,
// 			client_secret: jobHaxClientSecret,
// 			provider: "google-oauth2"
// 		};
// 		config.body.token = googleAccessToken;
// 		if (this.state.user_type != null) {
// 			config.body.user_type = this.state.user_type;
// 		}
// 		axiosCaptcha(USERS("authSocialUser"), config, "signin")
// 			.then(response => {
// 				if (response.statusText === "OK") {
// 					if (response.data.success === true) {
// 						this.setCookies(response, googleAccessTokenExpiresOn);
// 					}
// 				}
// 				return response;
// 			})
// 			.then(response => {
// 				if (response.statusText === "OK") {
// 					if (response.data.success === true) {
// 						if (!response.data.data.signup_flow_completed) {
// 							this.setState({ level: "intro" });
// 						} else {
// 							this.props.cookie("set", "remember_me", true, "/");
// 							this.props.passStatesToApp("isUserLoggedIn", true);
// 						}
// 						this.postGoogleProfilePhoto(photoUrl);
// 					}
// 				}
// 			});