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

  });

  it('Should terminate if no artistID supplied', () => {
    expect(testMe.getArtistEvents()).to.be.string;
    expect(testMe.getArtistEvents()).to.equal('artistName is required');
  });

  it('Should terminate if no appId supplied', () => {
    expect(testMe.getArtistEvents('A Wilhelm Scream')).to.be.string;
    expect(testMe.getArtistEvents('A Wilhelm Scream')).to.equal('appId is required');
  });

  it('Should return JSON object if successful call is made', () => {
    nock('https://rest.bandsintown.com')
      .get('/artists/A%20Wilhelm%20Scream/events?app_id=AWS')
      .reply(200, api_response.hasEvents());
    return testMe.getArtistEvents('A Wilhelm Scream', 'AWS')
      .then(res => {
        // console.log(res)
        expect(res.status).to.equal(200);
        expect(typeof res).to.equal('object');
      })
  });

  it('Should return with 403 if unknown artist is supplied', () => {
    nock('https://rest.bandsintown.com')
      .get('/artists/234234/events?app_id=123')
      .reply(403, api_response.unkownArtist());
    return testMe.getArtistEvents('234234', '123')
      .then(res => {
        expect(res.response.status).to.equal(403);
      })
  });

  it('Should return empty array if no upcoming events for artist', () => {
    nock('https://rest.bandsintown.com')
      .get('/artists/A%20Wilhelm%20Scream/events?app_id=AWS')
      .reply(200, api_response.noEvents());
    return testMe.getArtistEvents('A Wilhelm Scream', 'AWS')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(typeof res.data).to.equal('object');
        expect(res.data.length).to.equal(0);
      })
  });

});

describe('mhs_bandsintown (main function)', () => {

  it('Should fail if no artistId is supplied', () => {
    expect(testMe.mhs_bandsintown()).to.equal('Artist ID is required');
    // expect(testMe.makeAppId()).to.have.lengthOf(5);
  });

});


// @todo write tests for mhs_bandsintown main function