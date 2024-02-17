const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const jwtsecret = require('./../env').jwtsecret

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {

    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body

        // validations
        if (!name) {
            res.status(422).json({ message: 'O campo nome precisa ser preenchido!' })
            return
        }

        if (!email) {
            res.status(422).json({ message: 'O campo email precisa ser preenchido!' })
            return
        }

        if (!phone) {
            res.status(422).json({ message: 'O campo phone precisa ser preenchido!' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'O campo password precisa ser preenchido!' })
            return
        }

        if (!confirmpassword) {
            res.status(422).json({ message: 'O campo confirmpassword precisa ser preenchido!' })
            return
        }

        if (password !== confirmpassword) {
            res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser identicos!' })
            return
        }

        // check if user exists
        const userExists = await User.findOne({ email: email })

        if (userExists) {
            res.status(409).json({ message: 'Este email já está sendo útilizado, tente outro email!' })
        }

        // password encrypt
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // create user
        const user = new User({
            name, email, phone, password: passwordHash
        })

        try {
            const createdUser = await user.save()
            await createUserToken(createdUser, req, res);

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }

    }

    static async login(req, res) {
        const { email, password } = req.body

        if (!email) {
            res.status(422).json({ message: 'O campo email precisa ser preenchido!' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'O campo senha precisa ser preenchido!' })
            return
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado!' })
            return
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(401).json({ message: 'A senha está incorreta. Por favor, verifique suas credenciais e tente novamente.' })
            return
        }

        await createUserToken(user, req, res);
    }

    static async checkUser(req, res) {
        let currentUser

        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, jwtsecret)

            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined

        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = req.params.id

        const user = await User.findById(id).select('-password')

        if (!user) {
            res.status(401).json({ message: 'Usuário não encontrado' })
            return
        }

        res.status(200).json({ user })

    }

    static async editUser(req, res) {

        const token = getToken(req)
        const user = await getUserByToken(token)

        const { name, email, phone, password, confirmpassword } = req.body

        if (req.file) {
            user.image = req.file.filename
        }

        // validations
        if (!name) {
            res.status(422).json({ message: 'O campo nome precisa ser preenchido!' })
            return
        }

        user.name = name

        if (!email) {
            res.status(422).json({ message: 'O campo email precisa ser preenchido!' })
            return
        }

        const userExists = await User.findOne({ email: email })

        if (user.email !== email && userExists) {
            res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
            return
        }

        user.email = email

        if (!phone) {
            res.status(422).json({ message: 'O campo phone precisa ser preenchido!' })
            return
        }

        user.phone = phone

        if (password !== confirmpassword) {
            res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser identicos!' })
            return
        } else if (password === confirmpassword && password !== null) {
            // password encrypt
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        try {
            const updateUser = await User.findOneAndUpdate(
                { _id: user.id },
                { $set: user },
                { new: true }
            )

            res.status(200).json({
                message: "Usuário atualizado com sucesso"
            })

        } catch (error) {
            res.status(500).json({ message: error })
        }


    }
}