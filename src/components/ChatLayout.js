import React, { useState } from 'react';
import {
  Box, Typography, List, ListItem, ListItemButton,
  ListItemText, TextField, InputAdornment, CircularProgress, ThemeProvider, createTheme,Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ChatComponent from './ChatComponent';

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

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 300,
  height: '100vh',
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  flexShrink: 0, // Evita que se reduzca el tamaño de la barra lateral
}));

const LogoutButton = styled(Button)(({ theme }) => ({ //boton para el logOut
  margin: 'auto',
  marginBottom: theme.spacing(2),
  color: theme.palette.secondary.main,
}));

const ChatContainer = styled(Box)({
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto', // Permite el desplazamiento si el contenido es grande
});

const ChatLayout = ({ chats, fetchMessages, currentUser,onLogout }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChatClick = (chatId) => {
    setSelectedChat(chatId);
    setLoading(true);
    fetchMessages(chatId).finally(() => setLoading(false));
  };

  const filteredChats = chats.filter(chat =>
    chat.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
        <SidebarContainer>
          <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider', color: 'text.primary' }}>
            Chats
          </Typography>
          <TextField
            placeholder="Buscar chats"
            variant="outlined"
            size="small"
            sx={{
              m: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiInputBase-input': {
                color: 'text.primary',
              },
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
          <List sx={{ flexGrow: 1, overflow: 'auto' }}>
            {filteredChats.map((chat) => (
              <ListItem disablePadding key={chat.id}>
                <ListItemButton
                  selected={selectedChat === chat.id}
                  onClick={() => handleChatClick(chat.id)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(187, 134, 252, 0.12)',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  <ListItemText
                    primary={chat.username}
                    sx={{
                      '& .MuiListItemText-primary': {
                        color: 'text.primary'
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <LogoutButton variant="outlined" onClick={onLogout}>
            Cerrar sesión
          </LogoutButton>
        </SidebarContainer>
        <ChatContainer>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : selectedChat ? (
            <ChatComponent currentUser={currentUser} selectedChat={selectedChat} />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography variant="h5" color="text.secondary">
                Selecciona un chat para comenzar.
              </Typography>
            </Box>
          )}
        </ChatContainer>
      </Box>
    </ThemeProvider>
  );
};

export default ChatLayout;