const express = require('express')
const Router = express.Router()
const Superhero = require('../models/Superhero')

Router.route('/')
  .get((req,res) => {
    Superhero.find((err, superheroes) => {
      // Inline if(err)
      if(err) res.json({message: err, data: null})
      //else
      res.json({message: `Successfully retrieved all heroes!`, data: superheroes})
    })
  })
.post((req,res) => {
  // Create a new, blank hero
  let newHero = new Superhero()
  newHero.loadData(req.body)
  newHero.setMetaDates()
  newHero.save((err, newHero) => {
    if(err) res.json({message: err, data: null});
    res.json({message: `Successfully created new hero: ${newHero.name}`, data: newHero})
  })
})

module.exports = Router;
