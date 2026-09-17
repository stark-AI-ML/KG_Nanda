import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import whatsappRoutes from './src/routes/whatsappRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import patientRoutes from './src/routes/patientRoutes.js';

dotenv.config();
const app = express();

// CORS Configuration - permissive in production for main domain + dev
const defaultAllowed = [
  'https://kgnandahospital.com',
  'https://www.kgnandahospital.com',
  'http://localhost:5173',
  'http://localhost:3000',
];

const envAllowed = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : [];

const allowedOrigins = Array.from(new Set([...defaultAllowed, ...envAllowed]));

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('kgnandahospital.com')) {
      callback(null, true);
    } else {
      callback(null, true); // Fallback allow to avoid unexpected CORS blocks in prod
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());

// Health Check
app.get('/health', (req, res) => res.json({
  status: 'ok',
  service: 'KG Nanda API',
  db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  timestamp: new Date().toISOString(),
}));

app.get('/', (req, res) => res.send('KG Nanda Hospital API is Running Live 🚀'));

// Routes
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/patients', patientRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// Start listening immediately so Hostinger health checks always pass
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // Connect to MongoDB asynchronously without killing the server on failure
  const mongoUri = process.env.MONGO_URI;
  if (mongoUri && !mongoUri.includes('<username>')) {
    mongoose.connect(mongoUri)
      .then(() => console.log('✅ MongoDB Connected successfully'))
      .catch(err => {
        console.error('❌ MongoDB connection error (server still running):', err.message);
      });
  } else {
    console.warn('⚠️ Invalid or placeholder MONGO_URI provided. Server running in offline DB mode.');
  }
});