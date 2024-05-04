const Order = require('../models/Order')
const STATUS = require('../constants/status')

async function createOrder(data) {
  const newOrder = new Order(data)
  try {
    const savedOrder = await newOrder.save()
    return savedOrder
  } catch (err) {
    throw new Error('Ошибка при создании заказа')
  }
}

async function getOrder(id) {
  try {
    const order = await Order.findById(id)
    return order
  } catch (err) {
    throw new Error('Ошибка при получении заказа')
  }
}

async function getOrders(search = '') {
  const query = { name: { $regex: search, $options: 'i' } }
  try {
    const orders = await Order.find(query)
    return orders
  } catch (error) {
    throw new Error('Ошибка при получении списка заказов')
  }
}

async function getUserOrders(userId) {
  try {
    const orders = await Order.find({ userId: userId })
    return orders
  } catch (error) {
    throw new Error('Ошибка при получении заказов пользователя')
  }
}

function getStatus() {
  return [
    { id: STATUS.NEW, name: 'Новый' },
    { id: STATUS.INPROGRESS, name: 'В Процессе' },
    { id: STATUS.COMPLETED, name: 'Завершен' },
  ]
}

function updateStatusOrder(id, orderData) {
  return Order.findByIdAndUpdate(id, orderData, { returnDocument: 'after' })
}

async function deleteOrdersByUserId(userId) {
  try {
    await Order.deleteMany({ userId: userId })
  } catch (error) {
    throw new Error('Ошибка при удалении заказов пользователя')
  }
}

module.exports = {
  createOrder: createOrder,
  getOrder: getOrder,
  getOrders: getOrders,
  getUserOrders: getUserOrders,
  getStatus: getStatus,
  updateStatusOrder: updateStatusOrder,
  deleteOrdersByUserId: deleteOrdersByUserId,
}
