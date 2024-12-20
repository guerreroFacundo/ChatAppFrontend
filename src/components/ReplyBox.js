import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ReplyBox = ({ replyingTo, setReplyingTo }) => {
    if (!replyingTo) return null;

    return (
        <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 2, borderRadius: '8px', marginLeft: 1,marginRight: 15 }}>
            <Typography variant="body2" color="text.primary">
                Respondiendo a: {replyingTo.content}
            </Typography>
            <Button onClick={() => setReplyingTo(null)} size="small" color="error">
                Cancelar
            </Button>
        </Box>
    );
};

export default ReplyBox;