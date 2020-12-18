const Algorithmia = require("algorithmia");
const API_KEY = require('../config/config.json').algorithmia;
const IbmNlu = require('./IbmNLU').IbmNlu
const maxStences = require('../config/config.json').maxSetences
const sbd = require('sbd')


const fs = require('./fileSystem')
const {log} = require('../helpers');

const init = () => new Promise (async (res,rej) => {
    const file = await fs.load();

    Algorithmia.client(API_KEY)
    .algo("web/WikipediaParser/0.1.2?timeout=300") 
    .pipe(file.searchTearm)
    .then(async function(output) {
        
        const response = output.result.content;
        
        const semLinhasBrancas = await removeBlankLinesAndMarkdown(String(response));
        const semDatasEmParentes  = removeDatesInParentheses(semLinhasBrancas);
        let setences =  breakInSetences(semDatasEmParentes);

        // log(`\nResult: ${semDatasEmParentes}\n`.yellow)

        file.wiki = semDatasEmParentes

        if(!file.setencesAndInfo)
            file.setencesAndInfo = []
            
        setences = limitMaxSetences(setences);
        setences.forEach(async st => 
            await file.setencesAndInfo.push({  
                text:st,
                keywords:[''],
                images:['']
            })
        );

        keywordInSentence(file.setencesAndInfo);
        console.log('Pesquisa concluida com sucesso');

        fs.save(file);
        res()

    })
})

function removeBlankLinesAndMarkdown (text) {
    const allLines = text.split('\n');
    const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
        if (line.trim().length === 0 || line.trim().startsWith('=')) {
          return false
        }
  
        return true
      })
  
      return withoutBlankLinesAndMarkdown.join(' ')
    
    }
  
  function removeDatesInParentheses(text) {
    return String(text).replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
  }

  function breakInSetences (text) {
      return sentences = sbd.sentences(text)
  }

  function limitMaxSetences (arr) {
      arr = arr.slice(0, maxStences)
      return arr
  }

  async function keywordInSentence (arr) {
      for (const setence of arr) {
        setence.keywords = await IbmNlu(setence.text)
    }
  }

module.exports = {
    WikiSearchSystem:init
}