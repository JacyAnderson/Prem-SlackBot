var Botkit = require('botkit');
require('dotenv').config();
var cron = require('node-cron');
var sentiment = require('sentiment')
var SlackBot = require('slackbots');

var db = require('./models');
var User = db.models.User;
var Session = db.models.Session;

 
// create a bot 
var welcomeBot = new SlackBot({
    token: process.env.API_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token  
});
var currentSession;
welcomeBot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage 

  var user = welcomeBot.getUsers()._value.members[1];
  //console.log(user);
    var params = {
    };
    
    var name = user.real_name.split(/[ ,]+/);
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services  
    welcomeBot.postMessageToUser(user.name, "Hey, its Prem! \n Hows it going this week " + name[0] + "?", params);
    var obj ={
      lastname: name[1],
      firstname: name[0],
      interacted: true
    } 

    var sessObj = {
      score: '-2',
      key_word: 'wooott'
    }


    User.findAll({
      where: {
        lastname: 'Laine'
      }
    })
    .then(function(user){
      if(!user) {
        console.log("user Found");
        User.create(obj).then(function(user){
        if(!user) return error(res, "not saved");
          console.log("saved");
        });
        return error(res, "not found");
      }

      sessObj.userId = user[0].dataValues.id;
      Session.create(sessObj).then(function(session){
        
        currentSession = session.dataValues.id;
        if(!session) return error(res, "not saved");
          console.log("saved");
        });
      //console.log(user[0].dataValues.id);
     }); 
  });

var controller = Botkit.slackbot();

 
var bot = controller.spawn({
 
  token: process.env.API_TOKEN,
  name: "Prem"
 
})
 
bot.startRTM(function(err,bot,payload) {

 // console.log(bot);
 
  if (err) {
 
    throw new Error('Could not connect to Slack');
 
  }
  // console.log("payload");
  // console.log(payload);
 
});




controller.hears([''], ["direct_message","direct_mention","mention","ambient"], function(bot,message) {

    function sentimentToSmiley(sentiment) {
      var score = sentiment.score;

      if(score === 0) { return ':-|' }
      if(score < 0) {
        if(score > -2) { return ':-(' }
        return ':`('
      }

      if(score < 2) { return ':-)' }
      return ':-D'
    }


    var text = message.text;
    var results = sentiment(text);
    // console.log(results);
    // console.log(results.negative);
    // console.log(sentimentToSmiley(results), '-', text.replace(/\n/g, ' '));

    // console.log(results);

    var sentScore = results.score;
    var negative = results.negative.toString();
    var positive= results.positive.toString();

    //console.log(sentScore);
    if(sentScore < 0) {
     bot.startConversation(message, function(err, convo) {
        convo.say('It seems like you have somethings on your mind.');
          convo.addQuestion('Do you want to talk about it?', [
            {
                pattern: 'no',
                callback: function(response, convo) {
                    convo.gotoThread('talkMore_no_thread');
                },
                pattern: 'yes',
                callback: function(response, convo) {
                    convo.gotoThread('talkMore_yes_thread');
                }

            }]);
           convo.next();

        convo.addMessage({
            text: "Thats okay, we can talk next week. \n In the meantime, I'm always here if you need me.",
          },'talkMore_no_thread');

        convo.addQuestion("Okay \n Would you mind telling me a bit more about whats going on?", function(response, convo) {

              convo.say('Cool, you said: ' + response.text);
              console.log(currentSession);
              Session.findById(currentSession).then(function(thisSession){
                console.log(thisSession);
                return thisSession.updateAttributes({response: response.text});
              });
          
              convo.next();

        },{},'talkMore_yes_thread');
       
          
          //convo.say(positive);
      });
    } else if(sentScore > 0) {
      bot.startConversation(message, function(err, convo) {
        convo.say('It sounds like things are going well');
        convo.addQuestion('Can you elaborate on what went well in the past week?', function(response,convo) {
          convo.say("Awesome!");
          convo.addQuestion('Thanks for sharing! Is there anything else you want to talk about?', [
            {
                pattern: 'no',
                callback: function(response, convo) {
                    convo.gotoThread('anythingElse_no_thread');
                }
            }]);
           convo.next();
        });

        convo.addMessage({
            text: "Great, I'll see you next week! In the meantime, I'm always here if you need me.",
          },'anythingElse_no_thread');
          
          //convo.say(positive);
      });
    } else {
        bot.startConversation(message, function(err, convo) {
          convo.say("Down the Neutral");
          convo.say(sentimentToSmiley(results), '-', text.replace(/\n/g, ' '));
        });
    }
});
