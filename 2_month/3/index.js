const fs = require('fs')
const readline = require("readline")

// temp data
let a = []
let end, begin
// files count
let wcount = 0
// file size in mb
let b = fs.statSync('data.txt').size
console.log('Source file size - ',fs.statSync('data.txt').size/(1024*1024),'MB')
const filesize = b/2
// source file
const rstream= fs.createReadStream('data.txt',{highWaterMark: filesize})
const rstream_arr = []
let lineReader = []

rstream.on('data', (chunk) => {
  a.push(chunk.sort())
  wcount++
  console.log(wcount,' filesize - ',a[0].length/(1024*1024),'MB')
  const wstream = fs.createWriteStream('data'+wcount+'.txt')
  for(let j=0;j<10;j++){
    begin = a[0].indexOf((j).toString())
    j!==9 ? end = a[0].indexOf((j+1).toString()) : end = a[0].length
    let buf = Buffer.allocUnsafe(end-begin)
    a[0].copy(buf,0,begin,end)
    wstream.write(buf+'\n')
  }
  a = []
})

rstream.on('end', () => {
  const wstream_sort = fs.createWriteStream('datasorted.txt')
  for(let i=0;i<wcount;i++){
    rstream_arr.push('data'+(i+1)+'.txt')
  }
  setTimeout(() => {
    for(let x in rstream_arr) {
      let fileName = rstream_arr[x]
      lineReader[x] = readline.createInterface({
          input: fs.createReadStream(fileName)
      })
      lineReader[x].on('line', function(line){
          wstream_sort.write(line)
      })
    }
  },100)
  console.log(wcount, ' files created')
})