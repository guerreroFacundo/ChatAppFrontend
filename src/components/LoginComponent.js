import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../css/animatedBackground.css'; // Importa el CSS del fondo animado

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
                            <InputLabel required>Usuario</InputLabel>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{ marginBottom: 2 }} // Add margin to separate inputs
                            />
                            <InputLabel required>Contraseña</InputLabel>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ marginBottom: 2 }} // Add margin to separate inputs
                            />
                            {error && <Typography color="error">{error}</Typography>}
                            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>
                                Iniciar Sesión
                            </Button>
                        </form>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={() => navigate('/register')}
                            sx={{ marginTop: 2 }} // Add margin to separate the buttons
                        >
                            Registrarse
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        </ThemeProvider>
    );
}

export default LoginComponent;