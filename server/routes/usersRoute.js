const router = require('express').Router()
const usersController = require('../controllers/usersController')
const { authentication } = require('../middlewares/authentication')


router.get('/', usersController.findAll)
router.post('/register', usersController.register)
router.post('/login', usersController.login)

router.use(authentication)

module.exports = router