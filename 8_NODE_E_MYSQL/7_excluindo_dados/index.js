const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

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

    pool.query(queryStr,(err)=>{
        if(err){
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

app.get('/books', (req,res) => {
    
    const queryStr = 'SELECT * FROM books'

    pool.query(queryStr,(err, data)=>{
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

    pool.query(queryStr,(err, data) => {
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

    pool.query(queryStr, (err, data) => {
        if(err){
            console.log(err)
            return
        }

        const book = data[0]
        res.render('editbook',{book})
    })
})

app.post('/book/updatebook', (req,res) => {

    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const queryStr = `UPDATE books SET title='${title}', pageqty=${pageqty} WHERE id=${id}`

    pool.query(queryStr, (err,data) => {
        if(err){
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

app.post('/book/remove/:id',(req,res) => {

    const id = req.params.id

    const queryStr = `DELETE FROM books WHERE id = ${id}`

    pool.query(queryStr, (err,data) => {
        if(err){
            console.log(err)
            return
        }

        res.redirect('/books')
    })
})

app.get('/',(req,res) => {
    res.render('home')
})

app.listen(3000)