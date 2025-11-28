const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// POST /api/auth/register (admin can create users - for simplicity allow open in seed)
router.post('/register', async (req,res)=>{
  const { name, email, password, role, employeeRef } = req.body;
  try {
    const user = new User({ name, email, password, role, employeeRef });
    await user.save();
    res.json({ message: 'user created' });
  } catch(err){
    res.status(400).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid creds' });
    const same = await user.comparePassword(password);
    if (!same) return res.status(400).json({ message: 'Invalid creds' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email } });
  } catch(err){
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
