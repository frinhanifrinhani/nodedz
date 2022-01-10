const fs = require('fs')

console.log('Inicio')

fs.writeFile('teste.txt','Hello', err =>{

    setTimeout( () => {
        console.log('Arquivo criado!')
    }, 1000);

})

console.log('Fim')