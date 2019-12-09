const fs = require('fs')

let s = ''
// files count
let wcount = 0
// file size in mb
const filesize = 20*1024*1024
// source file
const rstream= fs.createReadStream('data.txt')

rstream.on('data', (chunk) => {
  s = s + chunk
  if(s.length > filesize){
    rstream.pause()
    wcount++
    const wstream = fs.createWriteStream('data'+wcount+'.txt')
    for(let j=0;j<10;j++){
      re = new RegExp(j, 'g')
      wstream.write(s.match(re).join('')+'\n')
    }
    s = ''
    rstream.resume()
  }
})

rstream.on('end', () => {
  rstream.destroy()
  wcount++
  const wstream = fs.createWriteStream('data'+wcount+'.txt')
  for(let j=0;j<10;j++){
    re = new RegExp(j, 'g')
    wstream.write(s.match(re).join('')+'\n')
  }
console.log(wcount, ' files created')
})    
