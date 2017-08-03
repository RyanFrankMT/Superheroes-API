const express = require('express')
const Router = express.Router()
const Superhero = require('../models/Superhero')

Router.route('/')
  .get((req,res) => {
    Superhero.find((err,superheroes) => {
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

Router.route('/:hero_id')
  .get((req,res) => {
    Superhero.findById(req.params.hero_id, (err,superhero) => {
      if(err) res.json({message: err, data: null})
      res.json({message: `Successfully retrieved hero: ${superhero.name}`, data: superhero})
    })
  })
  .put((req,res) => {
    Superhero.findById(req.params.hero_id, (err,superhero) => {
      superhero.loadData(req.body)
      superhero.setMetaDates()
      superhero.save((err, superhero) => {
        if(err) res.json({message: err, data: null})
        res.json({message: `Successfully updated hero: ${superhero.name}`, data: superhero})
      })
    })
  })
  .delete((req,res) => {
    Superhero.findById(req.params.hero_id, (err,superhero) => {
      Superhero.remove({_id: req.params.hero_id}, (err) =>{
        if(err) res.json({message: err, data: null})
        res.json({message: `Superhero: ${superhero.name} successfully deleted!`, data: {}})
      })
    })
  })

module.exports = Router;
