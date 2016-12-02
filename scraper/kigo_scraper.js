const myUrl = 'https://kotobank.jp/word/%E5%AD%A3%E8%AA%9E-473181#E5.A4.A7.E8.BE.9E.E6.9E.97.20.E7.AC.AC.E4.B8.89.E7.89.88';
const jsonfile = require('jsonfile');
const phantom = require('phantom');
const Promise = require('bluebird');
const writeFile = Promise.promisify(require('fs').writeFile);
// const lineReader = require('line-reader');
// const eachLine = Promise.promisify(lineReader.eachLine);
// const readFile = Promise.promisify(require('fs').readFile);
const getEntries = function () {
  return document.getElementById("E6.97.A5.E6.9C.AC.E5.A4.A7.E7.99.BE.E7.A7.91.E5.85.A8.E6.9B.B8.28.E3.83.8B.E3.83.83.E3.83.9D.E3.83.8B.E3.82.AB.29").getElementsByClassName("ex")[1].innerHTML;
};
// const parseText = require('./parse');
// const cleanUpFiles = require('./scrape-utils');

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
            writeFile(`${__dirname}/${directory}/${filename}.html`, dictEntries)
              .then(() => {
              console.log(`Contents successfully scraped to ${__dirname}/${directory}/${filename}.html!`);
              })
              // .then(() => {
              //   readFile(`${__dirname}/${directory}/${filename}.html`)
              //   .then((contents) => {
              //     console.log('file read!');
              //     const textString = parseText(contents.toString());
              //     console.log(textString);
              //     writeFile(`${__dirname}/${directory}/${filename}-full.txt`, textString).then(() => {
              //         console.log(`wrote whole text to ${filename}-full.txt!`);
              //     })
                //   .then(() => {
                //   let chapnum = 0;
                //   eachLine(`${__dirname}/${directory}/${filename}-full.txt`, {separator: '==**=='}, function(line) {
                //       chapnum++;
                //       writeFile(`${__dirname}/${directory}/${filename}-${chapnum}.txt`, line)
                //       .then(() => {
                //         console.log(`wrote chapter ${chapnum}.txt!`);
                //         })
                //   }).then(() => {
                //     console.log('done reading and writing files!');
                //     cleanUpFiles(filename, directory);
                //   })
                //   .catch((err) => {
                //     console.error(err);
                //   })
                // })
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

//       )
//       .catch((err) => {
//       console.error('Oops! An error!');;
//     });
//   })
// };
scrape(myUrl, 'dict', 'scrapedfiles');
module.exports = scrape;
 