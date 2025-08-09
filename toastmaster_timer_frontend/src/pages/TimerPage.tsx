/* eslint-env browser */
/* global window */
import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../components/AuthContext'

const defaultSpeech = {
  id: 'spk1', speaker: 'John Doe', title: 'Future of Toastmasters', durationSec: 300
}

const TimerPage: React.FC = () => {
  const { user } = useAuth()
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [speech] = useState(defaultSpeech)
  const intervalRef = useRef<number>()

  // Timer start/stop logic
  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => setTime(t => t + 1), 1000)
    } else {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current) }
  }, [running])

  const handleStart = () => setRunning(true)
  const handleStop = () => setRunning(false)
  const handleReset = () => { setTime(0); setRunning(false) }

  // Show green/yellow/red style based on elapsed vs total
  let timeColor = 'var(--primary)'
  if (time > speech.durationSec * 2 / 3) timeColor = 'var(--accent)'
  if (time > speech.durationSec) timeColor = '#c1073c'

  return (
    <div>
      <h2 style={{color:'var(--primary)', marginBottom:'2em'}}>Speech Timer</h2>
      <div style={{display:'flex', alignItems:'center', gap:'3em'}}>
        <div>
          <span>Speaker:</span>
          <h3 style={{margin:'0.2em 0'}}>{speech.speaker}</h3>
          <p>Speech: <b>{speech.title}</b></p>
        </div>
        <div>
          <div style={{
            fontSize: '5em',
            color: timeColor,
            fontVariantNumeric: 'tabular-nums',
            marginBottom:'0.7em'
          }}>
            {Math.floor(time/60)}:{(time%60).toString().padStart(2,'0')}
          </div>
          <div style={{display:'flex',gap:'0.7em'}}>
            {user?.role === 'timer'
              ? (
                <>
                  <button onClick={handleStart} disabled={running}>Start</button>
                  <button onClick={handleStop} disabled={!running}>Stop</button>
                  <button onClick={handleReset}>Reset</button>
                </>
              ) : (
                <span>(Only timer can operate controls.)</span>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default TimerPage
