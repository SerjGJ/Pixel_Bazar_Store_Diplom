const Product = require('../models/Product')

async function addProduct(product) {
  const newProduct = await Product.create(product)

  return newProduct
}

async function editProduct(id, product) {
  const newProduct = await Product.findByIdAndUpdate(id, product, {
    returnDocument: 'after',
  })

  return newProduct
}

function deleteProduct(id) {
  return Product.deleteOne({ _id: id })
}

async function getProducts(
  search = '',
  limit = 12,
  page = 1,
  sortDirection = 'asc',
  genre = '',
  platform = ''
) {
  let sortQuery = { price: sortDirection === 'asc' ? 1 : -1 }
  let query = { name: { $regex: search, $options: 'i' } }

  if (genre) {
    query.genre = genre
  }
  if (platform) {
    query.platform = platform
  }

  const [products, count, genres, platforms] = await Promise.all([
    Product.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sortQuery),
    Product.countDocuments(query),
    Product.distinct('genre'),
    Product.distinct('platform'),
  ])

  return {
    products: products,
    lastPage: Math.ceil(count / limit),
    genres: genres,
    platforms: platforms,
  }
}

function getProduct(id) {
  return Product.findById(id)
}

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
  getProduct,
}
