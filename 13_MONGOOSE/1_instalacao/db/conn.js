const mongoose = require('mongoose')
// const uri = "mongodb://localhost:27017/mongo_node"

async function main() {
    await mongoose.connect('mongodb://localhost:27017/mongo_node')
    console.log('Conectado com Mongoose')
}

main().catch((err) => console.log(err))

module.exports = mongoose