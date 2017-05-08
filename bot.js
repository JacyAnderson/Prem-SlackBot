// Require packages
var Botkit = require('botkit');
require('dotenv').config();
var cron = require('node-cron');
var sentiment = require('sentiment')
var SlackBot = require('slackbots');

// Require models to connect to database
var db = require('./models');

// Connects to User model
var User = db.models.User;

// Connects to session model
var Session = db.models.Session;

 
// Create welcome bot
var welcomeBot = new SlackBot({
    token: process.env.API_TOKEN
});

// currentSession holds current sesssion id to reference later
var currentSession;

// On start
welcomeBot.on('start', function() {
  console.log("starting");

  // Gets user from slack team
  var user = welcomeBot.getUsers()._value.members[2];
  console.log(user);

    // Optional params to set emojis or diffrent name for the bot
    var params = {
    };
    
    // Splits name into first and last
   var name = user.real_name.split(/[ ,]+/);

    //define where the bot will messsage in this case the user and the message to recieve
    welcomeBot.postMessageToUser(user.name, "Hey, its Prem! \n Hows it going this week " + name[0] + "?", params);

    // Create user object to store user in database
    var userObj ={
      lastname: name[1],
      firstname: name[0],
      interacted: true
    } 

    // Create session object to store session in database
    var sessObj = {
      score: '-2',
      key_word: 'upset'
    }

    // lastName to find user in database : currently hardcoded but should be dynamic later
    var lastName = 'Laine';

    // Find all users where last name is lastName
    // If user exists dont make a new one
    User.findAll({
      where: {
        lastname: lastName
      }
    })
    .then(function(user){
      if(!user) {
        console.log("user Found");
        User.create(userObj).then(function(user){
        if(!user) return error(res, "not saved");
          console.log("saved");
        });
        return error(res, "not found");
      }

      // Set user id to sesssion for table reference
      sessObj.userId = user[0].dataValues.id;

      // Create new session in database
      Session.create(sessObj).then(function(session){
        currentSession = session.dataValues.id;
        if(!session) return error(res, "not saved");
          console.log("saved");
        });
     }); 
  });

// Create botkit controller
var controller = Botkit.slackbot();

// Spawn botkit bot
var bot = controller.spawn({
  token: process.env.API_TOKEN,
  name: "Prem"
});
 
// Start RTM websocket server
bot.startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});

// If bot hears anything (currently will hear anything directmessaged)
controller.hears([''], ["direct_message"], function(bot,message) {

  // Assigns text to message text
  var text = message.text;

  // Assigns results to the value of sentimental anyalisis of the message
  var results = sentiment(text);

  // Assigns sentiment score to sentimentScore
  var sentimentScore = results.score;

  // Assigns negative words from anyalisis to negative
  var negative = results.negative.toString();

  // Assigns positive words fron anyalisis to positive
  var positive = results.positive.toString();


  //    CONTROL FLOW     //

  // if score is less than zero this is a negative result and will flow down the negative flow
  if(sentimentScore < 0) {

    // Start conversation if they seem upset
    bot.startConversation(message, function(err, convo) {
      convo.say('It seems like you have somethings on your mind.');

      // Ask if they want to talk about it
      convo.addQuestion('Do you want to talk about it?', [{
        pattern: 'no',
        callback: function(response, convo) {
          convo.gotoThread('talkMore_no_thread');
        },
        pattern: 'yes',
        callback: function(response, convo) {
          convo.gotoThread('talkMore_yes_thread');
        }
      }]);

    // Next
    convo.next();

    // Adds message if they dont wanna share
    convo.addMessage({
      text: "Thats okay, we can talk next week. \n In the meantime, I'm always here if you need me.",
    },'talkMore_no_thread');

    // Adds question if they seem negative
    convo.addQuestion("Okay \n Would you mind telling me a bit more about whats going on?", function(response, convo) {

      // Says after they share whats going on
      convo.say('Thanks for sharing, if you anything I am always a slack message away');

      // Fine current session in database
      Session.findById(currentSession).then(function(thisSession) {

        // updates table response colum with user response
        return thisSession.updateAttributes({response: response.text});
      });

      // Next
      convo.next();

      },{},'talkMore_yes_thread');
    });
  } 

  // if score is greater than zero this is a positive result and will flow down the positive flow
  else if(sentimentScore > 0) {

    // Start converstation if things are going well
    bot.startConversation(message, function(err, convo) {
      convo.say('It sounds like things are going well');

      // Ask more about what went well
      convo.addQuestion('Can you elaborate on what went well in the past week?', function(response,convo) {
        convo.say("Awesome!");

        // Fine current session in database
        Session.findById(currentSession).then(function(thisSession) {

          // updates table response colum with user response
          return thisSession.updateAttributes({response: response.text});
        });

        // Ask if they have anything else after sharing
        convo.addQuestion('Thanks for sharing! Is there anything else you want to talk about?', [
          {
              pattern: 'no',
              callback: function(response, convo) {
                  convo.gotoThread('anythingElse_no_thread');
              }
          }]);

        // Next
        convo.next();
      });


      // if they dont have anything else
      convo.addMessage({
          text: "Great, I'll see you next week! In the meantime, I'm always here if you need me.",
        },'anythingElse_no_thread');
    });
  } 

  // If they are just feeling neutral
  else {
    bot.startConversation(message, function(err, convo) {
      convo.say("Down the Neutral");
    });
  }
});