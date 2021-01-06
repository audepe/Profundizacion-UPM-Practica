var mysql = require("mysql");
var fs = require("fs");

let rawdata = fs.readFileSync("db-config.json");
let connect_data = JSON.parse(rawdata);
const con = mysql.createConnection(connect_data);

con.connect(function (err) {
  if (err) throw err;
  console.log("BBDD conectada");
});

export function loadPreviousMD5(url, callback) {
  var sql = "SELECT md5 FROM pagina_web WHERE url = ?";
  con.query(sql, [url], function (err, result) {
    if (err) throw err;
    callback(result);
  });
}

export function insertMD5(url, md5, callback) {
  var sql = "INSERT INTO pagina_web (url, md5) VALUES (?, ?)";
  con.query(sql, [url, md5], function (err, result) {
    if (err) throw err;
    callback();
  });
}

export function updateMD5(url, md5, callback) {
  var sql = "UPDATE pagina_web SET md5 = ? WHERE url = ?";
  con.query(sql, [md5, url], function (err, result) {
    if (err) throw err;
    callback();
  });
}
