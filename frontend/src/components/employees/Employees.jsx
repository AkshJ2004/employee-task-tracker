import React, { useEffect, useState } from 'react';
import { apiGetEmployees } from '../../api/api';
import Card from '../common/Card';
import Loader from '../common/Loader';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await apiGetEmployees();
      setEmployees(Array.isArray(res) ? res : []);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <Loader />;

  return (
    <Card>
      <h2>Employees</h2>
      <ul className="table-list">
        <li className="table-header">
          <span>Name</span>
          <span>Position</span>
          <span>Email</span>
        </li>
        {employees.map((e) => (
          <li key={e._id} className="table-row">
            <span>{e.name}</span>
            <span className="muted">{e.position}</span>
            <span className="muted">{e.email}</span>
          </li>
        ))}
        {employees.length === 0 && (
          <li className="muted table-row">No employees found.</li>
        )}
      </ul>
    </Card>
  );
}
