/**
 * This module will connect to the BandsInTown API and return event data
 * @param artistName = artist name registered with BandsInTown
 * @param appId = unique id required by BandsInTown
 */
var https = require("https");

module.exports = function (artistName, appId) {

  if (artistName == null) return false;
  appId = appId || randomString();

  var apiUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=" + appId;

  function randomString() {
    return Math.random().toString(36).substring(7);
  }

  var request = https.get(apiUrl, function (response) {
    var buffer = "",
        data,
        route;

    response.on("data", function (chunk) {
      buffer += chunk;
    });

    response.on("end", function (err) {
      data = JSON.parse(buffer);
      return data
    });

  });

  return request

};

// @todo write readme.md file
// @todo write basic tests