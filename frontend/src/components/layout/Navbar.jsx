import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../common/Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="logo">Employee Task Tracker</span>
      </div>
      <nav className="navbar-center">
        <NavLink to="/" className="nav-link">Dashboard</NavLink>
        <NavLink to="/employees" className="nav-link">Employees</NavLink>
        <NavLink to="/tasks" className="nav-link">Tasks</NavLink>
      </nav>
      <div className="navbar-right">
        {user && (
          <>
            <span className="user-chip">
              {user.name} <span className="role-tag">{user.role}</span>
            </span>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </>
        )}
      </div>
    </header>
  );
}
