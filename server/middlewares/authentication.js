const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
 
module.exports = {
  authentication: function(req, res, next) {
    try {
      const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
      req.authenticatedUser = decoded
      console.log('mmkmkmkm')
      
      User
      .findById(decoded.id)
      .then(user => {
        if(!user) {
          res.status(401).json('You are not registered')
        } else {
          next()
        }
      })
      .catch(err => {
        res.status(401).json(err)
      })
    }
    catch {
      res.status(401).json({
        message: 'Failed to authenticate user'
      })
    }
  }
}