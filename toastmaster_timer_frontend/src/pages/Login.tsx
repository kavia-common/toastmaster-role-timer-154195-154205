import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, UserRole } from '../components/AuthContext'

const roleOptions: UserRole[] = ['mentor', 'timer', 'moderator', 'evaluator', 'member']

const Login: React.FC = () => {
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [role, setRole] = useState<UserRole>('member')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await login(name.trim() || 'TM User', role)
    setLoading(false)
    navigate('/')
  }

  return (
    <div className="center-container" style={{ minHeight: '90vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div className='modal-content' style={{minWidth:'340px'}}>
        <h2 style={{marginBottom:'2em', color: 'var(--primary)'}}>Login as Toastmaster</h2>
        <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column'}}>
          <label>Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required />
          <label>Role</label>
          <select value={role} onChange={e=>setRole(e.target.value as UserRole)}>
            {roleOptions.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase()+r.slice(1)}</option>)}
          </select>
          <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
      </div>
    </div>
  )
}
export default Login
