// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');
const Plant = require('./src/plants/plant.model'); // pastikan path ini sesuai

dotenv.config();

async function seedPlants() {
  await mongoose.connect(process.env.DB_URL);
  console.log('✅ MongoDB connected');

  // Bersihkan koleksi sebelum seeding (optional)
  await Plant.deleteMany();
  console.log('🧹 Data lama dihapus');

  const categories = ['Hias', 'Herbal', 'Hanging', 'Indoor', 'Outdoor'];

  const plants = Array.from({ length: 30 }).map(() => ({
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: faker.helpers.arrayElement(categories),
    trending: faker.datatype.boolean(),
    coverImage: faker.image.urlPicsumPhotos({ width: 500, height: 400 }),
    oldPrice: faker.number.int({ min: 10000, max: 30000 }),
    newPrice: faker.number.int({ min: 5000, max: 25000 }),
    stock: faker.number.int({ min: 5, max: 50 }),
  }));

  await Plant.insertMany(plants);
  console.log('🌱 30 produk berhasil di-seed');

  mongoose.connection.close();
  console.log('🔌 MongoDB disconnected');
}

seedPlants().catch((err) => {
  console.error('❌ Gagal seeding:', err);
  mongoose.connection.close();
});
