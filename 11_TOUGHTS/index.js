const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

// models
const User = require('./models/User')
const Tought = require('./models/Tought')

// import routs
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

const ToughtController = require('./controllers/ToughtController')
const AuthController = require('./controllers/AuthController')

// template engine
app.engine('handlebars',exphbs.engine())
app.set('view engine', 'handlebars')

// answare from body
app.use(
    express.urlencoded({
        extended: true
    })
)

// use json
app.use(express.json())

// session middleware
app.use(
    session({
        name: 'session',
        secret: '@ppExpress2022#',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(),'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

// flash messages
app.use(flash())

// public path
app.use(express.static('public'))

// set session to resp
app.use((req,res,next) => {

    if(req.session.userid){
        res.locals.session = req.session
    }

    next()

})

// Routes
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

app.get('/', ToughtController.showTought)

conn
    //.sync({force: true})
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err) )