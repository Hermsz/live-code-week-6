const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserController {

  static findAll(req, res) {
    User
      .find()
      .then(allUsers => {
        res.status(200).json(allUsers)
      })
      .catch(err => {
        console.log('Masuk Error find all user controller')
        res.status(500).json(err.message)
      })
  }

  static register(req, res) {
    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if(user) {
          res.status(401).json({
            message: 'Email already exist'
          })
        } else {
          return User
            .create({
              email: req.body.email,
              password: req.body.password
            })
        }
      })
      .then(createdUser => {
        res.status(200).json({
          message: `Successfully created User`,
          details: createdUser
        })
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static login(req, res) {
    User
      .findOne({
        email: req.body.email
      })
      .then(user => {
        if(!user) {
          res.status(401).json({
            message: `Invalid Email Address`
          })
        } else {
          const verifyPassword = bcrypt.compareSync(req.body.password, user.password)
          if(!verifyPassword) {
            res.status(401).json({
              message: `Wrong password`
            })
          } else {
            let token = jwt.sign({
              id: user._id,
              email: user.password,
            }, process.env.JWT_SECRET)
            req.headers.token = token
            res.status(200).json({
              token,
              user
            })
          }
        }
      })
      .catch(err => {
        res.status(400).json(err.message)
      })
  }  
}


module.exports = UserController