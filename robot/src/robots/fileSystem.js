const { dir } = require('console');
const fs = require('fs');
const path = require('path');
const { log } = require('../helpers');

const tempPath = path.resolve('temp');
const tempFile = path.resolve('temp','temp.json')

if(!fs.existsSync(tempPath)){
    log('Criando um pasta temporaria....')
    fs.mkdirSync(tempPath)
    console.clear()
}

module.exports = {
    save: (info) => {
        const json = JSON.stringify(info);
        log(`saving in ${tempFile}`.underline.green)
        return fs.writeFileSync(tempFile,json);
    },
    remove: () =>{
        fs.rmSync(tempPath,{recursive :true})
        fs.mkdirSync(tempPath)

    },
    IfCreate: (dir) => {
        if(!fs.existsSync(path.resolve(dir))){
            return fs.mkdirSync(path.resolve(dir))
        }
        return
    },
    load: () => {
        if(fs.existsSync(tempFile)){
            const json = JSON.parse(fs.readFileSync(tempFile));
            log(`load file in ${tempFile}`.underline.green)

            return json;
        }
        return {
            searchTearm:{articleName:"",lang:"pt"},
            ImageLink:[],
            wiki:'',
            voiceLocation:'',
            setencesAndInfo:[]
        }
    }
}