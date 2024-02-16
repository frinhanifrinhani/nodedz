const jwt = require('jsonwebtoken')
const jwtsecret = require('./../env').jwtsecret


const createUserToken = async (user, req, res) => {

    // create token
    const token = jwt.sign(
        {
            name: user.name,
            id: user.id,
        },
        jwtsecret // secret 
    )

    // return token
    res.status(200).json({
        message: 'Você está autenticado!',
        token: token,
        userId: user.id
    })
}

module.exports = createUserToken