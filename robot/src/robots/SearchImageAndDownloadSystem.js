const fs = require('./fileSystem');
const google = require('googleapis').google;
const googleCustomSearch = google.customsearch('v1');

const googleConfig = require('../config/config.json').google

async function init () {
    const file = await fs.load();

    for(const obj of file.setencesAndInfo){
        const links = await SearchImage(obj.keywords[0]);
        obj.images = links
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

module.exports = {
    SearchAndDownloadImages: init
}