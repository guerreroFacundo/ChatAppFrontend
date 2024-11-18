import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginComponent({ setAuthToken, setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const baseURL = `${process.env.REACT_APP_API_BASE_URL}/api/users`;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/login`, {
        username,
        password,
      });

      const { token, username: loggedUsername, userId, type } = response.data;

      const fullToken = `${type} ${token}`;
      localStorage.setItem("authToken", fullToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", loggedUsername);
      setAuthToken(fullToken);
      setCurrentUser({ id: userId, username: loggedUsername });

      navigate('/chat-layout');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data;
        setError(errorMessage);
      } else {
        const status = error.response?.status;
        switch (status) {
          case 401:
            setError('Credenciales inválidas. Por favor, intenta nuevamente.');
            break;
          case 403:
            setError('Acceso denegado. No tienes permisos para realizar esta acción.');
            break;
          case 404:
            setError('Usuario no encontrado.');
            break;
          case 409:
            setError('Hubo un conflicto. El usuario ya existe o el correo electrónico ya está en uso.');
            break;
          case 500:
            setError('Ocurrió un error inesperado. Por favor, intenta más tarde.');
            break;
          default:
            setError('Error desconocido. Intenta nuevamente más tarde.');
            break;
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Inicia sesión en tu cuenta
          </Typography>
          {error && (
            <Typography color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Nombre de usuario"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Contraseña"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Iniciar sesión
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default LoginComponent;
