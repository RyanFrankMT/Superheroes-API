const express = require('express')
const Router = express.Router()
const Villain = require('../models/Villains')

// const route = Router.route('/')
// route.get(...)
// route.post(...)

Router.route('/')
  .get((req,res) => {
    Villain.find((err,villains) => {
      if(err) res.json({message: err, data: null})
      res.json({message: `Successfully retrieved all villains!`, data: villains})
    })
  })
  .post((req,res) => {
    let newVillain = new Villain()
    newVillain.loadData(req.body)
    newVillain.setMetaDates()
    newVillain.save((err,newVillain) => {
      if(err) res.json({message: err, data: null});
      res.json({message: `Successfully created new villain: ${newVillain.name}`, data: newVillain})
    })
  })

  Router.route('/:villain_id')
    .get((req,res) => {
      Villain.findById(req.params.villain_id, (err,villain) => {
        if(err) res.json({message: err, data: null})
        res.json({message: `Successfully retrieved villain: ${villain.name}`, data: villain})
      })
    })
    .put((req,res) => {
      Villain.findById(req.params.villain_id, (err,villain) => {
        villain.loadData(req.body)
        villain.setMetaDates()
        villain.save((err,villain) => {
          if(err) res.json({message: err, data: null})
          res.json({message: `Successfully updated villain: ${villain.name}`, data: villain})
        })
      })
    })
    .delete((req,res) => {
      Villain.findById(req.params.villain_id, (err,villain) => {
        Villain.remove({_id: req.params.hero_id}, (err) => {
          if(err) res.json({message: err, data: null})
          res.json({message: `Villain: ${villain.name} successfully deleted!`, data: {}})
        })
      })
    })

  module.exports = Router;
