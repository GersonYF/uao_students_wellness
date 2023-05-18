import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_fetchUserData, API_loginUser } from '../api';
import { useUserContext } from '../UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, user } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {token} = await API_loginUser(email, password);
      const userData = await API_fetchUserData(token);
      loginUser({token, ...userData});
      console.log('Login successful:', {token, ...userData});
      navigate('/dashboard'); // redirect to dashboard
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    console.log('Updated user:', user);
  }, [user]);

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
