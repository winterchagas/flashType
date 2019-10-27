import React, { useState, Fragment, useEffect } from 'react';
import io from 'socket.io-client';
import keys from '../../../config/keys'
import ModalLogin from "../ModalLogin/ModalLogin.jsx";
import Game from "../Game/Game.jsx";

import './index.scss';

const socket = io();
let view;
let googleAuth;

function initializeGoogleAuth(setIsUserLoggedIn) {
	const {load, client, auth2} = window.gapi;
	load('client:auth2', async () => {
		await client.init({
			clientId: keys.googleClientID,
			scope: 'email'
		});
		googleAuth = auth2.getAuthInstance();
		setIsUserLoggedIn(googleAuth.isSignedIn.get());
		googleAuth.isSignedIn.listen(setIsUserLoggedIn(googleAuth.isSignedIn.get()))
	});
}

const App = () => {
	const [isReadyToPlay, setIsReadyToPlay] = useState(false);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

	useEffect(() => {
		initializeGoogleAuth(setIsUserLoggedIn);
	}, []);

	if (isReadyToPlay) {
		view = <Game socket={socket}/>
	} else {
		view = <ModalLogin
			socket={socket}
			setIsReadyToPlay={setIsReadyToPlay}
			isUserLoggedIn={isUserLoggedIn}
		/>
	}
	return view;
};

export default App;

// return isUserLoggedIn ?
//   (<Router>
//       <div className="main-container">
//         <Header/>	          <Header googleAuth={this.googleAuth}/>
//         <Route path="/dashboard" component={Dashboard}/>
//         <Route exact path="/" component={Home}/>
//         <Route path="/modal" component={DetailsModal}/>
//       </div>	        </div>
//     </Router>)
// : <Login googleAuth={this.googleAuth}/>