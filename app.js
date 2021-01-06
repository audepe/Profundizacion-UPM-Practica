var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var rateLimit = require("express-rate-limit");

import { monitor } from "./monitor";
import { notify } from "./monitor";

var app = express();
var server = http.createServer(app);
var port = 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./")));
app.use(limiter);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(port, () => {
  console.log(`App escuchando en http://localhost:${port}`);
});

// Add
app.post("/add_to_check_list", function (req, res) {
  var email = req.body.email;
  var url = req.body.url;
  monitor(email, url, 60, function () {
    notify(email, url);
  });
});
