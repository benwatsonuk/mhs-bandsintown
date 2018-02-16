/**
 * This module will connect to the BandsInTown API and return event data
 * @param artistName = artist name registered with BandsInTown
 * @param appId = unique id required by BandsInTown
 */
var https = require("https");

module.exports = function (artistName, appId) {

  var apiUrl  = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=" + appId;
  var request = https.get(apiUrl, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event
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

  })

  return request

};

// @todo write readme.md file
// @todo write basic tests