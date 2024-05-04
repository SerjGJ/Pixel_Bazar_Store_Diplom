module.exports = function (product) {
  return {
    id: product.id,
    name: product.name,
    imageUrl: product.image,
    content: product.content,
    genre: product.genre,
    price: product.price,
    platform: product.platform,
    publishedAt: product.createdAt,
  }
}
