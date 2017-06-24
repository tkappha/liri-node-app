//code to grab data from keys.js; store keys in a variable
var keys = require('./keys.js');


var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');


// ******** Twitter *********

var getMyTweets = function() {
	var client = new Twitter(keys.twitterKeys);
 
	var params = {screen_name: 'izzi_samoyed'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    // console.log(tweets);
	    for(var i = 0; i < tweets.length; i++){
	    	console.log(tweets[i].created_at);
	    	console.log(tweets[i].text);
	    	console.log("*******************************");
	    }
	  }
	});

}


// ********   Spotify ********
var getArtistNames = function(artist) {
	return artist.name;
}

var getMySpotify = function(songName){

		spotify.search({ type: 'track', query: songName }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
		 
//spotify-this-song '<song name here>'  shows artist(s), song's name, preview 
//link of the song from Spotify, album that song is from.  If no song is provided,
//then program defaults to "The Sign" by Ace of Base
		   var songs = data.tracks.items;
		   for(var i = 0; i < songs.length; i++) {
		   	console.log(i);
		   	console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
		   	console.log('song name: ' + songs[i].name);
		   	console.log('preview song: ' + songs[i]. preview_url);
		   	console.log('album: ' + songs[i].album.name);
		   	console.log('*************************************************');
		   }
		});
	}


var getMyMovie = function(movieName){

	request('http://www.omdbapi.com/?t='+ movieName +'&y=&plot=short&r=json', function (error, response, body) {
	  if (!error && response.statusCode == 200){
	  	console.log(body)
	  } 
	})
}

var pick = function(caseData, functionData){
	switch(caseData) {
		case 'my-tweets' :
			getMyTweets();
			break;

		case 'spotify-this-song':
			getMySpotify(functionData);
			break;
		case 'movie-this'
			 getMyMovie(functionData);
			 break;

		default:
			console.log("Not a recognized command");
	}
}
//liri.js should be able to take in one of following commands:
//my-tweets - shows last 20 tweets and when they were created in Bash window

var runThis = function(argOne, argTwo){
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);


//movie-this '<movie name here>' output movie title, year, imdb rating, country
//movie was produced, language of movie, plot, actors, rotten tomatoes url.  If
// user doesn't type a move in, outputs data for 'Mr Nobody'  
// use API key: 40e9cece

//do-what-it-says.  using fs Node package, LIRI takes the text inside of random.txt
// and uses it to call one of LIRIs commands.  It should run spotify-this-song 
// for "I Want it That Way".  feel free to change the text in the random.txt doc 
// to test out the features for other commands

// ****************************
//              BONUS
//******************************
// in addition to loggin data to your bash window, output data to a 
// .txt file called log.txt  - make sure you append each command you run
// to log.txt, do not overwrite your file each time you run a command

