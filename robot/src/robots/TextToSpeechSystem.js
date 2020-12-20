const sdk = require("microsoft-cognitiveservices-speech-sdk");
const path = require('path');
const fs = require('./fileSystem')


const {
    language,
    region,
    subscriptionKey
} = require('../config/config.json').ttsConfig

function synthesizeSpeech(text,i) {

    fs.IfCreate(path.resolve('temp','AUDS'))

    return new Promise((res,rej) => {
        const speechConfig =  sdk.SpeechConfig.fromSubscription(subscriptionKey,region)
        speechConfig.speechSynthesisLanguage = language
        const audioConfig = sdk.AudioConfig.fromAudioFileOutput(`${path.resolve('temp','AUDS',`'AUD_${i}.wav`)}`);
    
        const synthesizer  = new sdk.SpeechSynthesizer(speechConfig,audioConfig);
    
        console.log(`Converting ${text}`);
    
        synthesizer.speakTextAsync(
            text,
            result => {
                if (result) {
                    console.log('voice generated\n',JSON.stringify(result));
                    res()
                }
                synthesizer.close();
            },
            error => {
                console.log('err:',error);
                rej(error);
                synthesizer.close();
            });
    })
   
   
}

function SetencesToAudio () {
    return new Promise((res,rej) => {
        const data = fs.load()
        const stences = data.setencesAndInfo;
        stences.forEach(async (element,i) => {
            await synthesizeSpeech(element.text,i)
        })
    })
}

module.exports = () => SetencesToAudio()