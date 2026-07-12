import React, { useState } from 'react'
import { Shield, Eye, EyeOff, Info, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import './login.css'

export default function Login({ onLoginSuccess }) {
  const [view, setView] = useState('signin') // 'signin' or 'register'
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Form inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [department, setDepartment] = useState('IT Operations')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Toggle view
  const handleToggleView = (newView) => {
    setView(newView)
    setErrorMsg('')
    setSuccessMsg('')
  }

  // Handle standard login
  const handleSignInSubmit = (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')

    // Bypass credentials check
    if (email === 'admin@assetflow.com' && password === 'password123') {
      if (onLoginSuccess) {
        onLoginSuccess({
          name: 'Alex Mercer',
          email: email,
          department: 'Operations Director'
        })
      } else {
        setSuccessMsg('Successfully signed in as Alex Mercer!')
      }
      return
    }

    if (!email || !password) {
      setErrorMsg('Please fill in all credentials.')
      return
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid corporate email.')
      return
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.')
      return
    }

    // Success for standard corporate credentials
    const displayName = email.split('@')[0].split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ')
    if (onLoginSuccess) {
      onLoginSuccess({
        name: displayName,
        email: email,
        department: 'Department Staff'
      })
    } else {
      setSuccessMsg(`Successfully signed in as ${displayName}!`)
    }
  }

  // Handle account registration request
  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMsg('All fields are required.')
      return
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid corporate email.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.')
      return
    }

    // Mock register success and prefill login fields
    setSuccessMsg('Account request successfully registered!')
    setEmail(email)
    setPassword(password)
    setView('signin')
  }

  // Auto-fill credentials using the bypass panel
  const handleUseBypass = () => {
    setEmail('admin@assetflow.com')
    setPassword('password123')
    setErrorMsg('')
  }

  return (
    <div className="login-page-container">
      {/* Logo block matching given image */}
      <div className="logo-section">
        <div className="logo-af-box">AF</div>
        <h1>ASSETFLOW</h1>
        <p>Enterprise Resource Management</p>
      </div>

      {/* Main card */}
      <div className="auth-card-body">
        
        {/* Success/Error notifications */}
        {successMsg && (
          <div className="auth-status-banner success">
            <CheckCircle size={14} />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="auth-status-banner error">
            <AlertCircle size={14} />
            <span>{errorMsg}</span>
          </div>
        )}

        {view === 'signin' ? (
          /* Sign In Form */
          <form onSubmit={handleSignInSubmit}>
            <div className="input-group-row">
              <label>Corporate Email</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group-row">
              <div className="password-label-container">
                <label>Password</label>
                <span onClick={() => setErrorMsg('Contact system administrator for password recovery.')}>Forgot?</span>
              </div>
              <div className="input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="eye-icon-btn" 
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-action-btn">
              Sign In <ArrowRight size={14} />
            </button>

            <p className="new-to-platform-lbl">New to the platform?</p>

            <div className="provisioning-info-box">
              <Shield className="provisioning-icon" size={15} />
              <div className="provisioning-text">
                Registration creates a base profile. Full system access requires administrative provisioning.
              </div>
            </div>

            <button 
              type="button" 
              className="secondary-outline-btn"
              onClick={() => handleToggleView('register')}
            >
              Request Account
            </button>
          </form>
        ) : (
          /* Request Account Form */
          <form onSubmit={handleRegisterSubmit}>
            <div className="input-group-row">
              <label>Full Name</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  placeholder="Jane Doe" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group-row">
              <label>Corporate Email</label>
              <div className="input-wrapper">
                <input 
                  type="email" 
                  placeholder="jane.doe@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group-row">
              <label>Corporate Department</label>
              <div className="input-wrapper">
                <select 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="IT Operations">IT Operations</option>
                  <option value="Finance Division">Finance Division</option>
                  <option value="Executive Office">Executive Office</option>
                  <option value="Engineering Dept">Engineering Dept</option>
                </select>
              </div>
            </div>

            <div className="input-group-row">
              <label>Password</label>
              <div className="input-wrapper">
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group-row">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-action-btn">
              Submit Request
            </button>

            <p className="new-to-platform-lbl">Already have an account?</p>

            <button 
              type="button" 
              className="secondary-outline-btn"
              onClick={() => handleToggleView('signin')}
            >
              Back to Sign In
            </button>
          </form>
        )}

        {/* Demo Credentials Fast Panel */}
        {view === 'signin' && (
          <div className="demo-bypass-card" onClick={handleUseBypass}>
            <div className="demo-bypass-header">
              <Info size={12} style={{ color: '#6d28d9' }} />
              <span>Demo Quick Sign-In (Click to Autofill)</span>
            </div>
            <div className="demo-bypass-row">
              <span>Email:</span>
              <code>admin@assetflow.com</code>
            </div>
            <div className="demo-bypass-row">
              <span>Password:</span>
              <code>password123</code>
            </div>
            <div className="demo-bypass-tip">
              Or type any standard email/password combination to log in.
            </div>
          </div>
        )}

      </div>

      {/* Footer copyright */}
      <div className="footer-credits">
        © 2026 ASSETFLOW SYSTEMS CORP
      </div>
    </div>
  )
}
