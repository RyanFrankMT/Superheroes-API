const mongoose = require('mongoose')

const SuperheroSchema = new mongoose.Schema({
  name: {type: String, required: true},
  superpower: {type: String, required: true},
  image: {type: String, required: true},
  created: {type: Date, required: true},
  modified: {type: Date, required: true}
})

SuperheroSchema.methods.loadData = function(dataIn){
  this.name = dataIn.name || this.name;
  this.superpower = dataIn.superpower || this.superpower;
  this.image = dataIn.image || this.image;
}

SuperheroSchema.methods.setMetaDates = function(){
  const postDate = new Date()

  this.created = this.created || postDate;
  this.modified = postDate;
}

module.exports = mongoose.model('Superhero',SuperheroSchema);
// The above code is how we can export and share with other
//folders within this project (i.e. use in server.js)

// 'Superhero' in the line above is the name in which we will
//continue to use to call our schema
