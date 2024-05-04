const mongoose = require('mongoose')
const status = require('../constants/status')

const OrderSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    status: {
      type: Number,
      default: status.NEW,
    },
    products: [
      {
        productId: String,
        productName: String,
        productPrice: Number,
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order
