require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const Employee = require('./models/Employee');
const Task = require('./models/Task');

const run = async () => {
  await connectDB(process.env.MONGO_URI);
  await User.deleteMany({});
  await Employee.deleteMany({});
  await Task.deleteMany({});

  const emp1 = await Employee.create({ name: 'Ravi Sharma', email: 'ravi@company.com', position: 'Developer' });
  const emp2 = await Employee.create({ name: 'Sana Patel', email: 'sana@company.com', position: 'Designer' });

  const admin = await User.create({ name: 'Admin', email: 'admin@company.com', password: 'admin123', role: 'admin' });
  const user = await User.create({ name: 'Ravi', email: 'ravi.user@company.com', password: 'user123', role: 'user', employeeRef: emp1._id });

  await Task.create({ title: 'Setup project', description: 'Initialize repo', status: 'done', assignedTo: emp1._id, createdBy: admin._id });
  await Task.create({ title: 'Design header', description: 'Create header layout', status: 'in-progress', assignedTo: emp2._id, createdBy: admin._id });

  console.log('Seeded DB');
  process.exit();
};

run().catch(err => { console.error(err); process.exit(1); });
