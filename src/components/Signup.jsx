import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import './Signup.css'; // Import the CSS file

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      navigate('/login');
    } catch (error) {
      console.error(error);
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <Card className="signup-card">
        <CardHeader
          title={<Typography variant="h5" className="signup-title">Create an Account</Typography>}
          subheader={
            <Typography variant="body2" className="signup-subtitle">
              Sign up to get started
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={handleSignup} noValidate className="signup-form">
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && (
              <Alert severity="error" className="signup-alert">
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              className="signup-button"
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>
          </form>
          <Typography variant="body2" className="signup-footer">
            Already have an account?{' '}
            <a href="/login" className="signup-link">
              Log in
            </a>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
