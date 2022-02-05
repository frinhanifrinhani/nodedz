const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.engine('handlebars',exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/',(req,res) => {

    res.render('home',{layout:false})
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