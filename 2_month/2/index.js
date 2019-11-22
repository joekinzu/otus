const fs = require("fs")
let args = process.argv.slice(2)
let pathSample = args[1]
let resultJSON = { files: [], dirs: [] }

F = PS => {
    return new Promise((resolve) => {
      fs.readdir(PS, function(err, items) {
          items.map(e => {
              let fullPatch = PS + "/" + e
              fs.statSync(fullPatch).isFile() ? resultJSON.files.push(fullPatch) : resultJSON.dirs.push(fullPatch) && F(fullPatch)
          })
      })
      setTimeout(() => resolve(resultJSON), 100)
    })
}

F(pathSample).then(res => console.log(res))
