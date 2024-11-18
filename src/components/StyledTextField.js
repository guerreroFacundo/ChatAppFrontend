import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const StyledTextField = styled(TextField)(({ theme }) => ({
    flexGrow: 1,
    marginRight: theme.spacing(1),
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        '& fieldset': {
            borderColor: theme.palette.divider,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
}));

export default StyledTextField;