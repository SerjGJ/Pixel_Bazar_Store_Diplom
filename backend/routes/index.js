const express = require('express')

const router = express.Router({ mergeParams: true })

router.use('/', require('./auth'))
router.use('/products', require('./product'))
router.use('/users', require('./user'))
router.use('/baskets', require('./basket'))
router.use('/orders', require('./order'))
router.use('/genres', require('./genre'))
router.use('/platforms', require('./platform'))

module.exports = router
