import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingIndicator = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
    </Box>
);

export default LoadingIndicator;