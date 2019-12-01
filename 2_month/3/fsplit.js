// Этап 1 
const fs = require('fs')

const stream = fs.createReadStream('data.txt', {encoding: 'utf8', fd: null,})

const num = 20
let i = Math.floor(Math.random()*num+1)
let wstream = [];

[...Array(num)].map((item,index) => {
        wstream.push(fs.createWriteStream('data'+(num-index)+'.txt'))
    })

stream.on('readable', (chunk) => {
    while(chunk = stream.read(100)){
        wstream[i-1].write(chunk)
        i = Math.floor(Math.random()*num+1)
    }
  })

stream.on('end', () => {
    console.log('end')
})
