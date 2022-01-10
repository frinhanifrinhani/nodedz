const minimist = require('minimist')

const args = minimist(process.argv)

const nome = args['nome']
const profissao = args['profissao']
console.log(`O nome é ${nome} e a profissão é ${profissao}`)