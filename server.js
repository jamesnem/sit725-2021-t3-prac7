let express = require("express");
let dbCon = require("./db/connection");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
const projectRouter = require('./routers/projects');
const studentRouter = require('./routers/students')

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json({limit:'50mb'}));
app.use('/api/projects', projectRouter);
app.use('/api/students', studentRouter);

dbCon.connectToDB(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
  http.listen(port, () => {
    console.log("Listening on port ", port);
  });
});