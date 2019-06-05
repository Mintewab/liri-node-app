require("dotenv").config();
var keys = require("./keys.js");
require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var spotify = new Spotify(keys.spotify)

var args = process.argv;

var command = process.argv[2];

var userInput = process.argv.splice(3).join(",");

function LiriApp(command, userInput) {
    switch (command) {
        case "concert-this":
            findConcert(userInput);
            break;
        case "spotify-this-song":
            spotifySong(userInput);
            break;
        case "movie-this":
            findMovie(userInput);
            break;
        case "do-what-it-says":
            randomOrder(userInput);
            break;
    }
}
function spotifySong(songTitle) {
    if(songTitle === ""){
        songTitle = "Stay";
    } 
    console.log("song-this searching for " + songTitle.replace( " "));
    
    spotify.search({ type:"track", query: songTitle }, function (err, data) {
        if (err) {
            return console.log('Error: ' + err);
        }