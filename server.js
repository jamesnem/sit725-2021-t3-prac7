let express = require("express");
let dbCon = require("./db/connection");
var cors = require('cors');
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
const bodyParser = require('body-parser');

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cors());

app.get("/test", function (request, response) {
  var user_name = "James Nemecek";
  response.end("Hello " + user_name + "!");
});

//socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(() => {
    socket.emit('number', parseInt(Math.random() * 10));
  }, 1000);
});

const projects = [];
for (let id = 1; id < 6; id++) {
  projects.push({
    projectID: id,
    title: `Project ${id}`,
    info: `Information about ${id}`,
    img: null,
  });
}

app.get("/projects", function (request, response) {
  //response.json(projects);
  dbCon.getDb().collection("projectData").find({}).toArray((err, res) =>{
    if (err)
      throw err
    response.send(res);
  });
});

app.post("/projects", function (request, response) {
  const project = request.body;
  console.log(JSON.stringify(project));
  if (project) {
    dbCon.getDb().collection("projectData").insertOne(project)
  } else {
    response.sendStatus(500);
  }
  response.sendStatus(204);
});



dbCon.connectToDatabase(function (err) {

  if (err) {
    console.error(err);
    process.exit();
  }
  http.listen(port,() => {
    console.log("Listening on port ", port);
  });
});


//this is only needed for Cloud foundry 
require("cf-deployment-tracker-client").track();
