let fs = require('fs')
let path = require('path')
let results = {files:[], dirs: []}

const dirList = async (dir, done) => {
    await fs.readdir(dir, (err, itemList) => {
        let itemsForProcess = itemList.length

        if (!itemsForProcess) {
            return done(null, results)
        }

        itemList.forEach((file) => {
            file = path.resolve(dir, file)
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    results.dirs.push(file)
                    dirList(file, (err, res) => {
                        if (err) {
                            return done(err)
                        }
                        results.dirs = results.dirs.concat(res.dirs)
                        results.files = results.files.concat(res.files)
                        if (!--itemsForProcess) {
                            done(null, results)
                        }
                    })
                } else {
                    results.files.push(file)
                    --itemsForProcess
                    if (!itemsForProcess) {
                        done(null, results)
                    }
                }
            })
        })
    })
}

dirList(__dirname,)
console.log(results)  