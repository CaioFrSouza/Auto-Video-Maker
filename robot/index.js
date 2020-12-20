const InputSystem = require('./src/robots/inputSystem').InputSystem
const WikiSearchSystem = require('./src/robots/WikiSearchSystem').WikiSearchSystem
const SearchAndDownloadImages = require('./src/robots/SearchImageAndDownloadSystem').SearchAndDownloadImages
const TextToSpeechSystem = require('./src/robots/TextToSpeechSystem')


const fs = require('./src/robots/fileSystem')
const NodeJsFileSystem = require('fs');
const colors = require('colors')
const path = require('path')

async function init () {
    if(NodeJsFileSystem.existsSync(path.resolve('temp','temp.json'))){
        fs.remove();
        console.log('Apagando cahce....'.red)
    }

    await InputSystem();
    await WikiSearchSystem();
    await SearchAndDownloadImages();
    // TextToSpeechSystem()
}

init()