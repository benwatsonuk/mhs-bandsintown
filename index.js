/**
 * This module connects to the BandsInTown API and returns event data for an artist
 */
const https = require("https");
const axios = require('axios');

module.exports = {

  makeAppId() {
    return Math.random().toString(36).substring(2, 7);
  },

  /**
   * Get API response
   * @param  {String} apiUrl - URL of the API to retrieve
   * @return (dependent upon request)
   */
  getApi(apiUrl) {
    if (!apiUrl) return 'No API URL supplied';

    return https.get(apiUrl, res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      })
      ;
      res.on("end", () => {
        // console.log(res);
        body = JSON.parse(body);
        return body
      });
      res.on("error", () => {
        console.log('Error');
        // @todo return res?
        return "There was an error"
      })
    })
  },

  /**
   * Get API response using Axios
   * @param  {String} apiUrl - URL of the API to retrieve
   * @return (dependent upon request)
   */
  getAxiosApi(apiUrl) {
    if (!apiUrl) return 'No API URL supplied';
    return axios.get(apiUrl)
      .then(function (res) {
        // console.log(response);
        // res.data
        return res
      })
      .catch(function (error) {
        // console.log(error);
        return error
      });
  },

  /**
   * Get upcoming artist events
   * @param  {String} artistName - string of the artist ID (must be registered with BandsInTown)
   * @param  {Stirng} appId (optional) - unique ID required for API call. If not provided, a random token will be generated
   * @return {Object} JSON response
   */
  getArtistEvents(artistName, appId)
  {
    if (!artistName) return 'artistName is required';
    if (!appId) return 'appId is required';
    var apiUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=" + appId;
    // return this.getApi(apiUrl)
    return this.getAxiosApi(apiUrl)
  },

// @todo format events function

  mhs_bandsintown(artistName, appId)
  {
    if (artistName == null) return 'Artist ID is required';
    appId = appId || makeAppId();

    return this.getArtistEvents(artistName, appId)
  }

}
;

// @todo write readme.md file
// @todo write basic tests