const express = require('express')
const {
  createBasket,
  updateBasket,
  deleteBasket,
  getUserBasket,
  getBaskets,
  removeProductFromBasket,
  clearBasket,
} = require('../controllers/basket')
const mapBasket = require('../helpers/mapBasket')

const router = express.Router({ mergeParams: true })

router.post('/', async (req, res) => {
  try {
    const savedBasket = await createBasket(req.body)
    res.status(201).json(mapBasket(savedBasket))
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const updatedBasket = await updateBasket(req.params.id, req.body)

    res.send({ data: mapBasket(updatedBasket) })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await deleteBasket(req.params.id)
    res.status(200).json({ message: 'Cart is deleted successfully.' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/:userId/products', async (req, res) => {
  try {
    const { userId } = req.params

    const basket = await clearBasket(userId)

    res.status(200).json(basket)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:userId', async (req, res) => {
  try {
    const basket = await getUserBasket(req.params.userId)
    if (basket) {
      res.status(200).json(mapBasket(basket))
    } else {
      res.status(404).json({ error: 'Корзина не найдена' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const baskets = await getBaskets()
    res.send({ data: baskets.map(mapBasket) })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/:basketId/products/:productId', async (req, res) => {
  try {
    const basketProductDelete = await removeProductFromBasket(
      req.params.basketId,
      req.params.productId
    )
    res.send({ data: mapBasket(basketProductDelete) })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

module.exports = router
