// Этап 1   
const fs = require('fs')

let stream = fs.createWriteStream('data.txt')
const i = () => {return Math.floor(Math.random()*10) + ''}
[...Array(1024*1024*10)].map( function (item,index) {
    stream.write(i() + i() + i() + i() + i() + i() + i() + i() + i() + i())
})

console.log('done')
stream.end()