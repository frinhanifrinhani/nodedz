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

    console.log(`Produto: ${name}`)
    console.log(`Preço: ${price}`)

    res.json({ message: `O produto ${name} foi cadastrado com sucesso!` })
})

app.get('/', (req, res) => {
    res.json({ message: 'Primeira rota da api' })
})

app.listen(3000)