const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB bağlantısı
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tlsAllowInvalidCertificates: true, // Geçersiz sertifikalara izin ver
  tlsInsecure: true // Insecure TLS bağlantısına izin ver
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB connected');
});

// Kullanıcı modeli
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', UserSchema);

// Routes
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  await newUser.save();
  res.status(201).json(newUser);
});

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


