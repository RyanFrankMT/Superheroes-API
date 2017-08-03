const mongoose = require('mongoose')

const VillainSchema = new mongoose.Schema({
  name: {type: String, required: true},
  power: {type: String, required: true},
  image: {type: String, required: true},
  created: {type: Date, required: true},
  modified: {type: Date, required: true}
})

VillainSchema.methods.loadData = function(dataIn){
  this.name =  dataIn.name || this.name;
  this.power = dataIn.power || this.power;
  this.image = dataIn.image || this.image;
}

VillainSchema.methods.setMetaDates = function(){
  const postDate = new Date()

  this.created = this.created || postDate;
  this.modified = postDate;
}

module.exports = mongoose.model('Villain', VillainSchema);
