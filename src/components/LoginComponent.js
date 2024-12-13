import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../css/animatedBackground.css'; // Importa el CSS del fondo animado
import MovableSquare from './MovableSquare'; // Importa el nuevo componente

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1E1E1E',
        },
        primary: {
            main: '#BB86FC',
        },
        secondary: {
            main: '#03DAC6',
        },
        text: {
            primary: '#E0E0E0',
            secondary: '#A0A0A0',
        },
    },
});

function LoginComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const [count, setCount] = useState(0);
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(username, password);
            const { token, userId, type } = response;
            const fullToken = `${type} ${token}`;

            await login(fullToken, userId, username);
            navigate('/chat-layout');
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                setError('Error desconocido. Intenta nuevamente más tarde.');
            }
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" align="center">Iniciar Sesión</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Contraseña"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && <Typography color="error">{error}</Typography>}
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                Iniciar Sesión
                            </Button>
                        </form>
                    </CardContent>
                </Card>
          <div className="example-container">
            <MovableSquare key={count} />
          </div>
            </Container>
        </ThemeProvider>
    );
}

export default LoginComponent;