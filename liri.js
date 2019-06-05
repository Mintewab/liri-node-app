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
    
}