import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const MessageBubble = ({ message }) => {
    return (
        <Paper sx={{
            padding: 1,
            maxWidth: '70%', // Limitar el ancho máximo
            wordWrap: 'break-word', // Permitir el ajuste de palabras largas
            overflowWrap: 'break-word', // Permitir el ajuste de palabras largas
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fondo sutil para diferenciar
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                whiteSpace: 'pre-wrap', // Permitir el ajuste de líneas
            }}>
                <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                    {message.content}
                </Typography>
            </Box>
            <Typography variant="caption" display="block">
                {new Date(message.timestamp).toLocaleString()}
            </Typography>
        </Paper>
    );
};

export default MessageBubble;