import React from 'react'
import './login.css'

export default function Login() {
	return (
		<div className="login-card">
			<h1>Welcome</h1>
			<form>
				<input placeholder="Email" />
				<input placeholder="Password" type="password" />
				<button type="submit">Sign in</button>
			</form>
		</div>
	)
}
