import './styles.scss';
import React, { useState } from 'react';
import { Box, Stack, Container } from '@mui/system';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactPlayer from "react-player"
import Button from '@mui/material/Button';
import { white } from '@mui/material/colors';

import ShareIcon from '@mui/icons-material/Share';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import copy from "copy-to-clipboard";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import CostBlocks from '../costBlocks/costBlocks'
import EventCostBlocks from '../eventCostBlocks/eventCostBlocks'

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function ResultsView(props) {
	const [copiedToClipboardOpen, setCopiedToClipboardOpen] = useState(false);

	const copyUrlToClipboard = (event) => {
		event.preventDefault();

		if (!copiedToClipboardOpen) {
			copy(window.location.href);
			setCopiedToClipboardOpen(true);
		}
	}

	const handleShareNotificationClose = () => {
		setCopiedToClipboardOpen(false);
	}

	return (
		<div className='results-container'>
			<Box>
				<Stack spacing={5}>
					<Container>
						<Stack direction="row" justifyContent="center" spacing={2}>
							<Button onClick={copyUrlToClipboard} variant="outlined" startIcon={<ShareIcon />}>
								Share
							</Button>
							<Button onClick={props.onReset} variant="contained" endIcon={<RestartAltIcon />}>
								Reset
							</Button>
						</Stack>
						<Snackbar
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							open={copiedToClipboardOpen}
							onClose={handleShareNotificationClose}
							message="URL Copied to Clipboard"
							autoHideDuration={3000}
						>
							<Alert onClose={handleShareNotificationClose} severity="success" sx={{ width: '100%' }}>
								URL Copied to Clipboard!
							</Alert>
						</Snackbar>
					</Container>
					<CostBlocks totalSeconds={props.data.videoMeta.opportunityCost} title={'Opportunity cost of "' + props.data.videoMeta.title + '"'} />
					<EventCostBlocks totalSeconds={props.data.videoMeta.opportunityCost} />
					{/* <Container>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />} >
								<Typography>Video Details</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<div className='video-details-container'>
									<Typography>Title: {props.data.videoMeta.title}</Typography>
									<Typography>Views: {props.data.videoMeta.lengthSeconds}</Typography>
									<Typography>Views: {props.data.videoMeta.views}</Typography>

									<Typography>Channel: {props.data.channelMeta.name}</Typography>
								</div>
								<div className='video-player-container'>
									<ReactPlayer
										className='react-player'
										url={`https://www.youtube.com/watch?v=${props.data.videoMeta.id}`}
										width='100%'
										height='100%'
										controls={true}
										/>
								</div>
							</AccordionDetails>
						</Accordion>
					</Container> */}
				</Stack>
			</Box>
		</div>
	);
  }
  
  export default ResultsView;
  
		 
		 