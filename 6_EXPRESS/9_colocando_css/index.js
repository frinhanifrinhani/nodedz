const express = require('express')
const app = express()
const port = 3000 // variavel de ambiente

const path = require('path')

const users = require('./users')

// lê o body
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.static('public'))

app.use(express.json())

const basePath = path.join(__dirname,'templates')

app.use('/users', users)

app.get('/', (req,res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})

