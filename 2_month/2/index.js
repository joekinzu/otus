const fs = require("fs")
let resultJSON = { files: [], dirs: [] }
let args = process.argv.slice(2)
let pathSample = args[1]

F = async PS => {
    await fs.readdir(PS, function(err, items) {
        items.map(e => {
            let fullPatch = PS + "/" + e
            fs.statSync(fullPatch).isFile() ? resultJSON.files.push(fullPatch) : resultJSON.dirs.push(fullPatch) && F(fullPatch)
        })
    })
}

F(pathSample)
setTimeout(function(){console.log('path',resultJSON)}, 100)
