import "./Login.css";

function Login() {
  return (
    <div className="login-page">

      <div className="logo-box">
        <div className="logo">AF</div>

        <h1>ASSETFLOW</h1>
        <p>Enterprise Resource Management</p>
      </div>

      <div className="login-card">

        <div className="input-group">
          <label>Corporate Email</label>
          <input
            type="email"
            placeholder="name@company.com"
          />
        </div>

        <div className="input-group">
          <div className="password-header">
            <label>Password</label>
            <span>Forgot?</span>
          </div>

          <input
            type="password"
            placeholder="********"
          />
        </div>

        <button className="login-btn">
          SIGN IN →
        </button>

        <div className="divider"></div>

        <p className="new-user">
          New to the platform?
        </p>

        <div className="info-box">
          Registration creates a basic profile.
          Full access requires administrator approval.
        </div>

        <button className="request-btn">
          REQUEST ACCOUNT
        </button>

      </div>

      <p className="footer">
        © 2026 AssetFlow
      </p>

    </div>
  );
}

export default Login;