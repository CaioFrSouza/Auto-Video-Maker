const InputSystem = require('./src/robots/inputSystem').InputSystem
const WikiSearchSystem = require('./src/robots/WikiSearchSystem').WikiSearchSystem
const colors = require('colors')
const fs = require('./src/robots/fileSystem')

async function init () {
   fs.remove()
    await InputSystem();
    await WikiSearchSystem();

}

init()