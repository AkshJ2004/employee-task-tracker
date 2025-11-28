// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const empRoutes = require('./routes/employees');
const taskRoutes = require('./routes/tasks');

const app = express(); // <-- create app BEFORE using it

// Allowed origins (add or change as needed)
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000',
  'http://localhost:5173' || 'https://employee-task-tracker-1.onrender.com'  // Vite dev server
];

// Use CORS with an origin-checking function
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (e.g., curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: origin not allowed'));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

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
