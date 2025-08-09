import React, { useState } from 'react'
import { useAuth, UserRole } from '../components/AuthContext'
import Modal from '../components/Modal'

// Demo structure for roles
type RoleStatus = {
  role: UserRole, user: string | null
}

const initialRoles: RoleStatus[] = [
  { role: 'mentor', user: 'Alex' },
  { role: 'timer', user: 'Jamie' },
  { role: 'moderator', user: null },
  { role: 'evaluator', user: null },
  { role: 'member', user: null }
]

const RoleAssignments: React.FC = () => {
  const [roles, setRoles] = useState(initialRoles)
  const [showModal, setShowModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>('mentor')
  const { user, switchRole } = useAuth()

  const assignRole = (role: UserRole) => {
    setSelectedRole(role)
    setShowModal(true)
  }

  const handleAssign = (name: string) => {
    setRoles(prev => prev.map(r => r.role === selectedRole ? { ...r, user: name } : r))
    setShowModal(false)
  }

  const myRole = roles.find(r => r.user === user?.name)?.role

  return (
    <div>
      <h2 style={{color:'var(--primary)', marginBottom: '2em'}}>Meeting Role Assignment</h2>
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(r =>
            <tr key={r.role}>
              <td><b>{r.role.charAt(0).toUpperCase() + r.role.slice(1)}</b></td>
              <td>{r.user || <span style={{color:'var(--text-secondary)'}}>Unassigned</span>}</td>
              <td>
                {(!r.user || r.user === user?.name) && (
                  <button style={{marginRight:8}} onClick={()=>assignRole(r.role)}>Assign</button>
                )}
                {myRole !== r.role && r.role !== 'member' && (
                  <button style={{background:'#555', marginRight:8}} onClick={()=>switchRole(r.role)}>Switch As</button>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showModal && 
        <Modal onClose={()=>setShowModal(false)}>
          <AssignRoleForm role={selectedRole} onAssign={handleAssign} />
        </Modal>
      }
    </div>
  )
}

const AssignRoleForm: React.FC<{role: UserRole, onAssign: (_assignedName: string) => void}> = ({role, onAssign}) => {
  const [inputName, setInputName] = useState('')
  const handleAssign = () => { if (inputName) onAssign(inputName) }
  return (
    <>
      <h3 style={{color:'var(--primary)'}}>Assign {role}</h3>
      <input value={inputName} onChange={e=>setInputName(e.target.value)} placeholder="User name" autoFocus />
      <button onClick={handleAssign}>Assign</button>
    </>
  )
}

export default RoleAssignments
