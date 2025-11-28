const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');

// GET /api/employees
router.get('/', auth, async (req,res)=> {
  const employees = await Employee.find();
  res.json(employees);
});

// POST /api/employees (admin)
router.post('/', auth, permit('admin'), async (req,res)=>{
  const emp = new Employee(req.body);
  await emp.save();
  res.json(emp);
});

module.exports = router;
