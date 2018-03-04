
require('dotenv').config();
var nodeArgv = process.argv
var Argv2 = process.argv[2];
var keys = require("./keys.js");
var request = require('request');
require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var client = new Twitter(keys.twitter)
var spotify =new Spotify(keys.spotify);



var x = "";
//to ensure everything runs
for (var i=3; i<nodeArgv.length; i++){
    x = x + "+" + nodeArgv[i];
}

switch(Argv2) {
    case "spotify-this-song":
    if (x){
        spotifySearch(x);
    }
    break;

    case "my-tweets":
    tweeting();
    break;

    case "movie-this":
    if(x) {
        movieInfo(x);
    } else {
        movieInfo("Mr. Nobody")
    }
}


function tweeting() {

    var params = {
        // screen_name: 'red44947840',
        count: 6,
        };
client.get('statuses/user_timeline', params,  function(error, tweets, response) {
    if(error) throw error;
    //console.log(tweets);  // The favorites. 
    console.log(tweets[5].text);
    console.log(tweets[4].text);
    console.log(tweets[3].text);
    console.log(tweets[2].text);
    console.log(tweets[1].text);
    // console.log(tweets[0].text);
    // console.log(response);  // Raw response object. 
 
  })
};


// var MyTweets = tweeting();

// MyTweets()


function spotifySearch(songName){

spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    for(var i = 0; i < data.tracks.items.length; i++){
        var songData = data.tracks.items[i];
        //artist
        console.log("Artist: " + songData.artists[0].name);
        //name
        console.log("Song: " + songData.name);
        //preview link
        console.log("Preview URL: " + songData.preview_url);
        //album
        console.log("Album: " + songData.album.name);

};  
});
};
// spotifySearch('sweet home alabama');



function movieInfo(movie){
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&tomatoes=true&apikey=869ed286';
  
    request(omdbURL, function (error, response, body){
      if(!error && response.statusCode == 200){
        var body = JSON.parse(body);
  
        console.log("Title: " + body.Title);
        console.log("Release Year: " + body.Year);
        console.log("IMdB Rating: " + body.imdbRating);
        console.log("RT Rating: " + body.tomatoConsensus);
        console.log("tomatoesURL:" + body.tomatoURL)
        console.log("Country: " + body.Country);
        console.log("Language: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);
 
}
})
};


