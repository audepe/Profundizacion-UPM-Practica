var request = require("request");
var md5 = require("md5");
import { loadPreviousMD5, insertMD5, updateMD5 } from "./db";

function detectChange(url, callback) {
  request(url, function (error, response, body) {
    var currentMD5 = md5(body);
    loadPreviousMD5(url, function (previousMD5) {
      if (previousMD5 !== currentMD5) {
        updateMD5(url, currentMD5, callback);
      }
    });
  });
}

export function monitor(url, cadaXSegundos, callback) {
  insertMD5(url, "", function () {
    setInterval(() => detectChange(url, callback), cadaXSegundos * 1000);
  });
}

// monitor("https://www.google.com", 5);
