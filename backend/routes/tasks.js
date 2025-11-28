const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const Employee = require('../models/Employee');

// GET /api/tasks?status=&employee=
router.get('/', auth, async (req,res)=>{
  const { status, employee } = req.query;
  const q = {};
  if (status) q.status = status;
  if (employee) q.assignedTo = employee;
  // If non-admin, show only tasks assigned to that user's employeeRef if exists
  if (req.user.role !== 'admin' && req.user.employeeRef) {
    q.assignedTo = req.user.employeeRef;
  }
  const tasks = await Task.find(q).populate('assignedTo','name email position');
  res.json(tasks);
});

// POST /api/tasks (admin)
router.post('/', auth, permit('admin'), async (req,res)=>{
  const task = new Task({ ...req.body, createdBy: req.user._id });
  await task.save();
  res.json(task);
});

// PUT /api/tasks/:id (admin can update any; regular user can update only status for assigned tasks)
router.put('/:id', auth, async (req,res)=>{
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Not found' });
  // regular user allowed to update only their own task status
  if (req.user.role !== 'admin') {
    if (!req.user.employeeRef || task.assignedTo.toString() !== req.user.employeeRef.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    // allow only status update from user
    task.status = req.body.status || task.status;
  } else {
    // admin can update any field
    Object.assign(task, req.body);
  }
  await task.save();
  res.json(task);
});

// DELETE /api/tasks/:id (admin)
router.delete('/:id', auth, permit('admin'), async (req,res)=>{
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'deleted' });
});

module.exports = router;
