const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

const jwtsecret = require('./../env').jwtsecret

const checkToken = (req, res, next) => {

    if (!req.headers.authorization) {
        res.status(401).json({ message: 'Acesso negado' })
    }

    const token = getToken(req)

    if (!token) {
        res.status(401).json({ message: 'Acesso negado' })
    }

    try {
        const verified = jwt.verify(token, jwtsecret)
        req.user = verified
        next()

    } catch (error) {
        res.status(400).json({ message: 'Acesso negado' })
    }
}

module.exports = checkToken