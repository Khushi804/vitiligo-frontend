import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      navigate('/imageupload');
    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <CardHeader
          title={<Typography variant="h5" className="login-title">Welcome Back</Typography>}
          subheader={
            <Typography variant="subtitle1" className="login-subtitle">
              Please sign in to your account
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={handleLogin} className="login-form">
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Alert severity="error" className="login-alert">{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </form>
          <Typography variant="body2" className="login-footer">
            Don't have an account?{' '}
            <a href="/signup" className="login-link">
              Sign up
            </a>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
