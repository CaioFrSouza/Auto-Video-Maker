const { spawn } = require('child_process');
const path = require('path');
const {affterEffectsLocation} = require('../robot/config/config.json');
const NodeFileSystem = require('fs');

function aerender (sel=0) {
    return new Promise((res,rej) => {

        let txt,convertedImage,Aud = false

        console.log('> *Staring Video Render*');

        const template = path.resolve('videoGenerator','AffterTemplates','01','Template.aep');
        const output = path.resolve('out','file.avi');
        // const tempPath = path.reso

        if(!NodeFileSystem.existsSync(path.resolve('out')))
            NodeFileSystem.mkdirSync(path.resolve('out'))

        if(!NodeFileSystem.existsSync(affterEffectsLocation)){
            console.log('Aerender not found \n Pls Check the directory for the path in the settings file ');
            process.exitCode(0);
        }

        if(!txt||!convertedImage||!Aud){

        }

        const AerenderProcess = spawn(affterEffectsLocation,[
            '-comp','Result',
            '-project',template,
            '-output',output,
             
        ])

        AerenderProcess.stdout.on('data',(data) => {
            console.log(data.toString())
        })

        AerenderProcess.stdout.on('close',() => res());
    })
}

module.exports = aerender