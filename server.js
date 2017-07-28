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
app.use('/',express.static('public'))
app.use('/api/superheroes',heroRoutes)


//GET SINGLE HERO
app.get('/api/:hero_id', (req,res) => {
  Superhero.findById(req.params.hero_id, (err, superhero) => {
    if(err){
      res.json({ message: err, data: null })
    }
    else{
      res.json({ message: `Successfully retrieved hero: ${superhero.name}`, data: superhero })
    }
  })
})




// PUT SINGLE HERO
app.put('/api/:hero_id', (req, res) => {

  // Find our hero to update
  Superhero.findById(req.params.hero_id, (err, superhero) => {

    // If new data then change calue, else keep the same
    superhero.loadData(req.body)
    superhero.setMetaDates()
    superhero.save((err, superhero) => {
      if(err){
        res.json({ message: err, data: null})
      }
      else{
        res.json({ message: `Successfully updated hero: ${superhero.name}`, data: superhero})
      }
    })
  })
})


// DELETE SINGLE RECORD
app.delete('/api/:hero_id', (req, res) => {

  //Find hero to delete via search object
  Superhero.remove({ _id: req.params.hero_id}, (err) => {
    if(err){
      res.send({ message: err, data: null })
    }
    else{
      res.send({ message: `Superhero successfully deleted!`, data: {}})
    }
  })
})

// SERVER
const server = app.listen(port, () => console.log(`Listening on port: ${port}`))
