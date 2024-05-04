module.exports = function (basket) {
  return {
    id: basket.id,
    userId: basket.userId,
    products: basket.products.map((product) => ({
      productId: product.productId,
      productName: product.productName,
      productPrice: product.productPrice,
      quantity: product.quantity,
    })),
  }
}
