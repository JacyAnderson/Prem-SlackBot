var
  request = require('request'),
  cheerio = require('cheerio'),
  sentiment = require('sentiment')
;

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

    var text = "I am alright";
    var results = sentiment(text);
    console.log(results);
    console.log(results.negative);
    console.log(sentimentToSmiley(results), '-', text.replace(/\n/g, ' '));