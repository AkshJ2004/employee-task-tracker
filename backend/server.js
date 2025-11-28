// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const empRoutes = require('./routes/employees');
const taskRoutes = require('./routes/tasks');

const app = express();

// === Dynamic CORS that accepts any origin ===
// This allows any origin while still supporting credentials (if you use them).
// Good for development / testing. For production restrict to exact origins.
app.use(cors({
  origin: (origin, callback) => {
    // For non-browser requests (curl, server-to-server), origin is undefined — allow it.
    if (!origin) return callback(null, true);
    // Optionally log the origin for debugging (remove in production)
    console.log('CORS request from origin:', origin);
    // Allow all origins:
    return callback(null, true);
    // If you want to restrict, replace above line with:
    // const allowed = ['https://your-frontend.com', 'http://localhost:5173', ...];
    // return allowed.includes(origin) ? callback(null, true) : callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

// Ensure OPTIONS preflight returns proper headers
app.options('*', cors());

// JSON body parsing
app.use(express.json());

// Routes (mounted after CORS)
app.use('/api/auth', authRoutes);
app.use('/api/employees', empRoutes);
app.use('/api/tasks', taskRoutes);

// Start server after DB connects
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect DB:', err);
    process.exit(1);
  });
