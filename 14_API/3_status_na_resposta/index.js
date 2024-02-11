const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended: true
})
)

app.use(express.json())

app.post('/create-product', (req, res) => {
    const name = req.body.name
    const price = req.body.price

    if (!name) {

        res.status(422).json({ message: 'O campo nome não foi preenchido!' })
        return
    }

    console.log(`Produto: ${name}`)
    console.log(`Preço: ${price}`)

    res.status(201).json({ message: `O produto ${name} foi cadastrado com sucesso!` })
})

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Primeira rota da api' })
})

app.listen(3000)