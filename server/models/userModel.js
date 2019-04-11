const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/hashPassword')

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function(next) {
  if(this.password) {
    this.password = hashPassword(this.password)
  }
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User