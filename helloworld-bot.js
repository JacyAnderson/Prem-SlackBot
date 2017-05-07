var Botkit = require('botkit');
 
var controller = Botkit.slackbot();
 
var bot = controller.spawn({
 
  token: "xoxb-180505096471-YqdN9geaoAdOCW6mZf1arbz6"
 
})
 
bot.startRTM(function(err,bot,payload) {
 
  if (err) {
 
    throw new Error('Could not connect to Slack');
 
  }
 
});
 
// controller.hears(["Hello","Hi"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
 
//   bot.reply(message,'Hello, how are you today?');
 
// });

// controller.hears(["Good","Okay", "Fine"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
 
//   bot.reply(message,'Thats great! What can I do for you?');
 
// });

// controller.hears(["question"], ["direct_message","direct_mention","mention","ambient"], function(bot,message) {
// 	console.log("heard");
//   // start a conversation to handle this response.
//   bot.startConversation(message,function(err,convo) {

//     convo.addQuestion('How are you?',function(response,convo) {

//       convo.say('Cool, you said: ' + response.text);
//       convo.next();

//     },{},'default');

//   })

// });

controller.hears(["hi"], ["direct_message","direct_mention","mention","ambient"], function(bot,message) {
	bot.createConversation(message, function(err, convo) {

    // create a path for when a user says YES
    convo.addQuestion('You said you are terrible! Oh no! Why is that?', [
        {
            pattern: 'sucks',
            callback: function(response, convo) {
                convo.gotoThread('job_thread');
            },
        }],{},'terrible_thread');

    // create a path for when a user says NO
    convo.addMessage({
        text: 'You said you are mad... No!',
    },'mad_thread');

    convo.addMessage({
        text: 'You said you are upset... uhhooohh!',
    },'upset_thread');

     convo.addMessage({
        text: 'We should fix that',
    },'job_thread');

    // create a path where neither option was matched
    // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
    convo.addMessage({
        text: 'Sorry I did not understand.',
        action: 'default',
    },'bad_response');

    // Create a yes/no question in the default thread...
    convo.addQuestion('How are you??', [
        {
            pattern: 'terrible',
            callback: function(response, convo) {
                convo.gotoThread('terrible_thread');
            },
        },
        {
            pattern: 'mad',
            callback: function(response, convo) {
                convo.gotoThread('mad_thread');
            },
        },
        {
            pattern: 'upset',
            callback: function(response, convo) {
                convo.gotoThread('upset_thread');
            },
        },
        {
            default: true,
            callback: function(response, convo) {
                convo.gotoThread('bad_response');
            },
        }
    ],{},'default');

    convo.activate();
});
});