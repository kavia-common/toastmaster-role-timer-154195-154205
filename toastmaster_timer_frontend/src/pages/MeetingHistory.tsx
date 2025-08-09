import React, { useEffect, useState } from 'react'

// Replace with real API in full app.
const fetchHistory = async () => [
  {
    id: 'h1',
    name: 'Weekly Toastmasters #1',
    date: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    speeches: [
      { id: 's1', speaker: 'Anna', title: 'Leadership', durationSeconds: 410 }
    ]
  },
  {
    id: 'h2',
    name: 'Weekly Toastmasters #2',
    date: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
    speeches: [
      { id: 's1', speaker: 'Ben', title: 'Collaboration', durationSeconds: 295 }
    ]
  }
]

const MeetingHistory: React.FC = () => {
  const [rows, setRows] = useState<Array<any>>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    (async () => {
      setRows(await fetchHistory())
      setLoading(false)
    })()
  }, [])

  return (
    <div>
      <h2 style={{color:'var(--primary)', marginBottom:'2em'}}>Meeting & Speech History</h2>
      {loading ? <span>Loading...</span> : (
        <table>
          <thead>
            <tr>
              <th>Meeting</th>
              <th>Date</th>
              <th>Speeches</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r =>
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>
                  {r.speeches.map((s:any,i:number)=>
                    <div key={i}><b>{s.speaker}</b>: {s.title} (<span style={{color:'var(--secondary)'}}>{Math.floor(s.durationSeconds/60)+':'+(s.durationSeconds%60).toString().padStart(2,'0')}</span>)</div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default MeetingHistory
