var mysql = require('mysql');
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var rateLimit = require("express-rate-limit");

var app = express();
var server = http.createServer(app);
var port = 3000
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const conector = mysql.createConnection({
    host: "profdb.cpok8xhoiqya.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "root",
    password: "profundizacion"
  });

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
  console.log(`Example app listening at http://localhost:${port}`)
})

// Add
app.post('/add_to_check_list', function(req,res){
    console.log("Perro");
});