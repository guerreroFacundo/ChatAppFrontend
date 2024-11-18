import React, { useState } from 'react';
import { ListItem, IconButton, Box, Typography } from '@mui/material';
import MessageBubble from './MessageBubble';
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
            sx={{ justifyContent: isCurrentUser ? 'flex-end' : 'flex-start' }} // Alinear según el usuario
        >
            <Box sx={{
                mx: 1,
                maxWidth: '70%',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
            }}>
                <Typography variant="caption" sx={{ marginBottom: 0.5 }}>{message.senderName}</Typography>
                {originalMessage && (
                    <Box sx={{
                        backgroundColor: 'rgba(117, 117, 117, 0.8)', // Color de fondo más suave
                        borderRadius: '8px',
                        padding: '4px',
                        marginBottom: '8px',
                        maxWidth: '100%', // Asegúrate de que el mensaje original no se desborde
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                    }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                            Respondiendo a <strong>{originalMessage.senderName}:</strong>
                        </Typography>
                        <Typography variant="body2" sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                            {originalMessage.content}
                        </Typography>
                    </Box>
                )}

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: isCurrentUser ? 'row-reverse' : 'row', // Cambiar dirección según el usuario
                }}>
                    <MessageBubble message={message} />
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: isCurrentUser ? 1 : 0,
                        marginRight: isCurrentUser ? 0 : 1,
                        minWidth: '60px', // Espacio reservado para los íconos
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
            </Box>
        </ListItem>
    );
};

export default MessageItem;