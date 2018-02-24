/**
 * This module connects to the BandsInTown API and returns event data for an artist
 */
const https = require("https");
const axios = require('axios');

module.exports = {

    makeAppId() {
        return Math.random().toString(36).substring(2, 7);
    },

    // @todo remove getApi()? Seems redundant
    /**
     * Get API response
     * @return {Object} (dependent upon request)
     */
    getApi: function (apiUrl) {
        if (!apiUrl) return 'No API URL supplied';

        return https.get(apiUrl, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            })
            ;
            res.on("end", () => {
                body = JSON.parse(body);
                return body
            });
            res.on("error", () => {
                console.log('Error');
                return "There was an error"
            })
        })
    },

    /**
     * Get API response using Axios
     * @param  {String} apiUrl - URL of the API to retrieve
     * @return {Object} (dependent upon request)
     */
    getAxiosApi(apiUrl) {
        if (!apiUrl) return 'No API URL supplied';
        return axios.get(apiUrl)
            .then(function (res) {
                return res
            })
            .catch(function (error) {
                return error
            });
    },

    /**
     * Get upcoming artist events
     * @param  {String} artistName - string of the artist ID (must be registered with BandsInTown)
     * @param  {String} appId (optional) - unique ID required for API call. If not provided, a random token will be generated
     * @return {Object} JSON response
     */
    getArtistEvents(artistName, appId) {
        if (!artistName) return 'artistName is required';
        if (!appId) return 'appId is required';
        let apiUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=" + appId;
        return new Promise(resolve => {
            resolve(this.getAxiosApi(apiUrl))
        })
    },


    mhs_bandsintown: function (artistName, appId) {
        if (!artistName) {
            return 'Artist ID is required';
        }
        appId = appId || this.makeAppId();

        let theResponse = null;

        const result = this.getArtistEvents(artistName, appId);

        if (result.status === 200 && result.data) {
            theResponse = result
        } else if (result.response.status === 403) {
            theResponse = 'Artist is not registered with BandsInTown'
        }


        // .then((res) => {
        //     if (res.status === 200 && res.data) {
        //         theResponse = res
        //     } else if (res.response.status === 403) {
        //         theResponse = 'Artist is not registered with BandsInTown'
        //     }
        // }).then(() => {
        //     return theResponse
        // });

        return theResponse

        // @todo respond with error if unknown artist is supplied
        // @todo return JSON if instructed
        // @todo format options if successful
        // @todo add 'options' [] param which includes formatting type, appId etc. mhs_bandsintown(artistId, options)
        // @todo store transient?
        // @todo handle 404 and 500 errors

    }

};
// @todo format events function
// @todo write readme.md file
// @todo write basic tests
// @todo capture errors for promises