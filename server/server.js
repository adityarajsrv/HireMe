const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

dotenv.config({ debug: true }); 
connectDB();

const app = express();
app.use(cors({
  origin: 'https://hire-me-inky.vercel.app', 
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = parseInt(process.env.PORT, 10) || 5000;
console.log('Attempting to bind to PORT:', PORT);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', port: PORT });
});