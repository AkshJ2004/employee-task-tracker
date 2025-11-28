// server.js (relevant parts)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const empRoutes = require('./routes/employees');
const taskRoutes = require('./routes/tasks');

const app = express();

// Read allowed origins from env (comma-separated) or use sensible defaults
// Example: ALLOWED_ORIGINS="http://localhost:5173,http://localhost:3000,https://your-netlify.netlify.app"
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || '';
const allowedOrigins = allowedOriginsEnv
  ? allowedOriginsEnv.split(',').map(s => s.trim())
  : [
      'http://localhost:5173', // Vite
      'http://localhost:3000', // CRA (if used)
      'http://localhost:5000'  // optional: handy when testing same host
    ];

// CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  // helpful debug log — remove or lower in production
  // console.log('Incoming request origin:', origin);

  // If no origin (curl, server-to-server), allow
  if (!origin) {
    return next();
  }

  // If origin is allowed, use cors() to set headers; else continue without CORS headers
  if (allowedOrigins.includes(origin)) {
    cors({
      origin: origin, // echo the allowed origin
      methods: ['GET','POST','PUT','DELETE','OPTIONS'],
      allowedHeaders: ['Content-Type','Authorization'],
      credentials: true
    })(req, res, next);
  } else {
    // origin not allowed -> do NOT attach CORS headers (browser will block)
    // but do not throw an Error (prevents noisy stack traces)
    // You can optionally log rejected origins for debugging:
    console.warn(`CORS: rejected origin ${origin}`);
    next();
  }
});

// parse JSON
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', empRoutes);
app.use('/api/tasks', taskRoutes);

// start server after DB connect
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => {
    console.error('DB connection failed', err);
    process.exit(1);
  });
