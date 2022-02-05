const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine('handlebars',exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.post('/books/insertbook', (req,res)=>{
    const title = req.body.title
    const pageqty = req.body.pageqty

    const queryStr = `INSERT INTO books (title,pageqty) VALUES ('${title}','${pageqty}')`

    conn.query(queryStr,(err)=>{
        if(err){
            console.log(err)
        }

        res.redirect('/')
    })
})

app.get('/',(req,res) => {
    res.render('home')
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodedz'
})

conn.connect((err)=>{
    if(err){
        console.log('Connection error')
        return
    }

    console.log('Connected database')

    app.listen(3000)
})