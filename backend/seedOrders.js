const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');
const Plant = require('./src/plants/plant.model');
const Order = require('./src/orders/order.model'); // sesuaikan path bila beda

dotenv.config();

async function seedOrders() {
  await mongoose.connect(process.env.DB_URL);
  console.log('✅ MongoDB connected');

  // Ambil semua produk yang sudah ada
  const plants = await Plant.find();
  if (plants.length === 0) {
    console.log('❌ Tidak ada data tanaman. Jalankan seedPlants dulu.');
    process.exit();
  }

  // Kosongkan orders lama
  await Order.deleteMany();
  console.log('🧹 Order lama dihapus');

  const orders = [];

  for (let i = 0; i < 15; i++) {
    const numberOfProducts = faker.number.int({ min: 1, max: 4 });

    const selectedProducts = faker.helpers.arrayElements(plants, numberOfProducts);

    const products = selectedProducts.map((plant) => {
      const quantity = faker.number.int({ min: 1, max: 5 });
      return {
        productId: plant._id,
        title: plant.title,
        quantity,
        price: plant.newPrice,
      };
    });

    const totalPrice = products.reduce((sum, p) => sum + p.quantity * p.price, 0);

    const order = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number('08##########'),
      address: {
        street: faker.location.streetAddress(),
        kelurahan: faker.location.city(),
        kecamatan: faker.location.city(),
        city: faker.location.city(),
        province: faker.location.state(),
        zipcode: faker.location.zipCode('#####'),
      },
      products,
      status: faker.helpers.arrayElement([
        'pending',
        'confirmed',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
      ]),
      totalPrice,
    };

    orders.push(order);
  }

  await Order.insertMany(orders);
  console.log(`📦 ${orders.length} order berhasil di-seed`);

  mongoose.connection.close();
  console.log('🔌 MongoDB disconnected');
}

seedOrders().catch((err) => {
  console.error('❌ Gagal seeding:', err);
  mongoose.connection.close();
});
