const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('./server/communication').initializeCommunication(io);

if (process.env.ENVIRONMENT === 'production') {
  const staticMiddleware = express.static("client/prodBuild");
  app.use(staticMiddleware);
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/prodBuild/index.html');
  });
} else {
  require('./server/devSetup').devSetup(app);
}


http.listen(3000, () => console.log('server started '));
