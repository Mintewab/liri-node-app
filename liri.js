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
        }console.log("**********************************************************************");
        console.log("Artist's Name: " + data.tracks.items[0].album.artists[0].name + "\n");
        console.log("Song Name: " + data.tracks.items[0].name + "\n");        
        console.log("Song link: " + data.tracks.items[0].href + "\n");        
        console.log("Album:" + data.tracks.items[0].album.name + "\n");
        
        var logSong = "\n**********************************************************************" + 
        "\nArtist's Name: " + data.tracks.items[0].album.artists[0].name + "\n" + 
        "Song Name: " + data.tracks.items[0].name + "\n"+
         "Song link: " + data.tracks.items[0].href + "\n" +
          "Album:" + data.tracks.items[0].album.name + "\n";
        fs.appendFile("log.txt", logSong, function (err) {
            if (err) throw err;
        });
    });
};

function findConcert(singer) {
    var singer = userInput;
    var singerQueryURL = "https://rest.bandsintown.com/artists/" + singer + "/events?app_id=codingbootcamp";
    axios.get(singerQueryURL).then(
        function (response) {
            console.log("**********************************************************************")