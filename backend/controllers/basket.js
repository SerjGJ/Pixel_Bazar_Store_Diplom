const Basket = require('../models/Basket')

async function createBasket(data) {
  const newBasket = new Basket(data)
  try {
    const savedBasket = await newBasket.save()
    return savedBasket
  } catch (err) {
    throw new Error('Ошибка при создании корзины')
  }
}

async function updateBasket(id, productData) {
  try {
    const basket = await Basket.findById(id)

    if (!basket) {
      throw new Error('Корзина не найдена')
    }

    const existingProductIndex = basket.products.findIndex(
      (product) => product.productId === productData.productId
    )

    if (existingProductIndex !== -1) {
      basket.products[existingProductIndex].quantity = productData.quantity || 1
    } else {
      basket.products.push({
        productId: productData.productId,
        productName: productData.productName,
        productPrice: productData.productPrice,
        quantity: productData.quantity || 1,
      })
    }

    const updatedBasket = await basket.save()

    return updatedBasket
  } catch (err) {
    throw new Error('Ошибка при обновлении корзины')
  }
}

async function deleteBasket(id) {
  try {
    await Basket.findByIdAndDelete(id)
  } catch (err) {
    throw new Error('Ошибка при удалении корзины')
  }
}

async function getUserBasket(userId) {
  try {
    const basket = await Basket.findOne({ userId: userId })
    return basket
  } catch (error) {
    throw new Error('Ошибка при получении корзины пользователя')
  }
}

async function getBaskets() {
  try {
    const baskets = await Basket.find()
    return baskets
  } catch (error) {
    throw new Error('Ошибка при получении списка корзин')
  }
}

async function removeProductFromBasket(basketId, productId) {
  try {
    const basket = await Basket.findById(basketId)
    if (!basket) {
      throw new Error('Корзина не найдена')
    }

    basket.products = basket.products.filter(
      (product) => product.productId !== productId
    )

    await basket.save()

    return basket
  } catch (error) {
    throw new Error('Ошибка при удалении товара из корзины')
  }
}

const clearBasket = async (userId) => {
  try {
    const basket = await Basket.findOneAndUpdate(
      { userId },
      { $set: { products: [] } },
      { new: true }
    )

    if (!basket) {
      throw new Error('Корзина не найдена')
    }

    return basket
  } catch (error) {
    throw new Error('Ошибка при очистке корзины')
  }
}

module.exports = {
  createBasket: createBasket,
  updateBasket: updateBasket,
  deleteBasket: deleteBasket,
  getUserBasket: getUserBasket,
  getBaskets: getBaskets,
  removeProductFromBasket: removeProductFromBasket,
  clearBasket: clearBasket,
}
