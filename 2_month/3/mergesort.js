const fs = require('fs');
const file1 = 'data3.txt';
const file2 = 'data4.txt';
const stream = fs.createReadStream(file1, { highWaterMark: 1});
const stream2 = fs.createReadStream(file2, { highWaterMark: 1});
const fileData1 = [];
const fileData2 = [];
let j = 0


const file1Promise = new Promise((resolve) => {
  stream.on('data', (chunk) => {
    fileData1.push(chunk)
  })
  stream.on('end', () => {
    console.log('end')
    resolve(fileData1)
  }) 
})

const file2Promise = new Promise((resolve) => {
  stream2.on('data', (chunk) => {
    fileData2.push(chunk)
  })
  stream2.on('end', () => {
    console.log('end')
    resolve(fileData2)
  }) 
})

Promise.all([
  file1Promise,
  file2Promise,
]).then(() => {
      const fileData3 = []
      console.log(fileData1.length)
        let index1 = 0
        let index2 = 0
        while(j < (fileData1.length+fileData2.length)){
          let isArr1Depleted = index1 >= fileData1.length;
          let isArr2Depleted = index2 >= fileData2.length;
          // if next comes from arr1
          if (!isArr1Depleted && (isArr2Depleted || (fileData1[index1] < fileData2[index2]))) {
            fileData3[j] = fileData1[index1];
            index1++;
          // if next comes from arr2
          } else {
            fileData3[j] = fileData2[index2];
            index2++;
          }
          j++
        }

      const writableStream = fs.createWriteStream('datasorted.txt')
      writableStream.on('finish', function() {
        console.log('DONE!')
      })
      fileData3.forEach((data) => {
        console.log(data.toString())
        writableStream.write(data)
      })
      writableStream.end()
    })
