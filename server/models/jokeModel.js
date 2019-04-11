const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jokeSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  joke: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
})

const Joke = mongoose.model('Joke', jokeSchema)
module.exports = Joke