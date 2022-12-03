import './styles.scss';
import React, { useState } from 'react';
import { Box, Stack, Container } from '@mui/system';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import copy from 'copy-to-clipboard';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CostBlocks from '../costBlocks/costBlocks';
import EventCostBlocks from '../eventCostBlocks/eventCostBlocks';
import { Typography } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function VideoResultsView(props) {
	const [copiedToClipboardOpen, setCopiedToClipboardOpen] = useState(false);

	const copyUrlToClipboard = event => {
		event.preventDefault();

		if (!copiedToClipboardOpen) {
			copy(window.location.href);
			setCopiedToClipboardOpen(true);
		}
	};

	const handleShareNotificationClose = () => {
		setCopiedToClipboardOpen(false);
	};

	return (
		<div className='results-container'>
			<Box>
				<Stack spacing={5}>
					<Container>
						<Stack direction='row' justifyContent='center' spacing={2}>
							<Button
								onClick={copyUrlToClipboard}
								variant='outlined'
								startIcon={<ShareIcon />}
								sx={{ color: '#FFFFFF' }}
							>
								Share
							</Button>
							<Button
								onClick={props.onReset}
								variant='contained'
								endIcon={<RestartAltIcon />}
							>
								Reset
							</Button>
						</Stack>
						<Snackbar
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							open={copiedToClipboardOpen}
							onClose={handleShareNotificationClose}
							message='URL Copied to Clipboard'
							autoHideDuration={3000}
						>
							<Alert
								onClose={handleShareNotificationClose}
								severity='success'
								sx={{ width: '100%', color: '#FFFFFF' }}
							>
								URL Copied to Clipboard!
							</Alert>
						</Snackbar>
					</Container>
					<Link
						href={'https://www.youtube.com/watch?v=' + props.videoId}
						target='_blank'
						rel='noreferrer'
						variant='h4'
						align='center'
					>
						{'Opportunity cost of "' + props.data.videoMeta.title + '"'}
						<OpenInNewIcon fontSize='medium' sx={{ marginLeft: '10px' }} />
					</Link>
					<Typography align='center' variant='h5'>
						~ #{props.data.videoMeta.rank} worst video so far calculated ~
					</Typography>
					<CostBlocks totalSeconds={props.data.videoMeta.opportunityCost} />
					<EventCostBlocks
						totalSeconds={props.data.videoMeta.opportunityCost}
					/>
				</Stack>
			</Box>
		</div>
	);
}

export default VideoResultsView;
