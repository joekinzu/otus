const fs = require('fs')

function mergeTwo(arr1, arr2) {
  let merged = []
  let index1 = 0
  let index2 = 0
  let current = 0
  while (current < (arr1.length + arr2.length)) {
    let isArr1Depleted = index1 >= arr1.length
    let isArr2Depleted = index2 >= arr2.length
    if (!isArr1Depleted && (isArr2Depleted || (arr1[index1] < arr2[index2]))) {
    merged[current] = arr1[index1]
    index1++
    } else {
    merged[current] = arr2[index2]
    index2++
    }
    current++
  }
  return merged
  }

// number of files
const num = 5
const wstream = fs.createWriteStream('datasorted.txt')
const rstream = []
let old = []
let old1 = []

for(i=0;i<num;i++){
    rstream.push(fs.createReadStream('data'+(num-i)+'.txt',{encoding: 'utf8', fd: null,objectMode: true}))
}

rstream.map((item,index)=> {
    rstream[index].on('data', (chunk) => {
            Array.from(chunk).map((el,index) => old.push(parseInt(el)))
      })

  rstream[index].on('end', () => {
    console.log('end',old.length,old1.length)
    old1.length>0 ? old1=mergeTwo(old.sort(),old1) : old1=old.sort()
    if(index == rstream.length-1){
      wstream.write(old1.join(''))
      wstream.destroy()
    }
    old = []
  })
})
