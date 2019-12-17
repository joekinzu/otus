const fs = require('fs')
const readline = require("readline")

// temp data
let a = []
let b = []
let end, begin
// files count
let wcount = 0
// file size in mb
const filesize = 50*1024*1024
// source file
const rstream= fs.createReadStream('data.txt',{highWaterMark: filesize})
const rstream_arr = []
let lineReader = [];

rstream.on('data', (chunk) => {
  a.push(chunk.sort())
  wcount++
  console.log(wcount,' filesize - ',a[0].indexOf('1'))
  const wstream = fs.createWriteStream('data'+wcount+'.txt')
  for(let j=0;j<10;j++){
    begin = a[0].indexOf((j).toString())
    j!==9 ? end = a[0].indexOf((j+1).toString()) : end = a[0].length
    let buf = Buffer.allocUnsafe(end-begin)
    a[0].copy(buf,0,begin,end)
    b.push(buf)
    wstream.write(buf+'\n')
    b = []
  }
  a = []
})

rstream.on('end', () => {
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
