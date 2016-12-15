const TinySegmenter = require('tiny-segmenter');
const segmenter = new TinySegmenter(); 
module.exports = segmenter;

// for testing
// const text = '長閑さや鼠(ねずみ)のなめる角田川(すみだがは)';
// console.log(segmenter.segment(text.replace(/\ *\([^)]*\) */g, '')));