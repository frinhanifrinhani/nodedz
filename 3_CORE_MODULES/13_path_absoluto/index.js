const path = require('path')

//path absoluto
console.log(path.resolve('teste.txt'))

//formar path

const midFolder = 'relatorios'
const fileName = 'relatorio1.pdf'

const finalPath = path.join('/','arquivos',midFolder,fileName)

console.log(finalPath)