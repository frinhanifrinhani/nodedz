const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/node-mongoose')
    console.log('Conectado ao MongoDB com Mongoose')
}

main().catch((err) => {
    console.log('Erro ao conectar ao MogoDB |>>> ' + err)
})

module.exports = mongoose