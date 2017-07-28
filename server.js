const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Superhero = require('./models/Superhero')
const heroRoutes = require('./routes/superheroes')

const app = express()
let port = 3000

mongoose.connect('mongodb://localhost/superheroes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/superheroes',heroRoutes)

// SERVER
const server = app.listen(port, () => console.log(`Listening on port: ${port}`))
