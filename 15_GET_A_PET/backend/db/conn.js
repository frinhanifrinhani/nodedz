const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/getapet')
    console.log('Conectado com o MongoDb!')
}

main().catch((err) => {
    console.log(`Erro ao conectar como MongoDb |>>> ${err}`)
})

module.exports = mongoose