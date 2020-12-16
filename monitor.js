var request = require("request");
var md5 = require("md5");

function saveMD5(url, md5) {
    console.log("saved md5 " + md5 + " of " + url);
}

function loadPreviousMD5(url) {
    return "";
}

function notifyChange(url) {
    console.log("notify change of " + url);
}

function detectChange(url) {
    request(url, function (error, response, body) {
        var currentMD5 = md5(body);
        if (loadPreviousMD5(url) != currentMD5) {
            saveMD5(url, currentMD5);
            notifyChange(url);
        }
    });
}

function monitor(url, cadaXSegundos) {
    setInterval(() => detectChange(url), cadaXSegundos * 1000);

}

monitor("https://www.google.com", 5);