import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function ProgressBarWithLabel(props) {
	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={{ width: '100%', mr: 1 }}>
					<LinearProgress color='success' variant='determinate' {...props} />
				</Box>
				<Box sx={{ minWidth: 35 }}>
					<Typography variant='body2' color='text.primary'>{`${Math.round(
						props.value
					)}%`}</Typography>
				</Box>
			</Box>
		</Box>
	);
}
