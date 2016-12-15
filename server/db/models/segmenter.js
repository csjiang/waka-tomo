const TinySegmenter = require('tiny-segmenter');
// console.log(segmenter);
const segmenter = new TinySegmenter(); 
module.exports = segmenter;

// const text = '長閑さや鼠(ねずみ)のなめる角田川(すみだがは)';
// console.log(segmenter.segment(text.replace(/\ *\([^)]*\) */g, '')));