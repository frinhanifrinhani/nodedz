const fs = require('fs')

fs.readFile('dados.txt','utf8',(err,data) => {

    if(err)
        return err

    console.log(data)
})