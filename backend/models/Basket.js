const mongoose = require('mongoose')

const BasketSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        productName: { type: String },
        productPrice: { type: Number },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
)
BasketSchema.methods.clearProducts = function () {
  this.products = []
  return this.save()
}

const Basket = mongoose.model('Basket', BasketSchema)

module.exports = Basket
