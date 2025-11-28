import React, { useEffect, useState } from 'react';
import { apiGetEmployees, apiGetTasks } from '../../api/api';
import Card from '../common/Card';
import Loader from '../common/Loader';
import { capitalize } from '../../utils/formatters';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const e = await apiGetEmployees();
      const t = await apiGetTasks();
      setEmployees(Array.isArray(e) ? e : []);
      setTasks(Array.isArray(t) ? t : []);
      setLoading(false);
    };
    load();
  }, []);

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const todo = tasks.filter((t) => t.status === 'todo').length;
  const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
  const completion = total ? Math.round((done / total) * 100) : 0;

  if (loading) return <Loader />;

  return (
    <div className="dashboard">
      <div className="grid">
        <Card>
          <p className="card-label">Total Tasks</p>
          <p className="card-number">{total}</p>
        </Card>
        <Card>
          <p className="card-label">Completion</p>
          <p className="card-number">{completion}%</p>
        </Card>
        <Card>
          <p className="card-label">Employees</p>
          <p className="card-number">{employees.length}</p>
        </Card>
      </div>

      <Card>
        <h3>Task Status Overview</h3>
        <div className="status-row">
          <span className="badge badge-todo">Todo: {todo}</span>
          <span className="badge badge-inprogress">In Progress: {inProgress}</span>
          <span className="badge badge-done">Done: {done}</span>
        </div>
      </Card>

      <Card>
        <h3>Recent Tasks</h3>
        <ul className="simple-list">
          {tasks.slice(0, 5).map((t) => (
            <li key={t._id}>
              <div>
                <strong>{t.title}</strong>
                {t.assignedTo && (
                  <span className="pill small">
                    {t.assignedTo.name}
                  </span>
                )}
              </div>
              <span className={`pill pill-${t.status}`}>
                {capitalize(t.status.replace('-', ' '))}
              </span>
            </li>
          ))}
          {tasks.length === 0 && <li className="muted">No tasks yet.</li>}
        </ul>
      </Card>
    </div>
  );
}
