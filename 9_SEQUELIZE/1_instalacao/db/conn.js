const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize','root2','root', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso com o sequelize')
} catch (error) {
    console.log('Não foi possível conectar: ', error)
}

module.exports = sequelize