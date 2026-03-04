'use client'

import { useState, useEffect } from 'react'
import './ProtectedRoute.css'

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth')
    if (auth === 'true') setIsAuthenticated(true)
    setIsLoading(false)
  }, [])

  const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })

    if (res.ok) {
      sessionStorage.setItem('adminAuth', 'true')
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  } catch {
    setError('Something went wrong. Try again.')
    setPassword('')
  }
}

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
  }

  if (isLoading) return <div className="loading">Loading...</div>

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>Admin Access</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="password-input"
              autoFocus
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="admin-header">
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      {children}
    </>
  )
}
