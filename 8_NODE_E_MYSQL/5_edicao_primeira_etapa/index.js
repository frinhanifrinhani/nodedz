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
            return
        }

        res.redirect('/books')
    })
})

app.get('/books', (req,res) => {
    
    const queryStr = 'SELECT * FROM books'

    conn.query(queryStr,(err, data)=>{
        if(err){
            console.log(err)
            return
        }

        const books = data
        res.render('books',{books})

    })

})

app.get('/book/:id', (req,res) => {

    const id = req.params.id 

    const queryStr = `SELECT * FROM books WHERE id = ${id}`

    conn.query(queryStr,(err, data) => {
        if(err){
            console.log(err)
            return
        }

        const book = data[0]
        res.render('book',{ book })
    })
})

app.get('/book/editar/:id', (req,res) => {

    const id = req.params.id
    const queryStr = `SELECT * FROM books WHERE id = ${id}`

    conn.query(queryStr, (err, data) => {
        if(err){
            console.log(err)
            return
        }

        const book = data[0]
        res.render('editbook',{book})
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