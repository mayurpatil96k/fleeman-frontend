import React, { useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import staffpage from './StaffPage';
const StaffLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const navigate = useNavigate();

  const handleLogin = () => {

    const validUsername = 'admin';
    const validPassword = '123';

    if (username === validUsername && password === validPassword) {

      navigate('/staffpage');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
    <div>
      <div className="container">
        <h2 className="mb-4">Staff Login</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <div className="text-danger mb-3">{error}</div>}
        <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
      </div>
    </div>
    </div>
  );
};

export default StaffLogin;
