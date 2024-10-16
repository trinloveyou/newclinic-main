import React, { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, TextField, Button, Snackbar, CircularProgress, Alert } from '@mui/material';

const AuthForgotpass = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8002/api/Forgotpass', { email });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      console.error('Error:', err); // Log the error
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.response) {
        setError(`Server responded with status code ${err.response.status}`);
      } else if (err.request) {
        setError('No response received from server');
      } else {
        setError('An error occurred. Please try again.');
      }
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setMessage('');
    setError('');
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom align="center">
        ลืมรหัสผ่าน
      </Typography>
      <TextField
        label="Email Address"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleResetPassword}
        disabled={!email || loading}
        style={{ marginBottom: '20px' }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
      </Button>
      <Snackbar open={!!message || !!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? 'error' : 'success'}>
          {error || message}
        </Alert>
      </Snackbar>
      <Container maxWidth="sm" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Button component={RouterLink} to="/Login" variant="contained" color="primary" style={{ fontSize: 15 }}>
          เข้าสู่ระบบ
        </Button>
      </Container>
    </Container>
  );
};

export default AuthForgotpass;
