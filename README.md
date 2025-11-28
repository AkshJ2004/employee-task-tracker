📌 Employee Task Tracker

A full-stack application to manage employees and tasks with role-based access (Admin/User).

Built using
- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: MongoDB
- Auth:JWT + Role-based Permission
- Styling: Custom CSS

---

🚀 Features

👤 Authentication
- Secure login using JWT
- Role-based access control (Admin / User)
- Users can only update their assigned task status
- Admins can create, update, assign, and delete any task

📋 Task Management
- Create tasks (Admin only)
- Assign tasks to employees
- Update task status
- Filter tasks by status or employee
- Dashboard overview with task statistics

👥 Employee Management
- Fetch list of employees
- Admin can view and manage all employees

 📊 Dashboard
- Total tasks
- Completed tasks
- Employees count
- Recent tasks
- Status breakdown

---

🗂️ Project Structure

```
employee-task-tracker/
│
├── backend/                 # Node.js + Express API
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── seed.js
│   ├── server.js
│   └── .env (ignored)
│
├── frontend/                # React + Vite frontend
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── styles/
│   │   ├── main.jsx
│   │   └── App.jsx
│   └── .env (ignored)
│
└── README.md
```

---

⚙️ Installation & Setup

📥 1. Clone the repository

```bash
git clone https://github.com/<your-username>/employee-task-tracker.git
cd employee-task-tracker
```

🛠️ 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/etdb
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
```

Seed Sample Data (Admin + User + Employees + Tasks):

```bash
npm run seed
```

Start Backend Server:

```bash
npm run dev
```



🎨 3. Frontend Setup (React + Vite)

```bash
cd ../frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start Frontend:

```bash
npm run dev
```


---

🔐 Default Credentials (from seed)

Admin account
- Email: `admin@company.com`
- Password: `admin123`

Regular User account
- Email:`ravi.user@company.com`
- Password: `user123`

---

 🧪 API Endpoints

Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/register` | Create new user |

Employees
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | List employees |

Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get tasks w/ filter |
| POST | `/api/tasks` | Create task (Admin) |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

---

🛡️ Role Permissions

| Feature | Admin | User |
|---------|-------|------|
| Login | ✔️ | ✔️ |
| View all tasks | ✔️ | ✔️ (restricted to assigned tasks) |
| Update own task status | ✔️ | ✔️ |
| Create tasks | ✔️ | ❌ |
| Assign tasks | ✔️ | ❌ |
| Delete tasks | ✔️ | ❌ |

---

🎯 Technologies Used

Frontend
- React (Vite)
- React Router
- Context API
- Custom CSS
- Fetch API

Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Auth
- CORS
- dotenv

---

Made with ❤️ by Aksh 

Feel free to fork this project and submit a pull request. Suggestions and improvements are always welcome!

