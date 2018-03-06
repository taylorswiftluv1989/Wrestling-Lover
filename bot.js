// version v 3.2
// wwe-fan-lover

// Create object reference to libs
var Twit = require('twit');
var fs = require('fs');
var config = require('./config.js');

// Set Twitter API keys
// var TWITTER_CONSUMER_KEY = '';
// var TWITTER_CONSUMER_SECRET = '';
// var TWITTER_ACCESS_TOKEN = '';
// var TWITTER_ACCESS_TOKEN_SECRET = '';

// Database file
var DB_FILE = "bot_db.txt";

// Set interval time. Try to use a not so small interval to avoid Twitter to lock your account.
var INTERVAL = 60*60*1000; //  hours

// Set Twitter search phrase. You can use hash tags or simples text. Hash tags works better. Separate with OR or AND.
var TWITTER_SEARCH_PHRASE = 'wwe'; // and The Champ Is Here
//var TWITTER_SEARCH_PHRASE2 = 'india'; // and The Champ Is Here

// Set max number of tweets to get on the search results each time
var TWITTER_SEARCH_MAX_RESULTS = 5;

// wwe - fan - bot
var tweet_count = 0;

const Spinner = require('node-spintax');

var Bot = new Twit(config);

function BotStart() {

  var query = {
    q: TWITTER_SEARCH_PHRASE,
    result_type: "recent",
    //lang: 'en',
    count: TWITTER_SEARCH_MAX_RESULTS
  }

  console.log("> Twitter bot is running (" + Date() + ")...")

  Bot.get('search/tweets', query, BotQueryResults);

  function BotQueryResults (error, data, response) {
    if (error) {
      console.log('Bot could not find tweets matching the query: ' + error);
    }
    else {

      // DB file
      var bot_db = [];

      // If db file doesn't exist, create empty file
      if (!fs.existsSync(DB_FILE)) {
          fs.closeSync(fs.openSync(DB_FILE, 'w'));
      }

      fs.readFile(DB_FILE, 'utf8', function (err, fileData) {
        if (!err) {
          fileData = fileData.trim();
          if (fileData != "") {
            bot_db = fileData.split("\n");
          }

          var processed_tweets = [];
//for loop
          for (var i = 0; i < data.statuses.length; i++) {

            // Tweet id
            var id = data.statuses[i].id_str;

            // User id and handle
            var userId = data.statuses[i].user.id_str;
            var userHandle = data.statuses[i].user.screen_name;
            var username = data.statuses[i].user.name;

            console.log('userHandle ' + userHandle);
            //console.log('username ' + username);

//
// Youtube_links
//

var Youtube_links = new Spinner('{John Cena 16 WWE World Championship Victories {and|&} share {your|ur} {comments|comment|thought|idea|opinion|view|impression} on {youtube|Utube} {thx|thanks|Thnx|Thank You|} {!|!!|.} https://youtu.be/nQ4kZFJNW0Q |10 Amazing Facts Prove that John Cena Is A Superhuman. {#wwe |#WrestlingLover} https://youtu.be/lzo2zk01RJ0 |The Evolution of John Cena Photos collection {and|&} share {your|ur} {comments|comment|thought|idea|opinion|view|impression} on {youtube|Utube} {thx|thanks|Thnx|Thank You|} {!|!!|.} https://youtu.be/zoHIOG4jfIM |WWE Top 10 Greatest Returns of 2017 {and|&} share {your|ur} {comments|comment|thought|idea|opinion|view|impression} on {youtube|Utube} {thx|thanks|Thnx|Thank You|} {!|!!|.} https://youtu.be/xL60idusgkY |Top 100 Kisses In WWE History  {and|&} share {your|ur} {comments|comment|thought|idea|opinion|view|impression} on {youtube|Utube} {thx|thanks|Thnx|Thank You|} {!|!!|.} https://youtu.be/ftz-0vR4jvo |Top most WWE Superstar Who Dated Kelly Kelly {and|&} share {your|ur} {comments|comment|thought|idea|opinion|view|impression} on {youtube|Utube} {thx|thanks|Thnx|Thank You|} {!|!!|.} https://youtu.be/poxdpPI1dRw |Top 10 Surprise Returns In Royal Rumble {and|&} share {your|ur} {comments|comment|thought|idea|opinion|view|impression} on {youtube|Utube} {thx|thanks|Thnx|Thank You|} {!|!!|.} https://youtu.be/zDFWSZairRU |Mr McMahon fires peoples (including donald trump) |wwe top fires {and|&} share {your|ur} {comments|comment|thought|idea|opinion|view|impression} on {youtube|Utube} {thx|thanks|Thnx|Thank You|} {!|!!|.} https://youtu.be/0EjnfZHVXY8}');

// Returns total number of possible variations: 
var variationsCount_Youtube_links = Youtube_links.countVariations();
 
// Returns list of all possible variations: 
var allVariations_Youtube_links = Youtube_links.unspin();
//console.log("allVariations_Youtube_links: " + allVariations_Youtube_links );

var spintax_Youtube_links =allVariations_Youtube_links[Math.floor(Math.random()*allVariations_Youtube_links.length)];
//console.log("spintax_Youtube_links: " + spintax_Youtube_links );

//
// starting_text
//

var starting_text = new Spinner('{Hi|Hey|Hello|Howdy|Hello there|Hi there|Hey}{!|!!|.} ');

// Returns total number of possible variations: 
var variationsCount_starting_text = starting_text.countVariations();
 
// Returns list of all possible variations: 
var allVariations_starting_text = starting_text.unspin();
//console.log("allVariations_starting_text: " + allVariations_starting_text );

var spintax_starting_text =allVariations_starting_text[Math.floor(Math.random()*allVariations_starting_text.length)];
//console.log("spintax_starting_text: " + spintax_starting_text );

//
// request_to_watch
//

var request_to_watch = new Spinner('{please|plz} {check out|look at|stop by|go to|watch out} {my|our|this} video');

// Returns total number of possible variations: 
var variationsCount_request_to_watch = request_to_watch.countVariations();
 
// Returns list of all possible variations: 
var allVariations_request_to_watch = request_to_watch.unspin();
//console.log("allVariations_request_to_watch: " + allVariations_request_to_watch );

var spintax_request_to_watch =allVariations_request_to_watch[Math.floor(Math.random()*allVariations_request_to_watch.length)];
//console.log("spintax_request_to_watch: " + spintax_request_to_watch );

var userHandle1 = "smitpatel108";
var username1 = "smit patel";

// final_tweet
var final_tweet = "@" + userHandle +" "+spintax_starting_text + username +" "+spintax_request_to_watch +", "+spintax_Youtube_links;

console.log('\n' +"final_tweet: " + final_tweet ); //'\n' + 

                        
            // If id doesn't exist on database, process it
            if (bot_db.indexOf(id) == -1) {

              processed_tweets.push(id);

              fs.appendFile(DB_FILE, id + "\n", function (err) {
                if (err) {
                  console.log("Error on save to '" + DB_FILE + "' file.");
                }
                });

              
              Bot.post('statuses/update', {status: final_tweet, in_reply_to_status_id: id}, function(err, response){
                    if (err) {
                      console.log("> Error: Status could not be updated. " + err);
                    }
                });
             


            }

          }

          console.log( '\n' +"tweet done to be continue... ");
          console.log('data.statuses.length ' + data.statuses.length);
          console.log('tweet_count ' + tweet_count);
          // Log of processed tweets
          if (processed_tweets.length > 0) {
            console.log("> Tweets processed: " + processed_tweets);
          }
          else {
            console.log("> No tweets processed.");
          }

        }
      });

    }

  }

}

// Start bot and timer
BotStart();
setInterval(BotStart, INTERVAL);

