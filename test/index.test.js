const https        = require('https');
const expect       = require('chai').expect;
const nock         = require('nock');
const api_response = require('./assets/response');
const testMe       = require('../index.js');

describe('makeAppID', () => {

  it('Should return a random 5 character string', () => {
    expect(testMe.makeAppId()).to.be.string;
    expect(testMe.makeAppId()).to.have.lengthOf(5);
  });

});

describe('getApi', () => {

  it('should terminate if the URL is not supplied', () => {
    expect(testMe.getApi()).to.be.string;
    expect(testMe.getApi()).to.equal('No API URL supplied');
  });

});

describe('getAxiosApi', () => {

  it('should terminate if the URL is not supplied', () => {
    expect(testMe.getAxiosApi()).to.be.string;
    expect(testMe.getAxiosApi()).to.equal('No API URL supplied');
  });

});

describe('getArtistEvents', () => {
  beforeEach(() => {
    nock('https://rest.bandsintown.com')
      .get('/artists/A%20Wilhelm%20Scream/events?app_id=AWS')
      .reply(200, api_response);
  });

  it('Should terminate if no artistID supplied', () => {
    expect(testMe.getArtistEvents()).to.be.string;
    expect(testMe.getArtistEvents()).to.equal('artistName is required');
  });

  it('Should terminate if no appId supplied', () => {
    expect(testMe.getArtistEvents('A Wilhelm Scream')).to.be.string;
    expect(testMe.getArtistEvents('A Wilhelm Scream')).to.equal('appId is required');
  });

  console.log(testMe.getArtistEvents('A Wilhelm Scream', 'AWS'));

  it('Should return JSON object if successful call is made', () => {
    return testMe.getArtistEvents('A Wilhelm Scream', 'AWS')
      .then(res => {
        //expect an object back
        expect(res.status).to.equal(200);
        expect(typeof res).to.equal('object');
      })

  });

});