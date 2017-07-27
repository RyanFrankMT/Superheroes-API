const mongoose = require('mongoose')

const SuperheroSchema = new mongoose.Schema({
  name: String,
  superpower: String,
  image: String,
})

module.exports = mongoose.model('Superhero',SuperheroSchema);
// The above code is how we can export and share with other
//folders within this project

// 'Superhero' in the line above is the name in which we will
//continue to use to call our schema
