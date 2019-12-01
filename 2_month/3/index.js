// Этап 1 
const fs = require('fs')

function merge_sort(left_part,right_part) 
{
	let i = 0;
	let j = 0;
	let results = [];

	while (i < left_part.length || j < right_part.length) {
		if (i === left_part.length) {
			// j is the only index left_part
			results.push(right_part[j]);
			j++;
		} 
      else if (j === right_part.length || left_part[i] <= right_part[j]) {
			results.push(left_part[i]);
			i++;
		} else {
			results.push(right_part[j]);
			j++;
		}
	}
	return results;
}


const num = 5
const wstream = fs.createWriteStream('datasorted.txt')
const rstream = []
let old = []
let old1 = [];

[...Array(num)].map((item,index) => {
    rstream.push(fs.createReadStream('data'+(num-index)+'.txt',{encoding: 'utf8', fd: null,}))
})

rstream.map((item,index)=> {
    rstream[index].on('readable', (chunk) => {
        while(chunk = rstream[index].read(100)){
            // console.log(chunk,'CHHH')
            // console.log(Array.from(chunk))
            // old.push(parseInt(chunk))
            Array.from(chunk).map((el,index) => old.push(parseInt(el)))
        }
        // console.log(old)
      })

    rstream[index].on('end', () => {
        console.log('end',old.length)
        // old1 = merge_sort(old,old1)
        wstream.write(old.sort().join(''))
        // old1 = old
        old = []
    })
})

// stream2.on('readable', (chunk) => {
//     while(chunk = stream2.read(1)){
//         // console.log(chunk)
//         old1.push(parseInt(chunk))
//     }
//     // console.log(old1)
//   })
// console.log(old1.length)

// stream2.on('end', () => {
//     console.log('end',old1.length)
//     old1=merge_sort(old,old1)
//     wstream.write(old1.sort().join(''))
// })