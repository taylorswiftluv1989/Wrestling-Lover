
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
var INTERVAL = 3*60*60*1000; // 3 hours

// Set Twitter search phrase. You can use hash tags or simples text. Hash tags works better. Separate with OR or AND.
var TWITTER_SEARCH_PHRASE = 'Royal Rumble';

// Set max number of tweets to get on the search results each time
var TWITTER_SEARCH_MAX_RESULTS = 10;

// Set tweets to reply
var TWEETS_TO_REPLY = [
  "Braun Strowman Attacks Brock Lesnar & Kane | WWE RAW 8th January 2017 http://youtu.be/EAmuWQbeQzM?a",
  "WWE Royal Rumble 2018 Entry Predictions and Surprise Returns https://youtu.be/yp59KRpb4zY ",
  "Mr McMahon fires peoples (including donald trump) https://www.youtube.com/watch?v=0EjnfZHVXY8 "
];

// Init Twit lib
// var Bot = new Twit({
//   consumer_key: TWITTER_CONSUMER_KEY,
//   consumer_secret: TWITTER_CONSUMER_SECRET,
//   access_token: TWITTER_ACCESS_TOKEN,
//   access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
// });
var Bot = new Twit(config);

function BotStart() {

  var query = {
    q: TWITTER_SEARCH_PHRASE,
    result_type: "recent",
    lang: 'en',
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

          for (var i = 0; i < data.statuses.length; i++) {

            // Tweet id
            var id = data.statuses[i].id_str;

            // User id and handle
            var userId = data.statuses[i].user.id_str;
            var userHandle = data.statuses[i].user.screen_name;

            console.log('userHandle ' + userHandle);

            // If id doesn't exist on database, process it
            if (bot_db.indexOf(id) == -1) {

              processed_tweets.push(id);

              fs.appendFile(DB_FILE, id + "\n", function (err) {
                if (err) {
                  console.log("Error on save to '" + DB_FILE + "' file.");
                }
                });

              // Like
              // Bot.post('favorites/create', {id: id}, function(err, response){
              //       if (err) {
              //          console.log("> Error: Tweet " + id + " could not be favorited. " + err);
              //       }
              //   });

              // Reply
              var textToReply = TWEETS_TO_REPLY[Math.floor(Math.random()*TWEETS_TO_REPLY.length)];
              textToReply = "@" + userHandle + ". " + textToReply ;
              // + " -" + Math.floor(Math.random()*100)
              Bot.post('statuses/update', {status: textToReply, in_reply_to_status_id: id}, function(err, response){
                    if (err) {
                      console.log("> Error: Status could not be updated. " + err);
                    }
                });

              // Follow
              Bot.post('friendships/create', {user_id: userId, follow: "true"}, function(err, response){
                    if (err) {
                      console.log("> Error: Could not follow user " + userId + ". " + err);
                    }
                });

            }

          }

          console.log("done to be continue... ");
          
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


