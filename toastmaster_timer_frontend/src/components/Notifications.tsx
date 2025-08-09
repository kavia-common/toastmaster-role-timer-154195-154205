/* eslint-env browser */
/* global window */
import React, { useEffect, useState, createContext, useContext } from 'react'
type NotificationType = 'success' | 'info' | 'error'
interface Notif {
  id: number
  message: string
  type: NotificationType
}
type NotifCtxType = {
  notify: (msg: string, type?: NotificationType) => void
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NotifContext = createContext<NotifCtxType>({
  notify: () => {}
})

export const useNotifications = () => useContext(NotifContext)

/** PUBLIC_INTERFACE */
export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifs, setNotifs] = useState<Notif[]>([])
  const notify = (message: string, type: NotificationType = 'info') => {
    setNotifs(n => [...n, { id: Date.now(), message, type }])
  }
  useEffect(() => {
    if (notifs.length > 0) {
      const timer = window.setTimeout(() => {
        setNotifs(n => n.slice(1))
      }, 3000)
      return () => window.clearTimeout(timer)
    }
  }, [notifs])
  return (
    <NotifContext.Provider value={{ notify }}>
      {children}
      <div className="notifs-container">
        {notifs.map(n =>
          <div key={n.id} className={`notif notif--${n.type}`}>{n.message}</div>
        )}
      </div>
    </NotifContext.Provider>
  )
}
/** PUBLIC_INTERFACE */
const Notifications: React.FC = () => null // Non-global usage is not needed
export default Notifications
