const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const WATSON_API_KEY = require('../config/config.json').watson.apiKey;

const nlu = new NaturalLanguageUnderstandingV1({
    authenticator:new IamAuthenticator({apikey: WATSON_API_KEY}),
    version: '2018-04-05',
    serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com'
})

const init = (text) => new Promise ((res,rej) => {
  console.log('\nWatson search keywords in setence...')
    nlu.analyze(
        {
          text, // Buffer or String
          features: {
            keywords: {}
          }
        })
        .then(response => {
            const keywords = response.result.keywords.map(keyword => keyword.text)
            res(keywords)
        })
        .catch(err => {
            rej(err)
        });
})

module.exports = {IbmNlu: init}