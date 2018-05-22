require("dotenv").config();

var Twitter = require("twitter");
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var request = require('request');
var fs = require("fs");

if (process.argv[2] === 'my-tweets') {
  getTweets();
} else if (process.argv[2] === 'spotify-this-song') {
  spotifyThisSong();
} else if (process.argv[2] === 'movie-this') {
  movieThis();
} else if (process.argv[2] === 'do-what-it-says') {
  doWhatItSays();
} else {
  console.log("\r\n" + "Try typing one of the following commands after 'node liri.js' : " + "\r\n" +
      "1. my-tweets 'any twitter name' " + "\r\n" +
      "2. spotify-this-song 'any song name' " + "\r\n" +
      "3. movie-this 'any movie name' " + "\r\n" +
      "4. do-what-it-says." + "\r\n" +
      "Be sure to put the movie or song name in quotation marks if it's more than one word.");
}

//spotify-this-song
function spotifyThisSong() {
  if (process.argv[3] === undefined) {
    spotify.search({
        type: 'track',
        query: 'artist:ace+of+base+track:the+sign',
        limit: '1'
    }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log('Here is an example -');
        console.log('Track title: ' + "\r\n");
        console.log(data.tracks.items[0].name);
        console.log('Artist: ' + "\r\n");
        console.log(data.tracks.items[0].artists[0].name);
        console.log('Album: ' + "\r\n")
        console.log(data.tracks.items[0].album.name);
        console.log('Link: ' + "\r\n")
        console.log(data.tracks.items[0].preview_url);
    });
} else if (process.argv[3] !== undefined) {
    var nodeArgs = process.argv;
    var songInput = "";
    spotify.search({
      type: 'track',
      query: songInput
    }, function (err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      }
      console.log('Your Song -');
      console.log('Track title: ' + "\r\n");
      console.log(data.tracks.items[0].name);
      console.log("");
      console.log('Artist: ' + "\r\n");
      console.log(data.tracks.items[0].artists[0].name);
      console.log("");
      console.log('Album: ' + "\r\n")
      console.log(data.tracks.items[0].album.name);
      console.log("");
      console.log('Link: ' + "\r\n")
      console.log(data.tracks.items[0].preview_url);
    })
  }
}


// my-tweets function
function getTweets () {
  var client = new Twitter(keys.twitter);
  var screenname = "kanyewest";
  var params = {
    screen_name: "kanyewest",
    count: 20
  }
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log("Your last 20 tweets: " + "\r\n")
        var twitterResults = "@" + tweets[i].user.screen_name + ": " + tweets[i].text + "\n" + tweets[i].created_at;
        console.log(twitterResults);
    }
  }
  });
};

function movieThis() {
  var movieName = process.argv[3];
  if (process.argv[3] === undefined) {
      movieName = 'Mr. Nobody';
  }
  var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&tomatoes=true&plot=short&apikey=trilogy';

  request(queryUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          // console.log(body);
          console.log("Movie title: " + JSON.parse(body)["Title"] + "\r\n");
          console.log("Release year: " + JSON.parse(body)["Year"] + "\r\n");
          console.log("IMDB rating: " + JSON.parse(body)["imdbRating"] + "\r\n");
          console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"] + "\r\n");
          console.log("Country of production: " + JSON.parse(body)["Country"] + "\r\n");
          console.log("This movie is in: " + JSON.parse(body)["Language"] + "\r\n");
          console.log("Plot: " + JSON.parse(body)["Plot"] + "\r\n");
          console.log("Actors: " + JSON.parse(body)["Actors"] + "\r\n");

      }
  });
}

function doWhatItSays() {
  var dataArr;
  fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) {
          return console.log(error);
      }
      // // Then split it by commas (to make it more readable)
      dataArr = data.split(',');
      var trimmedArr = dataArr.map(function (item) {
          return item.trim().length;
      });
      // console.log(dataArr[1]);

      spotify.search({
          type: 'track',
          query: dataArr[1]
      }, function (err, data) {
          if (err) {
              console.log('Error occurred: ' + err);
              return;
          }
          console.log('A song then....');
          console.log('Track Title: ' + "\r\n");
          console.log(data.tracks.items[0].name);
          console.log('Artist: ' + "\r\n");
          console.log(data.tracks.items[0].artists[0].name);
          console.log('Album: ' + "\r\n")
          console.log(data.tracks.items[0].album.name);
          console.log('Link: ' + "\r\n")
          console.log(data.tracks.items[0].preview_url);
      });
  });
};