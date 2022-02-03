const express = require('express')
const router = express.Router()

const path = require('path')
const basePath = path.join(__dirname,'/views')

router.get('/add', (req,res) => {
    res.sendFile(`${basePath}/add-client.html`)
})

router.post('/save', (req,res) => {

    const name = req.body.name
    const phone = req.body.phone
    const email = req.body.email

    console.log(`Cliente cadastrado-> nome: ${name} telefone: ${phone} email: ${email}`)

    res.sendFile(`${basePath}/add-client.html`)
})


module.exports = router