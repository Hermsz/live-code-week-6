const router = require('express').Router()
const user = require('./usersRoute')
const joke = require('./jokeRouter')

router.use('/', user)
router.use('/jokes', joke)

module.exports = router