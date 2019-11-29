// Этап 1 
const fs = require('fs')

const stream = fs.createReadStream('data.txt', {
    encoding: 'utf8',
    fd: null,
});
const wstream1 = fs.createWriteStream('data1.txt')
const wstream2 = fs.createWriteStream('data2.txt')
const wstream3 = fs.createWriteStream('data3.txt')
const wstream4 = fs.createWriteStream('data4.txt')
let i = 1

stream.on('readable', (chunk) => {
    while (null !== (chunk = stream.read(100))) {
        if (i===1){
            wstream1.write(chunk)
        }
        if (i===2){
            wstream2.write(chunk)
        }
        if (i===3){
            wstream3.write(chunk)
        }
        if (i===4){
            wstream4.write(chunk)
        }
        i = Math.floor(Math.random()*4)+1
    }
  })

stream.on('end', () => {
    console.log('end')
})
