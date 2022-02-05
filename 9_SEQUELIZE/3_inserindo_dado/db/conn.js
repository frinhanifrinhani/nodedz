const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize','root_node','1234', {
    host: 'localhost',
    dialect: 'mysql'
})

/*
try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso com o sequelize')
} catch (error) {
    console.log('Não foi possível conectar: ', error)
}
*/

module.exports = sequelize