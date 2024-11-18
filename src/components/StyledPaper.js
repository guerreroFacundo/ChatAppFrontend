import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const StyledPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    backgroundColor: theme.palette.background.default,
}));

export default StyledPaper;