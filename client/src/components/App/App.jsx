import React, {useState, Fragment, useEffect} from 'react';
import io from 'socket.io-client';
import ModalLogin from "../ModalLogin/ModalLogin.jsx";
import Game from "../Game/Game.jsx";

import './index.scss';

const socket = io();
let view;

const App = () => {
  console.log('COOKIE', document.cookie);
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
  if (isReadyToPlay) {
    view = <Game socket={socket}/>
  } else {
    view = <ModalLogin
      socket={socket}
      setIsReadyToPlay={setIsReadyToPlay}
    />
  }
  return view;
};

export default App;


// componentDidMount() {
//   window.gapi.load('client:auth2', () => {
//     window.gapi.client.init({
//       clientId: googleClientId,
//       scope: 'email'
//     })
//       .then(() => {
//         this.googleAuth = window.gapi.auth2.getAuthInstance();
//         this.setState(() => ({
//           isUserLoggedIn: this.googleAuth.isSignedIn.get()
//         }));
//         this.googleAuth.isSignedIn.listen(this.onAuthUpdate)
//       })
//   });
// }

// onAuthUpdate() {
//   this.setState(() => ({
//     isUserLoggedIn: this.googleAuth.isSignedIn.get()
//   }));
// }


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