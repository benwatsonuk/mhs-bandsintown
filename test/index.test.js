// var assert = require('assert');
const https  = require('https');
const expect = require('chai').expect;
const nock   = require('nock');
const api_response = require('./assets/response')
const testMe = require('../index2.js')

// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1,2,3].indexOf(4), -1);
//     });
//   });
// });

// console.log(mhs_bandsintown())

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

describe('getArtistEvents', () => {

  beforeEach(() => {
    nock('https://rest.bandsintown.com')
      .get('/artists/A%20Wilhelm%20Scream/events?app_id=123')
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

  console.log(testMe.getArtistEvents('A Wilhelm Scream', 'AWS'))

  it('Should return JSON object if successful call is made', () => {
    expect(testMe.getArtistEvents('A Wilhelm Scream', 'AWS')).to.be.a('object');
    // expect(testMe.getArtistEvents('A Wilhelm Scream')).to.equal('appId is required');
  });

});