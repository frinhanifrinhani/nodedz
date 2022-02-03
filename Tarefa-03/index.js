const express = require('express')
const app = express()
const port = 5000

const path = require('path')

const clients = require('./clients')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.static('public'))

app.use(express.json())

const basePath = path.join(__dirname, '/templates')

app.use('/clients', clients)

app.get('/', (req,res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.use((req,res,next) => {
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
