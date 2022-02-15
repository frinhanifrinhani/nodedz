const { Sequelize  } = require('sequelize')

const sequelize = new Sequelize('nodemvc','root_node','1234',{
    host: 'localhost',
    dialect: 'mysql'
})

try {
    
    sequelize.authenticate()
    console.log('Conectado com MySQL')

} catch (error) {
    console.log(`Não foi possível conectar: ${error}`)
}

exports.default = sequelize