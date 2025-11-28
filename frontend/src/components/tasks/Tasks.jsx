import React, { useEffect, useState } from 'react';
import { apiGetTasks, apiGetEmployees, apiCreateTask, apiUpdateTask } from '../../api/api';
import Card from '../common/Card';
import Loader from '../common/Loader';
import TaskForm from './TaskForm';
import useAuth from '../../hooks/useAuth';
import { capitalize } from '../../utils/formatters';

export default function Tasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState({ status: '', employee: '' });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const e = await apiGetEmployees();
    const t = await apiGetTasks();
    setEmployees(Array.isArray(e) ? e : []);
    setTasks(Array.isArray(t) ? t : []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (data) => {
    await apiCreateTask(data);
    loadData();
  };

  const handleStatusChange = async (id, status) => {
    await apiUpdateTask(id, { status });
    loadData();
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter.status && t.status !== filter.status) return false;
    if (filter.employee && t.assignedTo && t.assignedTo._id !== filter.employee) return false;
    return true;
  });

  if (loading) return <Loader />;

  return (
    <div className="tasks-page">
      <div className="grid-2">
        <Card>
          <div className="flex-between">
            <h2>Tasks</h2>
            <div className="filters">
              <select
                value={filter.status}
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              >
                <option value="">All statuses</option>
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
              <select
                value={filter.employee}
                onChange={(e) => setFilter({ ...filter, employee: e.target.value })}
              >
                <option value="">All employees</option>
                {employees.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ul className="table-list">
            <li className="table-header">
              <span>Title</span>
              <span>Assigned</span>
              <span>Status</span>
            </li>
            {filteredTasks.map((t) => (
              <li key={t._id} className="table-row">
                <span>
                  <strong>{t.title}</strong>
                  {t.description && <div className="muted small">{t.description}</div>}
                </span>
                <span className="muted">
                  {t.assignedTo ? t.assignedTo.name : 'Unassigned'}
                </span>
                <span>
                  <select
                    value={t.status}
                    onChange={(e) => handleStatusChange(t._id, e.target.value)}
                    className={`status-select status-${t.status}`}
                  >
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </span>
              </li>
            ))}
            {filteredTasks.length === 0 && (
              <li className="table-row muted">No tasks match filters.</li>
            )}
          </ul>
        </Card>

        <Card>
          <h3>Create Task</h3>
          {user.role !== 'admin' && (
            <p className="muted small">
              Note: Only admins can create tasks. This form may fail for regular users.
            </p>
          )}
          <TaskForm employees={employees} onCreate={handleCreate} />
        </Card>
      </div>
    </div>
  );
}
