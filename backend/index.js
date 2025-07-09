const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./src/cron/autoCancelOrders');

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://ppm-rumah-hijau.vercel.app'],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Routes
const plantRoutes = require('./src/plants/plant.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats');

app.use('/api/plants', plantRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Rumah Hijau API (Vercel)');
});

// ⛔ Hapus app.listen()
// ✅ Ganti dengan ekspor handler

// Pastikan DB connect saat Vercel memanggil handler
let isDbConnected = false;
async function connectDbIfNeeded() {
  if (!isDbConnected) {
    await mongoose.connect(process.env.DB_URL);
    isDbConnected = true;
    console.log('✅ MongoDB connected (Vercel)');
  }
}

// Export handler untuk Vercel
module.exports = async (req, res) => {
  await connectDbIfNeeded();
  return app(req, res); // Eksekusi express sebagai handler
};


// ALJ9pUaCqeqatrJc

// .v2WpIH.4HLK#l+8

// 3YH5WQrWCQI3vyKR
// ppmrumahhijau#$
