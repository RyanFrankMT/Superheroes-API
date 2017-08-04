process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const Superhero = require('../models/Superhero')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()

chai.use(chaiHttp)

describe('Superheroes', () => {
  beforeEach((done) => {
    Superhero.remove({}, (err) => {
      done();
    })
  })

  // Test the GET route
  describe('/GET superheroes', () => {
    it(`it should GET all the superheroes`, (done) => {
      chai.request(server)
        .get('/api/superheroes')
        .end((err,res) => {
          res.should.have.status(200)
          res.body.data.should.be.a('array')
          res.body.data.length.should.be.eql(0)
          done()
        })
    })
  })

  describe('/POST superhero', () => {
    it(`it should not POST a superhero without all fields`, (done) => {
      const hero = {
        name: 'Iron Man'
      }
      chai.request(server)
        .post('/api/superheroes')
        .send(hero)
        .end((err,res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.message.should.have.property('errors')
          res.body.should.have.property('data')
          res.body.should.have.property('data').eql(null)
          done()
        })
    })

    it(`it should POST a superhero with all dates and fields`, (done) => {
      const hero = {
        name: 'Iron Man',
        superpower: 'Lasers',
        image: 'n/a'
      }
      chai.request(server)
        .post('/api/superheroes')
        .send(hero)
        .end((err,res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message')
          res.body.message.length.should.be.above(0)
          res.body.should.have.property('data')
          res.body.data.should.be.a('object')
          res.body.data.should.have.property('name')
          res.body.data.should.have.property('superpower')
          res.body.data.should.have.property('image')
          res.body.data.should.have.property('created')
          res.body.data.should.have.property('modified')
          done()
        })
    })
  })

  describe('/GET/:id superhero', () => {
    it(`it should GET a superhero by the given id`, (done) =>{
      const created = new Date()
      const hero = new Superhero({ name: "Spiderman", superpower: "Web Slinging", image: 'n/a', modified: created, created: created})
      hero.save((err,hero) => {
        chai.request(server)
          .get(`/api/superheroes/${hero._id}`)
          .end((err,res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message')
            res.body.message.length.should.be.above(0)
            res.body.should.have.property('data')
            res.body.data.should.be.a('object')
            res.body.data.should.have.property('name')
            res.body.data.should.have.property('superpower')
            res.body.data.should.have.property('image')
            res.body.data.should.have.property('created')
            res.body.data.should.have.property('modified')
            done()
          })
      })
    })
  })

  describe('/PUT/:id superhero', () => {
    it(`it should UPDATE a superhero by the given id`, (done) => {
      const created = new Date()
      const hero = new Superhero({ name: 'Hulk', superpower: 'Incredible Jorts', image: 'n/a', modified: created, created: created})
      hero.save((err,hero) => {
        chai.request(server)
          .put(`/api/superheroes/${hero._id}`)
          .send({superpower: 'strength'})
          .end((err,res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message')
            res.body.message.length.should.be.above(0)
            res.body.should.have.property('data')
            res.body.data.should.be.a('object')
            res.body.data.should.have.property('name')
            res.body.data.should.have.property('superpower')
            res.body.data.should.have.property('image')
            res.body.data.should.have.property('created')
            res.body.data.should.have.property('modified')
            res.body.data.should.have.property('superpower').eql('strength')
            done()
          })
      })
    })
  })

  describe('/DELETE/:id superhero', () => {
    it(`it should DELETE a superhero by the given id`, (done) => {
      const created = new Date()
      const hero = new Superhero({ name: 'Hulk', superpower: 'Incredible Jorts', image: 'n/a', modified: created, created: created})
      hero.save((err,hero) => {
        chai.request(server)
          .delete(`/api/superheroes/${hero._id}`)
          .end((err,res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('message')
            res.body.should.have.property('data')
            res.body.should.have.property('data').eql({})
            done()
          })
      })
    })
  })
})
