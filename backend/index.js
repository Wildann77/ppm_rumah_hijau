const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./src/cron/autoCancelOrders'); // ⬅️ Tambahkan ini


// hNAKzILz39EdlkYk
// middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173','https://ppm-rumah-hijau.vercel.app'],
    credentials: true,
  })
);

// Tambahkan batas ukuran lebih besar (misal 10MB)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Router dan middleware lainnya

// routes
const plantRoutes = require('./src/plants/plant.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats');

app.use('/api/plants', plantRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);


async function main() {
  
  await mongoose.connect(process.env.DB_URL);
 
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
}
main()
  .then(() => console.log('Mongo db connected successfully'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// ALJ9pUaCqeqatrJc

// .v2WpIH.4HLK#l+8

// 3YH5WQrWCQI3vyKR
// ppmrumahhijau#$
