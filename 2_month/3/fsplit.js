const fs = require('fs')

const stream = fs.createReadStream('data.txt', {encoding: 'utf8', fd: null,})

const num = 10
let i = Math.floor(Math.random()*num+1)
let wstream = [];

[...Array(num)].map((item,index) => {
        wstream.push(fs.createWriteStream('data'+(num-index)+'.txt'))
    })

stream.on('data', (data) => {
        wstream[i-1].write(data)
        i = Math.floor(Math.random()*num+1)
  })

stream.on('end', () => {
    console.log('end')
})
