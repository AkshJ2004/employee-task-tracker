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
const cors = require('cors');
app.use(cors({
  origin: "https://employee-task-tracker-2.onrender.com",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true   // only if you use cookies/credentials
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
