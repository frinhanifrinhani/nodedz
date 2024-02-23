const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}));

// Config JSON response
app.use(express.json())

// Public folder for images
app.use(express.static('public'))

// Routes
const userRoutes = require('./routes/UserRoutes')
const petRoutes = require('./routes/PetRoutes')

app.use('/users', userRoutes)
app.use('/pets', petRoutes)

app.listen(5000)