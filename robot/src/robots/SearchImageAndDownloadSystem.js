const google = require('googleapis').google;
const googleCustomSearch = google.customsearch('v1');
const ImageDownloader= require('image-downloader');
const path = require('path');

const fs = require('./fileSystem');
const NodeJsFileSystem = require('fs')
const googleConfig = require('../config/config.json').google

async function init () {
    const file = await fs.load();

    for(const obj of file.setencesAndInfo){
        const links = await SearchImage(obj.keywords[0]);
        obj.images = links
        DownloadImage(links[0])
        
    }
    fs.save(file)


}

async function SearchImage (q) {
    console.log('Search images in google');
    const response = await googleCustomSearch.cse.list({
        ...googleConfig,
        q, 
    })
    const imgUrl = response.data.items.map(item => item.link )
    return imgUrl
}

async function DownloadImage (url) {
    const dest = path.resolve('temp','images');

    try{
        console.log('Trying download image in',dest);
        if(!NodeJsFileSystem.existsSync(dest)){
            NodeJsFileSystem.mkdirSync(dest)
        }
        await ImageDownloader.image({
            url,
            dest
        })

    }
    catch(err) {
        console.log(err);

    }
}

module.exports = {
    SearchAndDownloadImages: init
}