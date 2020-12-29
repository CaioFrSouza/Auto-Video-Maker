const InputSystem = require('./robot/robots/inputSystem').InputSystem;
const WikiSearchSystem = require('./robot/robots/WikiSearchSystem').WikiSearchSystem;
const SearchAndDownloadImages = require('./robot/robots/SearchImageAndDownloadSystem').SearchAndDownloadImages;
const TextToSpeechSystem = require('./robot/robots/TextToSpeechSystem');
const fs = require('./robot/robots/fileSystem')
const Converter = require('./Converter')
const videoGen = require('./videoGenerator')


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
    await TextToSpeechSystem();
    await Converter();
    await videoGen();
    console.log('Processo finalizado :)')
}

init()