const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const course = require('./course')

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static('public'))

//rotas para curso
app.use('/course', course)
app.use('/courses', course)

app.get('/',(req,res) => {

    res.render('home')
})

app.use((req,res,next) => {
    res.status(404).render('404')
})

app.listen(5000,()=>{
    console.log('App is running')
})