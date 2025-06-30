const cron = require('node-cron');
const Order = require('../orders/order.model');
const Plant = require('../plants/plant.model');

// Jalankan setiap 5 menit
cron.schedule('*/5 * * * *', async () => {
  console.log('⏰ Menjalankan cron job: auto-cancel expired orders');

  const cutoff = new Date(Date.now() - 60 * 60 * 1000);

  // 1 jam lalu

  const expiredOrders = await Order.find({
    status: 'pending',
    createdAt: { $lt: cutoff },
  });

  for (const order of expiredOrders) {
    // Kembalikan stok produk
    for (const item of order.products) {
      const product = await Plant.findById(item.productId);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    // Ubah status jadi cancelled
    order.status = 'cancelled';
    await order.save();

    console.log(`✅ Order ${order._id} dibatalkan otomatis dan stok dikembalikan`);
  }
});
