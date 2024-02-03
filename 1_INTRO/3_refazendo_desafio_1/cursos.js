const fs = require('fs');

fs.readFile('cursos.txt', 'utf-8', (err, data) => {
    if(err)
        console.log(err)

    console.log(data)
})