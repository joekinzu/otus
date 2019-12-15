const stream = require('stream');
const fs = require('fs');
const filesize = 100*1024*1024
const rstream= fs.createReadStream('data.txt',{highWaterMark: filesize});
const wstream = fs.createWriteStream('data111.txt');
const a = [];

const check = new stream.Transform({
  transform(data, encoding, callback){
    a.push(data.sort())
    callback(null, a.join(''));
  },
});

rstream.pipe(check).pipe(wstream);
