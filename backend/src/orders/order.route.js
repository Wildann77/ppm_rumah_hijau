const express = require('express');
const {
  createAOrder,
  getOrderByEmail,
  getAllOrders,
  updateOrderById,
  getOrderById,
  cancelOrderById,
  deleteOrderById,
} = require('./order.controller');
const router = express.Router();

// create order endpoint
router.post('/', createAOrder);

//  get orders by email adress
router.get('/email/:email', getOrderByEmail);
module.exports = router;

// route get all orders
router.get('/', getAllOrders);

router.get('/:id', getOrderById);

router.put('/:id', updateOrderById);

router.delete('/:id', deleteOrderById);


// <-- endpoint update order by idrouter.put('/:id', updateOrderById); // <-- endpoint update order by id
