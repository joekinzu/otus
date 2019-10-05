// промисы
var fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
}
    
var fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
})

var fn3 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(99), 100)
})

// функция перемножения
const reducef = (memo, value) => {
    console.log('reduce')
    return memo*value
}

// решение
const promiseReduce =  async (asyncFunctions, reduce, initialValue) => {
    let result = initialValue;
    for (let func of asyncFunctions) {
        pr = await func()
        console.log('promise resolve result: ',pr)
        result = reduce(result, pr)
    }
    return result;
}

promiseReduce([fn1,fn2,fn3],reducef,5).then(console.log);
