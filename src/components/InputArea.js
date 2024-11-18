import React from 'react';
import { Box } from '@mui/material';
import StyledTextField from './StyledTextField';
import StyledButton from './StyledButton';
import SendIcon from '@mui/icons-material/Send';

const InputArea = ({ newMessage, setNewMessage, handleSendMessage }) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
            <StyledTextField
                variant="outlined"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Escribe un mensaje..."
            />
            <StyledButton onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <SendIcon />
            </StyledButton>
        </Box>
    );
};

export default InputArea;