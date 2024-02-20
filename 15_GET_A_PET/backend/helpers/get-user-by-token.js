const jwt = require('jsonwebtoken')
const User = require('./../models/User')

const jwtsecret = require('./../env').jwtsecret

const getUserByToken = async (token) => {
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado' })
    }

    const decoded = jwt.verify(token, jwtsecret)

    const userId = decoded.id

    const user = await User.findOne({ _id: userId })

    return user
}

module.exports = getUserByToken