
import React from 'react';
import { List, Typography, Box, CircularProgress } from '@mui/material';
import MessageItem from './MessageItem';

const MessageList = ({ messages, loading, currentUser, setReplyingTo, handleDeleteMessage, messagesEndRef }) => {
    
    return (
        <List>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                </Box>
            ) : messages.length === 0 ? (
                <Typography variant="body2" align="center" sx={{ mt: 2, color: 'text.secondary' }}>
                    No hay mensajes en este chat.
                </Typography>
            ) : (
                messages.map((message) => (
                    <MessageItem
                        key={message.id}
                        message={message}
                        currentUser={currentUser}
                        setReplyingTo={setReplyingTo}
                        handleDeleteMessage={handleDeleteMessage} // Pasar la función de eliminar
                        messages={messages}
                    />
                ))
            )}
            <div ref={messagesEndRef} />
        </List>
    );
};

export default MessageList;