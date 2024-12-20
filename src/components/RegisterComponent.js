import React, { useState } from 'react';
import { Alert } from '@mui/material'; // Import Alert component
import { TextField, Button, Container, Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

const RegisterComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register({ username, password, email });
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set specific error message from backend
            } else {
                setErrorMessage('Registration failed. Please try again.'); // Set generic error message
            }
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" align="center">Registrarse</Typography>
                        <form onSubmit={handleSubmit}>
                            {errorMessage && <Alert severity="error">{errorMessage}</Alert>} {/* Display error message */}
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
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>
                                Registrarse
                            </Button>
                        </form>
                        <Button 
                            fullWidth 
                            variant="outlined" 
                            color="secondary" 
                            onClick={() => navigate('/login')}
                            sx={{ marginTop: 2 }} // Add margin to separate the buttons
                        >
                            Volver a Iniciar Sesión
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        </ThemeProvider>
    );
};
export default RegisterComponent;

