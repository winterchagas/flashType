import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App/App.jsx";

ReactDOM.render(<App/>, document.getElementById("app"));

if (process.env.ENVIRONMENT !== 'production') {
  if (module.hot) {
    module.hot.accept();
  }
}