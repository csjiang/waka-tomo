const htmlparser = require('htmlparser2');
const Kigo = require('../server/db/models/').Kigo;

const parse = chunk => {
    let theCategory = '';
    const parser = new htmlparser.Parser({

    ontext: function (text) {
        console.log('parsing line: ' + text);
        if (!text) return;
        if (text.includes('!!!')) { 
            theCategory = text.replace('!!!', '');
            console.log(theCategory);
        } else if (text.includes('（')) { 
            return;
        } else {
            Kigo.findOne({
                where: {
                    name: text
                }
            })
            .then(foundInstance => foundInstance.update({
                category: theCategory
            }))
            .then(() => console.log('Entry updated successfully!'))
            .catch(console.error);
        }
    },
    
    onend: function() {
        console.log('ended!');
    },

}, { decodeEntities: true });
    parser.write(chunk);
    parser.end();
}

module.exports = parse;