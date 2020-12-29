const nodeFileSystem = require('fs') 
const fs = require('../robot/robots/fileSystem')
const path = require('path');
const imageMaskPath = path.resolve('Converter','ImageMask','ImageMagick-7.0.10-Q8','magick.exe')
const { spawn } = require('child_process');

const TEMP_PATH = path.resolve('temp');

function initConversionTempPath () {
    return new Promise (async(res,rej) => {
        const files = nodeFileSystem.readdirSync(path.resolve(TEMP_PATH,'images'));
    
        if(!nodeFileSystem.existsSync(path.resolve(TEMP_PATH,'images-Converted-Blur')))
            nodeFileSystem.mkdirSync(path.resolve(TEMP_PATH,'images-Converted-Blur'))
    
        console.log('> Conversion init');
        files.forEach(async (file,i) => {
            await conversion(file,i)
            .catch((err) => {
                rej(err)
                return console.log('Conversion Faild') 
            })
        });
        if(!nodeFileSystem.existsSync(path.resolve(TEMP_PATH,'images-Setences-Text')))
            nodeFileSystem.mkdirSync(path.resolve(TEMP_PATH,'images-Setences-Text'));
        
        const data = await fs.load();

        data.setencesAndInfo.forEach(async (data,i) => {
            await setencesToImage(data.text,i)
        })

        return res()
    })
}

function conversion (file,i) {
    return new Promise((res,rej) => {
        try{
            console.log(`> Conversion ${file}`)
            const inputFile = path.resolve(TEMP_PATH,'images',file);
            const outPutFile = path.resolve(TEMP_PATH,'images-Converted-Blur',`CONVERTED-${i}-PNG.png`);
            const width = 1920;
            const height = 1080;

           const process =  spawn(imageMaskPath,[
               inputFile,
                `(`,`-clone`,'0','-background', 'white','-blur',
                 '0x9',`-resize`,`${width}x${height}^`,')',
                 '(','-clone','0','-background', 'white',
                `-resize`,`${width}x${height}`,')',
                '-delete','0','-gravity','center',
                '-compose', 'over', '-composite',
                '-extent',`${width}x${height}`,
            `${outPutFile}`])

           process.stderr.on('data',err => console.log(err.toString()))
        }
        catch(err){
            console.log(err)
            rej(err)
        }

    })
}

function setencesToImage(text,i=0) {
    return new Promise((res,rej) => {
        const outPutFile = path.resolve(TEMP_PATH,'images-Setences-Text',`GENERATED-IMAGE-${i}-PNG.png`);
        const width = 1920;
        const height = 1080;

        const templateSettings = {
            0: {
              size: '1920x400',
              gravity: 'center'
            },
            1: {
              size: '1920x1080',
              gravity: 'center'
            },
            2: {
              size: '800x1080',
              gravity: 'west'
            },
            3: {
              size: '1920x400',
              gravity: 'center'
            },
            4: {
              size: '1920x1080',
              gravity: 'center'
            },
            5: {
              size: '800x1080',
              gravity: 'west'
            },
            6: {
              size: '1920x400',
              gravity: 'center'
            }
    
          }
    

        const process = spawn(imageMaskPath,[
            '-size',`${templateSettings[i].size}`,
            '-gravity',`${templateSettings[i].gravity}`,
            '-background','transparent','-fill','white',
            '-kerning','-1',`caption:${text}`,`${outPutFile}`]);

            process.stderr.on('data',err => console.log(err.toString()));
            process.stderr.on('close', () => res())
    })
}

module.exports =  initConversionTempPath