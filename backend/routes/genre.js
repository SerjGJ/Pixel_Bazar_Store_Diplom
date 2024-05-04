const express = require('express')
const Product = require('../models/Product')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
  try {
    const genres = await Product.distinct('genre')
    res.json({ genres })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router
