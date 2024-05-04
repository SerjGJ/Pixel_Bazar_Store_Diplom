const express = require('express')
const hasRole = require('../middlewares/hasRole')
const ROLES = require('../constants/roles')
const {
  getOrder,
  getOrders,
  createOrder,
  getUserOrders,
  getStatus,
  updateStatusOrder,
} = require('../controllers/order')
const authenticated = require('../middlewares/authenticated')
const mapOrder = require('../helpers/mapOrder')

const router = express.Router({ mergeParams: true })

router.get(
  '/',
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    try {
      const { search } = req.query
      const orders = await getOrders(search || '')
      res.send({ data: orders.map(mapOrder) })
    } catch (error) {
      console.error('Ошибка в эндпоинте /orders:', error)
      res.status(500).send({ error: error.message })
    }
  }
)

router.get('/status', authenticated, async (req, res) => {
  try {
    const status = getStatus()

    res.send({ data: status })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

router.patch(
  '/:id',
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    const newStatus = await updateStatusOrder(req.params.id, {
      status: req.body.statusId,
    })
    res.send({ data: mapOrder(newStatus) })
  }
)

router.get('/users/:userId', authenticated, async (req, res) => {
  try {
    const userOrders = await getUserOrders(req.params.userId)
    res.send({ data: userOrders.map(mapOrder) })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

router.get('/:id', authenticated, async (req, res) => {
  try {
    const order = await getOrder(req.params.id)
    res.send({ data: mapOrder(order) })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

router.post('/', authenticated, async (req, res) => {
  try {
    const newOrder = await createOrder(req.body)
    res.send({ data: mapOrder(newOrder) })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

module.exports = router
