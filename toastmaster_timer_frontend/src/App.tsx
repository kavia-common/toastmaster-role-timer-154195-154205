import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { AuthProvider, useAuth } from './components/AuthContext'
import Dashboard from './pages/Dashboard'
import MeetingHistory from './pages/MeetingHistory'
import RoleAssignments from './pages/RoleAssignments'
import TimerPage from './pages/TimerPage'
import Login from './pages/Login'
import Notifications from './components/Notifications'

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="app-container">
    <Sidebar />
    <main className="main-content">{children}</main>
    <Notifications />
  </div>
)

const PrivateRoute: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/login" />
}

const App: React.FC = () => (
  <AuthProvider>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/history" element={<MeetingHistory />} />
                <Route path="/roles" element={<RoleAssignments />} />
                <Route path="/timer" element={<TimerPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  </AuthProvider>
)

export default App
