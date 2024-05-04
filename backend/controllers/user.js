const bcrypt = require('bcrypt')
const User = require('../models/User')
const { generate } = require('../helpers/token')
const ROLES = require('../constants/roles')
const Basket = require('../models/Basket')
const { createBasket, deleteBasket } = require('./basket')
const { deleteOrdersByUserId } = require('./order')
const Order = require('../models/Order')

async function register(login, password) {
  if (!password) {
    throw new Error('Password is empty')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await User.create({ login, password: passwordHash })
  const token = generate({ id: user.id })

  await createBasket({ userId: user.id, products: [] })

  return { user, token }
}

async function login(login, password) {
  const user = await User.findOne({ login })

  if (!user) {
    throw new Error('User not found')
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) {
    throw new Error('Wrong password')
  }

  const token = generate({ id: user.id })

  return { token, user }
}

function getUsers() {
  return User.find()
}

function getRoles() {
  return [
    { id: ROLES.ADMIN, name: 'Админ' },
    { id: ROLES.MODERATOR, name: 'Модератор' },
    { id: ROLES.USER, name: 'Пользователь' },
  ]
}

async function deleteUser(id) {
  try {
    await User.deleteOne({ _id: id })

    const userBasket = await Basket.findOne({ userId: id })
    if (userBasket) {
      await deleteBasket(userBasket._id)
    }
    await deleteOrdersByUserId(id)
  } catch (err) {
    throw new Error('Ошибка при удалении пользователя')
  }
}

function updateUser(id, userData) {
  return User.findByIdAndUpdate(id, userData, { returnDocument: 'after' })
}

module.exports = {
  register,
  login,
  getUsers,
  getRoles,
  deleteUser,
  updateUser,
}
