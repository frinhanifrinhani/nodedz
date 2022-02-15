const express = require('express')
const exphbs = require('express-handlebars')
const TaskController = require('./controllers/TaskController')

const app = express()

const conn = require('./db/conn')

const task = require('./models/Task')

const tasksRoutes = require('./routes/tasksRouts')

app.engine('handlebars',exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.static('public'))

app.use('/tasks', tasksRoutes)

conn
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((error) => console.log(error));