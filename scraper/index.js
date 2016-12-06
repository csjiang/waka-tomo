const url = `https://kotobank.jp/word/%E5%AD%A3%E8%AA%9E-473181#E5.A4.A7.E8.BE.9E.E6.9E.97.20.E7.AC.AC.E4.B8.89.E7.89.88`;

const cheerio = require('cheerio');
const request = require('request-promise');

request.get(url)
  .then((res) => {
    const $ = cheerio.load(res, {
      decodeEntities: false
    });

    const $craziness = $('article').eq(3);


    const $text = $craziness.find('.ex').eq(1);
    const $rubyclean = $text.removeAttr('span');
    console.log($rubyclean.html());
  });