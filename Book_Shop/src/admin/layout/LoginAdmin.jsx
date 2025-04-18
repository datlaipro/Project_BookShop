import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Link, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Facebook, Instagram } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#E1306C',
    },
  },
});

function LoginAdmin({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Hàm thao tác xử lý đăng nhập
    try {
      const response = await axios.post('http://localhost:3000/phpm/loginAdmin.php', { username, password });
      if (response.data.success) {
        // Đăng nhập thành công, xử lý logic tiếp theo ở đây
        console.log('Login successful');

        setIsLoggedIn(true); // Đặt trạng thái đăng nhập thành công 
        navigate('/admin'); // Điều hướng về trang admin

      } else {
        // Xử lý lỗi đăng nhập
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundImage: 'url(../sp/sp3.png)', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          background: 'rgba(227, 244, 251, 0.5)',
        }}></div>
        <Container maxWidth="xs" sx={{
          backgroundColor: 'rgba(31, 81, 93, 0.8)',
          padding: 4,
          borderRadius: 2,
          textAlign: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        }}>
          <Typography variant="h4" component="h1" gutterBottom color="white">LOGIN ADMIN</Typography>
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Box position="relative">
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <IconButton
                onClick={handlePasswordVisibility}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 16,
                  color: showPassword ? '#3498db' : '#222',
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
            <Box textAlign="right" mb={2}>
              <Link href="#" underline="none" color="white">Forgot Password?</Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ paddingY: 1.5, fontSize: '16px' }}
            >
              LOGIN
            </Button>
          </form>
          
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default LoginAdmin;
