const express = require('express')
const cors = require('cors')

const app = express()

// Config JSON response
app.use(express.json())

// Solve CORS
app.use(cors({ credentials: true, origin: 'http:localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

// Routes
const userRoutes = require('./routes/UserRoutes')
const petRoutes = require('./routes/PetRoutes')

app.use('/users', userRoutes)
app.use('/pets', petRoutes)

app.listen(5000)