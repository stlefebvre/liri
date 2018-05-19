//Require Twitter variable
var twitter = require('twitter');

//Twitter variables
var twitterAPI = "0YnB3EpVkxgg7GbP9JLhYtoHe";
var twitterConSecret = "E67NmBP7Zm1wnxXhAa9AmTjTOfQNDmOskVSuijB1x13PCKvbPo";
var accTokKey = "30310801-YQr6JwylDytELvaHjnnFecfiUtdiABwvBLGKslUIm";
var accTokSecret = "vlqBQFmQkLgfW96ZdMi4mPtctZs4XSRwt8SVrxvvTPioI";

//Twitter new client
var client = new Twitter({
    consumer_key: process.env.twitterAPI,
    consumer_secret: process.env.twitterConSecret,
    access_token_key: process.env.accTokKey,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

//=============================================================================//
//Require Spotify app
var spotify = require('node-spotify-api');

//Spotify variables
var clientID = "c9aab29050d4421f927f7223185eee42";
var clientSecret = "37822765e9ff4facb50e03044ef0f2eb";

//Spotify search function
search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback)

//==========================================================================//
//NPM
var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

//==========================================================================//
//DotENV

require('dotenv').config()