const express = require('express')
const {
  getProduct,
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
} = require('../controllers/product')
const authenticated = require('../middlewares/authenticated')
const hasRole = require('../middlewares/hasRole')
const mapProduct = require('../helpers/mapProduct')
const ROLES = require('../constants/roles')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
  const { search, limit, page, sortDirection, genre, platform } = req.query
  const { products, lastPage } = await getProducts(
    search,
    limit,
    page,
    sortDirection,
    genre,
    platform
  )

  res.send({ data: { lastPage, products: products.map(mapProduct) } })
})

router.get('/:id', async (req, res) => {
  const product = await getProduct(req.params.id)

  res.send({ data: mapProduct(product) })
})

// router.use(authenticated)

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newProduct = await addProduct({
    name: req.body.name,
    content: req.body.content,
    image: req.body.imageUrl,
    genre: req.body.genre,
    price: req.body.price,
    platform: req.body.platform,
  })

  res.send({ data: mapProduct(newProduct) })
})

router.patch(
  '/:id',
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedProduct = await editProduct(req.params.id, {
      name: req.body.name,
      content: req.body.content,
      image: req.body.imageUrl,
      genre: req.body.genre,
      price: req.body.price,
      platform: req.body.platform,
    })

    res.send({ data: mapProduct(updatedProduct) })
  }
)

router.delete(
  '/:id',
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteProduct(req.params.id)

    res.send({ error: null })
  }
)

module.exports = router
