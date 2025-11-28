// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const empRoutes = require('./routes/employees');
const taskRoutes = require('./routes/tasks');

const app = express();

// === CORS middleware (dynamic origin allow) ===
app.use(cors({
  origin: (origin, callback) => {
    // allow non-browser requests like curl (no origin)
    if (!origin) return callback(null, true);
    // accept all origins for now (dev). Replace with an allowlist for production.
    return callback(null, true);
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

// === Manual preflight responder (no use of app.options('*', ...)) ===
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    // set CORS headers explicitly so preflight returns them
    const origin = req.headers.origin || '*';
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    // if you use cookies with credentials: true, also echo origin (not '*')
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(204);
  }
  next();
});

// JSON body parsing
app.use(express.json());

// Routes
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
