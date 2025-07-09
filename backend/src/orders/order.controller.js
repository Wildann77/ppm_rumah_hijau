const mongoose = require('mongoose');

const Order = require('./order.model');

const Plant = require('../plants/plant.model');

const createAOrder = async (req, res) => {
  try {
    const { name, email, phone, address, products, totalPrice } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ message: 'Products must be an array' });
    }

    const productsWithPrice = await Promise.all(
      products.map(async (item) => {
        const product = await Plant.findById(item.productId);
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        // ✅ Cek apakah stok cukup
        if (product.stock < item.quantity) {
          throw new Error(
            `Stok ${product.title} tidak cukup (tersedia: ${product.stock})`
          );
        }

        // ✅ Kurangi stok produk
        product.stock -= item.quantity;
        await product.save();

        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.newPrice,
          title: product.title,
        };
      })
    );

    const order = await Order.create({
      name,
      email,
      phone,
      address,
      products: productsWithPrice,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('❌ Error creating order', error);
    res.status(500).json({ message: error.message });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) {
      return res.status(400).json({ message: 'Order not found' });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error Fething order', error);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    // Cari semua order, urutkan berdasarkan tanggal terbaru
    const orders = await Order.find().sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching all orders', error);
    res.status(500).json({ message: 'Failed to fetch all orders' });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, products, totalPrice, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // ✅ Jika status ingin dibatalkan dan sebelumnya belum cancelled
    if (status === 'cancelled' && existingOrder.status !== 'cancelled') {
      // Kembalikan stok produk
      for (const item of existingOrder.products) {
        const product = await Plant.findById(item.productId);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }

    // ✅ Update products jika dikirim
    let productsWithPrice = existingOrder.products;
    if (products) {
      if (!Array.isArray(products)) {
        return res.status(400).json({ message: 'Products must be an array' });
      }

      productsWithPrice = await Promise.all(
        products.map(async (item) => {
          const product = await Plant.findById(item.productId);
          if (!product) {
            throw new Error(`Product not found: ${item.productId}`);
          }
          if (product.stock < item.quantity) {
            throw new Error(
              `Stok ${product.title} tidak cukup (tersedia: ${product.stock})`
            );
          }

          return {
            productId: item.productId,
            quantity: item.quantity,
            price: product.newPrice,
            title: product.title,
          };
        })
      );
    }

    // ✅ Update field-order yang lain
    existingOrder.name = name ?? existingOrder.name;
    existingOrder.email = email ?? existingOrder.email;
    existingOrder.phone = phone ?? existingOrder.phone;
    existingOrder.address = address ?? existingOrder.address;
    existingOrder.products = productsWithPrice;
    existingOrder.totalPrice = totalPrice ?? existingOrder.totalPrice;
    if (status) existingOrder.status = status;

    const updatedOrder = await existingOrder.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('❌ Error updating order:', error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
};
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 取消订单
const cancelOrderById = async (req, res) => {
  try {
    // 获取订单ID
    const { id } = req.params;

    // 根据订单ID查找订单
    const order = await Order.findById(id);
    // 如果订单不存在，返回404错误
    if (!order) {
      return res.status(404).json({ message: 'Order tidak ditemukan' });
    }

    // 如果订单状态已经是取消，返回400错误
    if (order.status === 'cancelled') {
      return res.status(400).json({ message: 'Order sudah dibatalkan' });
    }

    // Kembalikan stok produk
    for (const item of order.products) {
      const product = await Plant.findById(item.productId);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    // Update status order menjadi cancelled
    order.status = 'cancelled';
    await order.save();

    res.json({ message: 'Order berhasil dibatalkan dan stok dikembalikan', order });
  } catch (error) {
    console.error('Error cancel order:', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order tidak ditemukan.' });
    }
    res.json({ message: 'Order berhasil dihapus.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus order.' });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail,
  getAllOrders,
  updateOrderById,
  getOrderById,
  cancelOrderById,
  deleteOrderById,
};
