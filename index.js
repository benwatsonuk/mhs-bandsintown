/**
 * This module connects to the BandsInTown API and returns event data for an artist
 */
// var http           = require("http");
var https           = require("https");
// var mhs_bandsintown = null

makeAppId = function () {
  return Math.random().toString(36).substring(7);
}

/**
 * Get API response
 * @param  {String} apiUrl - URL of the API to retrieve
 * @return (dependent upon request)
 */
getApi = function (apiUrl) {
  https.get(apiUrl, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    })
    ;
    res.on("end", () => {
      console.log(res)
      body = JSON.parse(body);
      return body
    })
    res.on("error", () => {
      console.log('Error')
      // @todo return res?
      return "There was an error"
    })
  })
}

/**
 * Get upcoming artist events
 * @param  {String} artistName - string of the artist ID (must be registered with BandsInTown)
 * @param  {Stirng} appId (optional) - unique ID required for API call. If not provided, a random token will be generated
 * @return {Object} JSON response
 */
getArtistEvents = function (artistName, appId) {

  var apiUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=" + appId;
  // var apiUrl = "http://localhost:3000/response.json";
  console.log(apiUrl);
  return getApi(apiUrl)
}

// @todo format events function

mhs_bandsintown = function (artistName, appId) {
  if (artistName == null) return 'Artist ID is required';
  appId = appId || makeAppId();

  return getArtistEvents(artistName, appId)
}

module.exports = mhs_bandsintown

// var request = https.get(apiUrl, function (response) {
//   var buffer = "",
//       data,
//       route;
//
//   response.on("data", function (chunk) {
//     buffer += chunk;
//   });
//
//   response.on("end", function (err) {
//     data = JSON.parse(buffer);
//     console.log(data)
//     return data
//     // return 'Dave'
//   });
//
// });

// @todo write readme.md file
// @todo write basic tests