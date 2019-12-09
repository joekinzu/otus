const fs = require('fs')
const readline = require("readline")

// temp data
let s = ''
// files count
let wcount = 0
// file size in mb
const filesize = 10*1024*1024
// source file
const rstream= fs.createReadStream('data.txt',)
const rstream_arr = []
let lineReader = [];

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
  wcount++
  const wstream = fs.createWriteStream('data'+wcount+'.txt')
  for(let j=0;j<10;j++){
    re = new RegExp(j, 'g')
    wstream.write(s.match(re).join('')+'\n')
  }
  const wstream_sort = fs.createWriteStream('datasorted.txt')
  for(let i=0;i<wcount;i++){
    rstream_arr.push('data'+(i+1)+'.txt')
  }
  
  for(let x in rstream_arr) {
    let fileName = rstream_arr[x]
    lineReader[x] = readline.createInterface({
        input: fs.createReadStream(fileName)
    })

    lineReader[x].on('line', function(line) {
        wstream_sort.write(line)
    })
  }
console.log(wcount, ' files created')
})
