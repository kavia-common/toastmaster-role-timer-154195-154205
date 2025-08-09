/* eslint-env browser */
/* global window */
import React, { createContext, useContext, useState, useEffect } from 'react'

export type UserRole = 'mentor' | 'timer' | 'moderator' | 'evaluator' | 'member'
export interface User {
  id: string,
  name: string,
  role: UserRole
  token: string
}

type AuthContextType = {
  user: User | null,
  login: (name: string, role: UserRole) => Promise<void>,
  logout: () => void,
  switchRole: (role: UserRole) => void,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Load from localStorage for persistence
    const raw = window.localStorage.getItem('tm-user')
    if (raw) setUser(JSON.parse(raw))
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (_name: string, _role: UserRole) => {
    // In real-app, fetch token from backend
    const fakeToken = Math.random().toString(36).slice(2)
    // Demo: use 'TM User' for name, 'member' for role 
    const newUser: User = { id: fakeToken, name: 'TM User', role: 'member', token: fakeToken }
    setUser(newUser)
    window.localStorage.setItem('tm-user', JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('tm-user')
  }

  const switchRole = (role: UserRole) => {
    if (!user) return
    const updated = { ...user, role }
    setUser(updated)
    window.localStorage.setItem('tm-user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
