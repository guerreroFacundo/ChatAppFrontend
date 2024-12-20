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
                messages.reduce((acc, message, index) => {
                    const messageDate = new Date(message.timestamp).toLocaleDateString();
                    const previousMessageDate = index > 0 ? new Date(messages[index - 1].timestamp).toLocaleDateString() : null;

                    if (messageDate !== previousMessageDate) {
                        acc.push(
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }} key={`date-${message.id}`}>
                                <Typography variant="caption" color="text.secondary">
                                    {messageDate}
                                </Typography>
                            </Box>
                        );
                    }

                    acc.push(
                        <MessageItem
                            key={message.id}
                            message={message}
                            currentUser={currentUser}
                            setReplyingTo={setReplyingTo}
                            handleDeleteMessage={handleDeleteMessage}
                            messages={messages}
                        />
                    );

                    return acc;
                }, [])
            )}
            <div ref={messagesEndRef} />
        </List>
    );
};

export default MessageList;
