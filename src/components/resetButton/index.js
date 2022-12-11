import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ResetButton = styled(Button)({
	boxShadow: 'none',
	textTransform: 'none',
	fontSize: 16,
	padding: '6px 12px',
	border: '1px solid',
	lineHeight: 1.5,
	backgroundColor: 'primary',
	borderColor: 'white',
	'&:hover': {
	  backgroundColor: 'darkred',
	  boxShadow: 'none',
	  borderColor: 'darkred'
	},
});

export default ResetButton;