const phantom = require('phantom');
const Promise = require('bluebird');
const writeFile = Promise.promisify(require('fs').writeFile);
const parse = require('./kigo_parser');

const myUrl = 'https://kotobank.jp/word/%E5%AD%A3%E8%AA%9E-473181#E5.A4.A7.E8.BE.9E.E6.9E.97.20.E7.AC.AC.E4.B8.89.E7.89.88';
const getEntries = function () {
  return document.getElementById("E6.97.A5.E6.9C.AC.E5.A4.A7.E7.99.BE.E7.A7.91.E5.85.A8.E6.9B.B8.28.E3.83.8B.E3.83.83.E3.83.9D.E3.83.8B.E3.82.AB.29").getElementsByClassName("ex")[1].innerHTML;
};

const scrape = (url, filename, directory) => {
  phantom.create()
  .then((ph) => {
    ph.createPage()
    .then((page) => {
      page.open(url)
      .then((status) => {
        console.log("Attempting to open site: ", status);         
        page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js')
        .then(() => {
          page.evaluate(getEntries)
          .then((dictEntries) => {
            const cleanEntries = dictEntries.replace('［', '<br>[').replace('］', ']').replace(/(［.*?)(?:<\/?span.*?>)/g, "$1").replace(/<\/span>(?=.*?］)/g, '').replace(/　　(.*?)<\/?.*?>(.*?＜)/g, '$1$2').split('<br><b>');
            cleanEntries.slice(0, 5).forEach(e => parse(e));

            writeFile(`${__dirname}/${directory}/${filename}.html`, dictEntries)
              .then(() => {
              console.log(`Contents successfully scraped to ${__dirname}/${directory}/${filename}.html!`);
              })
                .then(() => {
                page.close();
                ph.exit();
                })
              });
            });
            });
          });
        });
      }

scrape(myUrl, 'dict', 'scrapedfiles');
module.exports = scrape;