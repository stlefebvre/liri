require("dotenv").config();


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//spotify-this-song

//my-tweets function
getTweets() = function () {
  var client = new Twitter(keys.twitter);
  var screenname = "kanyewest";
  var parameters = {
    screen_name: "kanyewest",
    count: 20
  }
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });
};

/*Commands it should be able to take:

* `spotify-this-song` - 
  This will show the following information about the song in your terminal/bash window
      Artist(s)
      The song's name
      A preview link of the song from Spotify
      The album that the song is from
      If no song is provided then your program will default to "The Sign" by Ace of Base.

* `movie-this`
     * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.


* `do-what-it-says
It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
Feel free to change the text in that document to test out the feature for other commands.
*/