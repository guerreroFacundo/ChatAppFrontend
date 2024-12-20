import React, { useState } from 'react';
import { Box } from '@mui/material';
import StyledTextField from './StyledTextField';
import StyledButton from './StyledButton';
import SendIcon from '@mui/icons-material/Send';
import Picker from '@emoji-mart/react'

const InputArea = ({ newMessage, setNewMessage, handleSendMessage }) => {
    const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);


    const toggleEmojiPicker = () => {
        setEmojiPickerVisible((prev) => !prev);
    };

    const handleChange = (e) => {
        setNewMessage(e.target.value);
    };


    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const handleEmojiSelect = (emoji) => {
        setNewMessage((prevMessage) => prevMessage + emoji.native); // Agregar emoji al mensaje
        setEmojiPickerVisible(false); // Cerrar el picker después de seleccionar un emoji
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
            <StyledTextField
                variant="outlined"
                value={newMessage} // Mostrar el mensaje con emojis
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Escribe un mensaje..."
            />
            <StyledButton onClick={toggleEmojiPicker} style={{ marginRight: '8px' }}>
                😊
            </StyledButton>
            {isEmojiPickerVisible && (
                <div style={{ position: 'absolute', bottom: '70px', right: '20px' }}>
                    <Picker id="EmojiPicker" name="EmojiPicker" onEmojiSelect={handleEmojiSelect} emojiSize={32}  />
                </div>
            )}
            <StyledButton onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <SendIcon />
            </StyledButton>
        </Box>
    );
};

export default InputArea;
