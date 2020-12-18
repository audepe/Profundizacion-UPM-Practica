var mysql = require('mysql');
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var rateLimit = require("express-rate-limit");
var fs = require('fs');

var app = express();
var server = http.createServer(app);
var port = 3000
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});


let rawdata = fs.readFileSync('db-config.json');
let connect_data = JSON.parse(rawdata);
const conector = mysql.createConnection(connect_data);

  conector.connect(function(err) {
    if (err) throw err;
    console.log("BBDD conectada");
  });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./')));
app.use(limiter);


app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'./index.html'));
});

app.listen(port, () => {
  console.log(`App escuchando en http://localhost:${port}`)
})

// Add
app.post('/add_to_check_list', function(req,res){
    console.log("Add intentado");
});