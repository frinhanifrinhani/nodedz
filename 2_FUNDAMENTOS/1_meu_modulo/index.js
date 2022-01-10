const meuModule = require('./meu_modulo')
const soma = meuModule.soma

// chamada direta
meuModule.soma(2,2)

// chamada pela nova constante
soma(5,10)