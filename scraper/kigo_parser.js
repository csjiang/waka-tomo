const htmlparser = require('htmlparser2');
const Kigo = require('../models/kigo');
const Waka = require('../models/waka');

const parse = chunk => {
    let newEntry = {
        name: '', 
        reading: '', 
        definition: '', 
        synonyms: [], 
        season: ''
    };
    let newPoem = {
        text: '', 
        author: ''
    };
    const parser = new htmlparser.Parser({

    ontext: function (text) {
        // console.log('parsing line: ' + text);
        if (!text) return;
        if (!newEntry['name']) { // sample line: '暖か(あたたか)'
            const nameReading = text.split('(');
            newEntry['name'] = nameReading[0];
            nameReading[1] 
            ? newEntry['reading'] = nameReading[1].replace(')', '')
            : null
        } else if (!newEntry['season'] && text.includes('（')) { //　'（三春）'
            const season = text.replace(/[\s（）]/g, '');
            newEntry['season'] = season;
        } else if (text.includes('[') && text.includes(']')) { // '[春暖(しゅんだん)・ぬくし]'
            newEntry['synonyms'] = text.replace(/[\[\]]/g, '').split('・');
        } else if (!newEntry['definition']) { // '春の光のもと、すべてのものがやわらかく明るく輝いてみえるようすをいう.'
            newEntry['definition'] = text.trim();
        } else if (text.includes('＜')) { // 'うららかや猫にものいふ妻のこゑ　＜日野草城＞'
            const splitLine = text.split('＜');
            newPoem['text'] += splitLine[0].trim();
            newPoem['author'] = splitLine[1].replace('＞', '');
            
            // poem instance created here because some entries have more than one example
            Waka.create({
                text: newPoem.text,
                author: newPoem.author,
            })
            .then(createdPoem => console.log('New poem created!', createdPoem))
            .catch(console.error);
        }
    },
    
    onend: function() {
        Kigo.create({
            name: newEntry.name,
            definition: newEntry.definition,
            season: newEntry.season,
            reading: newEntry.reading,
            synonyms: newEntry.synonyms,
        })
        .then(createdEntry => console.log('New dictionary entry created!', createdEntry))
        .catch(console.error);
    },

}, {decodeEntities: true});
    parser.write(chunk);
    parser.end();
}

module.exports = parse;