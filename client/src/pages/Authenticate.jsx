import React, { useState } from 'react'
import '../styles/authenticate.css'
import Login from '../components/Login'
import Register from '../components/Register'

const Authenticate = () => {

  const [authType, setAuthType] = useState('login');

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <div style={{ fontWeight: 800, fontSize: '2rem', color: '#4a90e2', marginBottom: '0.5rem', letterSpacing: '2px' }}>
            ProLancer
          </div>
          <h2>{authType === 'login' ? 'Sign In' : 'Create Account'}</h2>
          <p>{authType === 'login' ? 'Welcome back! Please login to your account.' : 'Join ProLancer and start your journey.'}</p>
        </div>
        {authType === 'login' ? (
          <Login setAuthType={setAuthType} />
        ) : (
          <Register setAuthType={setAuthType} />
        )}
        <div className="auth-switch">
          {authType === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <span onClick={() => setAuthType('register')}>Register</span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span onClick={() => setAuthType('login')}>Login</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Authenticate