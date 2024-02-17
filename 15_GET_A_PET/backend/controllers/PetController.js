const Pet = require('../models/Pet')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class PetController {

    static async create(req, res) {

        const { name, age, weight, color } = req.body
        const images = req.files

        const available = true

        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' })
            return
        }

        if (!age) {
            res.status(422).json({ message: 'A idade é obrigatório' })
            return
        }

        if (!weight) {
            res.status(422).json({ message: 'O peso é obrigatório' })
            return
        }

        if (!color) {
            res.status(422).json({ message: 'A cor é obrigatório' })
            return
        }

        if (!images || images.length === 0) {
            res.status(422).json({ message: 'A imagem é obrigatório' })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user.id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save()
            res.status(200).json({
                message: 'Pet Cadastrado com sucesso',
                newPet
            })

        } catch (error) {
            res.status(500).json({ message: error })
        }

    }
}
