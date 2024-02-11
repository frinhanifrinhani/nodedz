const User = require('../models/User')
const bcrypt = require('bcrypt')
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

            res.status(201).json(
                {
                    message: "Usuário cadastrado com sucesso!",
                    createdUser
                }
            )

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error })
        }

    }
}