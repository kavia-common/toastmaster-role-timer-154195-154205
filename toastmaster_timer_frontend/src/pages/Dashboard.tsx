import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/AuthContext'
import { useNotifications } from '../components/Notifications'

// Dummy, for example. Call API in real app.
type TMeeting = {
  id: string,
  name: string,
  date: string,
  roles: { [role: string]: string }, // role: userName
  speeches: { id:string, speaker:string, title:string, durationSeconds:number, started: string, ended?: string }[]
}

const fetchMeetings = async (): Promise<TMeeting[]> => {
  // Placeholder: in real app, use fetch(`${import.meta.env.VITE_API_BASE_URL}/meetings`)...
  return [
    {
      id: '1',
      name: 'Weekly Toastmasters',
      date: new Date().toISOString(),
      roles: {mentor: 'Alex', timer: 'Jamie'},
      speeches: [
        {
          id: 'sp1', speaker: 'John', title: 'The Art of Speaking', durationSeconds: 356, started: new Date(Date.now()-600000).toISOString()
        }
      ]
    }
  ]
}

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const { notify } = useNotifications()
  const [meetings, setMeetings] = useState<TMeeting[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      setLoading(true)
      setMeetings(await fetchMeetings())
      setLoading(false)
    })()
  }, [])

  const handleCreateMeeting = () => {
    notify('Meeting created (demo)', 'success')
    // In real code, open modal or navigate
  }

  return (
    <div>
      <h1 style={{color:'var(--primary)', marginBottom: 0}}>Welcome, {user?.name}!</h1>
      <p style={{color:'var(--text-secondary)', marginBottom: '2em'}}>Role: <b>{user?.role}</b></p>
      <section>
        <button style={{marginBottom:'2em'}} onClick={handleCreateMeeting}>Create New Meeting</button>
        {loading ? <div>Loading...</div> : (
          <table>
            <thead>
              <tr>
                <th>Meeting</th>
                <th>Date</th>
                <th>Mentor</th>
                <th>Timer</th>
                <th>Speeches</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map(m =>
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{new Date(m.date).toLocaleString()}</td>
                  <td>{m.roles.mentor || '-'}</td>
                  <td>{m.roles.timer || '-'}</td>
                  <td>{m.speeches.length}</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}
export default Dashboard
