import React, {useState, useEffect} from 'react';
import {setMyUserInfo, myUserInfo} from "../../helpers/helpers";
import {startSocketGameStarted} from "../../helpers/sockets";

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

    function handleGoogleLogin() {
      googleAuth.signIn();
    }

    function handleLookForGame() {
      socket.emit('joinRoom', myUserInfo.id, (roomId) => {
        if (roomId) {
          setMyUserInfo({roomId});
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
          <div>
            <button onClick={handleLookForGame}>
              READY TO PLAY!
            </button>
          </div>
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


//   handleLogin() {
//     this.props.
//   }
//
//   render() {
//     return (
//       <div className="login-container">
//         <div>
//           <button onClick={this.handleLogin}>
//             LOGIN WITH GOOGLE
//           </button>
//         </div>
//       </div>
//     )
//   }
// }
//
// export default Login;

//
// this.googleAuth = window.gapi.auth2.getAuthInstance();
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