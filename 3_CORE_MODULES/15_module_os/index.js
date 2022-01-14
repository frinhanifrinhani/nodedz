const os = require('os')

console.log(os.cpus())
console.log('Memoria livre: '+os.freemem())
console.log('Home dir: '+os.homedir())
console.log('Tipo: '+os.type())