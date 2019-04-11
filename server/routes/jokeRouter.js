const router = require('express').Router()
const jokeController = require('../controllers/jokesController')
const { authentication } = require('../middlewares/authentication')

router.use(authentication)
router.get('/', jokeController.fetchJoke)

module.exports = router