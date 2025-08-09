import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaClock, FaUserCheck, FaHistory, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from './AuthContext'

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth()
  if (!user) return null

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <span className="tm-logo">⏱️</span>
        <span>Toastmaster Timer</span>
      </div>
      <ul>
        <li>
          <NavLink to="/" end><FaChalkboardTeacher /> Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/timer"><FaClock /> Timer</NavLink>
        </li>
        <li>
          <NavLink to="/roles"><FaUserCheck /> Roles</NavLink>
        </li>
        <li>
          <NavLink to="/history"><FaHistory /> History</NavLink>
        </li>
      </ul>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <span>{user.name} ({user.role})</span>
        </div>
        <button className="sidebar-logout" onClick={logout}><FaSignOutAlt />Logout</button>
      </div>
    </nav>
  )
}
export default Sidebar
