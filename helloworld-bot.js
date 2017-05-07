var Botkit = require('botkit');
require('dotenv').config();
var cron = require('node-cron');


var SlackBot = require('slackbots');
 
// create a bot 
var welcomeBot = new SlackBot({
    token: process.env.API_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: 'Prem'
});
 
welcomeBot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage 

   console.log(welcomeBot.getUsers()._value);
    var params = {
        icon_emoji: ':cat:'
    };
    
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services  
    welcomeBot.postMessageToUser('taylorlaine', 'meow!', params);
  });





 
var controller = Botkit.slackbot();

    var
      sentiment = require('sentiment')
    ;
 
var bot = controller.spawn({
 
  token: process.env.API_TOKEN
 
})
 
bot.startRTM(function(err,bot,payload) {
 
  if (err) {
 
    throw new Error('Could not connect to Slack');
 
  }
 
});


controller.hears(["hi"], 'direct_message,direct_mention,mention', function(bot, message) {
  bot.startConversation(message, function(err, convo) {
    convo.say('Hi. I am Prem');
    convo.say('I do not know your name yet!');

    convo.ask('What should I call you?', function(response, convo) {
        convo.ask('You want me to call you `' + response.text + '`?', [
            {
              pattern: 'yes',
              callback: function(response, convo) {
                // since no further messages are queued after this,
                // the conversation will end naturally with status == 'completed'
                convo.next();
              }
            },
            {
              pattern: 'no',
              callback: function(response, convo) {
                  // stop the conversation. this will cause it to end with status == 'stopped'
                  convo.stop();
              }
            },
            {
              default: true,
              callback: function(response, convo) {
                  convo.repeat();
                  convo.next();
              }
            }
        ]);

        convo.next();

    }, {'key': 'name'}); // store the results in a field called nickname

    convo.on('end', function(convo) {
       var name = convo.extractResponse('name');
       console.log(name);
     });

  });
});



















































// controller.hears(["hi"], ["direct_message","direct_mention","mention","ambient"], function(bot,message) {

//     function sentimentToSmiley(sentiment) {
//       var score = sentiment.score;

//       if(score === 0) { return ':-|' }
//       if(score < 0) {
//         if(score > -2) { return ':-(' }
//         return ':`('
//       }

//       if(score < 2) { return ':-)' }
//       return ':-D'
//     }

//     var text = message.text;
//     var results = sentiment(text);
//     console.log(results);
//     console.log(results.negative);
//     console.log(sentimentToSmiley(results), '-', text.replace(/\n/g, ' '));

//       controller.storage.users.get(message.user, function(err, user) {
//         console.log(user);
//         if (user && user.name) {
//             bot.reply(message, 'Hello ' + user.name + '!!');
//         } else {
//             bot.reply(message, 'Hello.');
//         }
//     });


// 	bot.createConversation(message, function(err, convo) {

//     // create a path for when a user says YES
//     convo.addQuestion('You said you are terrible! Oh no! Why is that?', [
//         {
//             pattern: 'sucks',
//             callback: function(response, convo) {
//                 convo.gotoThread('job_thread');
//             },
//         }],{},'terrible_thread');

//     // create a path for when a user says NO
//     convo.addMessage({
//         text: 'You said you are mad... No!',
//     },'mad_thread');

//     convo.addMessage({
//         text: 'You said you are upset... uhhooohh!',
//     },'upset_thread');

//      convo.addMessage({
//         text: 'We should fix that',
//     },'job_thread');

//     // create a path where neither option was matched
//     // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
//     convo.addMessage({
//         text: 'Sorry I did not understand.',
//         action: 'default',
//     },'bad_response');

//     // Create a yes/no question in the default thread...
//     convo.addQuestion('How are you??', [
//         {
//             pattern: 'terrible',
//             callback: function(response, convo) {
//                 convo.gotoThread('terrible_thread');
//             },
//         },
//         {
//             pattern: 'mad',
//             callback: function(response, convo) {
//                 convo.gotoThread('mad_thread');
//             },
//         },
//         {
//             pattern: 'upset',
//             callback: function(response, convo) {
//                 convo.gotoThread('upset_thread');
//             },
//         },
//         {
//             default: true,
//             callback: function(response, convo) {
//                 convo.gotoThread('bad_response');
//             },
//         }
//     ],{},'default');

//     convo.activate();
// });
//});

// var interacted = false;

// function timer() {
//     interacted = true;
//     console.log(interacted);
//     var task = cron.schedule('* 36 0 * * Sun', function(){
//       console.log('click');
//       console.log(interacted);
//       task.stop();
//     });
//     if (interacted) {
//         var task2 = cron.schedule('* 37 0 * * Sun', function(){
//             interacted = false;
//             console.log(interacted);
//             task2.stop();
//         });
//     }
// }
// timer();

