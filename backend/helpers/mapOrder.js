module.exports = function (order) {
  return {
    id: order.id,
    userId: order.userId,
    name: order.name,
    email: order.email,
    comment: order.comment,
    statusId: order.status,
    products: order.products.map((product) => ({
      productId: product.productId,
      productName: product.productName,
      productPrice: product.productPrice,
      quantity: product.quantity,
    })),
  }
}
