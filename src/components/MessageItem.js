import React, { useState } from 'react';
import { ListItem, IconButton, Box, Typography, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';

const MessageItem = ({ message, currentUser, messages, setReplyingTo, handleDeleteMessage }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isCurrentUser = message.senderId === Number(currentUser.id);

    // Encuentra el mensaje original al que se está respondiendo, si existe
    const originalMessage = message.replyTo ? messages.find(msg => msg.id === message.replyTo) : null;

    return (
        <ListItem
            align={isCurrentUser ? 'right' : 'left'}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{ justifyContent: isCurrentUser ? 'flex-end' : 'flex-start' }} // Align based on user
        >

            <Paper sx={{
                padding: '8px 12px',
                maxWidth: '45%',
                borderRadius: '7.5px',
                boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
            }}>
                <Typography variant="caption" sx={{ marginBottom: 0.5 }}>{message.senderName}</Typography>
                {originalMessage && (
                    <Box sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        borderRadius: '7.5px',
                        padding: '4px 8px',
                        marginBottom: '4px',
                        borderLeft: '4px solid #a225d3',
                    }}>
                        
                        <Typography variant="caption" sx={{ color: '#a225d3', fontWeight: 'bold' }}>
                            {originalMessage.senderName}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.85em' }}>
                            {originalMessage.content.length > 50
                                ? originalMessage.content.substring(0, 50) + '...'
                                : originalMessage.content}
                        </Typography>
                    </Box>
                )}

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: isCurrentUser ? 'row-reverse' : 'row', // Change direction based on user
                }}>
                    <Typography variant="body1" sx={{
                        whiteSpace: 'pre-wrap', // Para mantener los saltos de línea si los hay
                        overflowWrap: 'break-word', // Para permitir que las palabras largas se ajusten
                        wordBreak: 'break-word', // Si la palabra es demasiado larga, se corta
                        maxWidth: '99%', // Allow more width for the message
                        wordWrap: 'break-word', // Asegurarse de que las palabras largas se ajusten
                    }}>
                        {message.content}
                    </Typography>
                    <Box sx={{
                        alignItems: 'center',
                        marginLeft: isCurrentUser ? 1 : 0,
                        marginRight: isCurrentUser ? 0 : 1,
                        minWidth: '70px', // Space reserved for icons
                        minHeight: '30px'
                    }}>
                        {isHovered && (
                            <>
                                {isCurrentUser && (
                                    <IconButton onClick={() => handleDeleteMessage(message.id)} size="small">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                )}
                                <IconButton onClick={() => setReplyingTo(message)} size="small">
                                    <ReplyIcon fontSize="small" />
                                </IconButton>
                            </>
                        )}
                    </Box>
                </Box>
            </Paper>
        </ListItem>
    );
};

export default MessageItem;
