const htmlparser = require('htmlparser2');
const Kigo = require('../models/kigo');
const Waka = require('../models/waka');

const parse = chunk => {
    let newEntry = {name: '', reading: '', definition: '', synonyms: [], season: ''};
    let newPoem = {text: '', author: ''};
    const parser = new htmlparser.Parser({

    ontext: function(text) {
        // console.log(text);
        if (!newEntry['name']) {
            newEntry['name'] = text;
        } else if (!newEntry['reading']) {
            newEntry['reading'] = text.replace(/[()]/g, '');
        } else if (!newEntry['season']) {
            textSeason = text.split('）');
            const theSeason = textSeason[0].replace(/[（]/g, '');
            newEntry['season'] = theSeason;
            if (textSeason[1]) {
                const someSynonyms = textSeason[1].replace(/[\［\］]/g, '').split('・');
                newEntry['synonyms'] = someSynonyms;
            }
        } else if (text.includes('[') && text.includes(']')) {
            newEntry['synonyms'] = text.replace('・', ',');
        } else if (text.includes('[')) {
            newEntry['synonyms'].push(text.slice(1).split('・'));
        } else if (text.includes(']')) {
            newEntry['synonyms'].push(text.slice(0, text.length-1).split('・'));
        } else if (!newEntry['definition']) {
            newEntry['definition'] = text;
        } else if (text.includes('＜')) {
            const splitLine = text.split('＜');
            newPoem['text'] += splitLine[0];
            newPoem['author'] = splitLine[1];
        } else if (text.includes('　　')) {
            newPoem['text'] = text;
        } else {
            newEntry['definition'] += text;
        }
    },
    
    onend: function() {
        Waka.create(newPoem)
        .then(createdPoem => console.log('New poem created!'))
        .catch(console.error);

        Kigo.create(newEntry)
        .then(createdEntry => console.log('New dictionary entry created!'))
        .catch(console.error);
    },

}, {decodeEntities: true});
    parser.write(chunk);
    console.log(newEntry);
    console.log(newPoem);
    parser.end();
}

module.exports = parse;