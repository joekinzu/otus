// Этап 2 
const fs = require('fs')

fs.createReadStream('data.txt')
.pipe(fs.createWriteStream('data' + '4.txt'))
.on('finish', () => console.log('Done'))