import React, { useState } from 'react';
import Button from '../common/Button';

export default function TaskForm({ employees, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, description, assignedTo: assignedTo || undefined });
    setTitle('');
    setDescription('');
    setAssignedTo('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
      </label>
      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
        />
      </label>
      <label>
        Assign to
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
          <option value="">Unassigned</option>
          {employees.map((e) => (
            <option key={e._id} value={e._id}>
              {e.name}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit">Create Task</Button>
    </form>
  );
}
