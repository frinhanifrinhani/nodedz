const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const task = require('./models/Task')

app.engine('handlebars',exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.static('public'))

//app.listen(3000)

conn
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((error) => console.log(error));