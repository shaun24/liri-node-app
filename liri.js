
require('dotenv').config()
var keys = require("./keys.js");
var request = require('request');
require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

var client = new Twitter(keys.twitter)
var spotify =new Spotify(keys.spotify);




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


var MyTweets = tweeting();

// MyTweets()


//spotify-this-song 'song name here'

function spotifySearch(){

spotify.search({ type: 'track', query: 'blue' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data.Artist); 
});  
};

spotifySearch();