const url = `https://kotobank.jp/word/%E5%AD%A3%E8%AA%9E-473181#E5.A4.A7.E8.BE.9E.E6.9E.97.20.E7.AC.AC.E4.B8.89.E7.89.88`;
//Christine is very sad at the lack of APIs among Japanese dictionaries

const cheerio = require('cheerio');
const request = require('request-promise');
const parse = require('./kigo_parser');

request.get(url)
  .then((res) => {
    const $ = cheerio.load(res, { decodeEntities: false });

    const $nipponica = $('article').eq(3);  //日本大百科全書(ニッポニカ)
    const $dictEntries = $nipponica.find('.ex').eq(1).find('.description').html();
    const cleanEntries = $dictEntries
    	.replace(/.*?(<br><b>)/, '$1') 		// drop the intro text
	    .replace(/<br><b>【.*?】<\/b>/g, '') 	// remove season tag headings
	    .replace(/<br>　　　.*?<br>/g, '') 	// remove subseason tag headings
	    .replace(/［/g, '<br>[')
	    .replace(/］/g, ']')
	    .replace(/<\/?span.*?>/g, '') 		// remove ruby tags
	    .split('<b>'); 						// split on each entry

	    cleanEntries.slice(400).forEach(e => parse(e));
  })
  .catch(console.error);
