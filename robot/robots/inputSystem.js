
const readLine = require('readline');
const fs = require('./fileSystem')
const {log} = require('../helpers');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
})

 const  init = () => new Promise((resolve,reject) => {
     console.clear()
     log('\n|'+'-'.repeat(98) + '|')
     log('| Auto Video Maker'+ " ".repeat(81)+'|')
     log('|'+'-'.repeat(98) + '|')


     rl.question('\nDigite um termo > ', res=>{
         if(!res) 
             return init()
             
             let data =  fs.load()
             data.searchTearm.articleName = res;
             
             fs.save(data);
             rl.close
             log(`Procurando ${res} na wikipédia... \n `.underline.yellow)
             return resolve()
     })

 });



module.exports = {
    InputSystem:init
}