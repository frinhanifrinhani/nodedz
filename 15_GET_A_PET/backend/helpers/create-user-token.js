const jwt = require('jsonwebtoken')

const createUserToken = async (user, req, res) => {

    // create token
    const token = jwt.sign(
        {
            name: user.name,
            id: user.id,
        },
        '0G0uxU9NRA+wA&7' // secret 
    )

    // return token
    res.status(200).json({
        message: 'Você está autenticado!',
        token: token,
        userId: user.id
    })
}

module.exports = createUserToken