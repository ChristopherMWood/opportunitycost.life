import './styles.scss';
import React, { useState } from 'react';
import { Box, Stack, Container } from '@mui/system';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactPlayer from "react-player"
import CountUp from 'react-countup';
import { ParsingHelpers } from '../../domain/parsingHelpers';
import Button from '@mui/material/Button';
import { white } from '@mui/material/colors';

import ShareIcon from '@mui/icons-material/Share';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import SchoolIcon from '@mui/icons-material/School';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HotelIcon from '@mui/icons-material/Hotel';
import WeekendIcon from '@mui/icons-material/Weekend';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';

import copy from "copy-to-clipboard";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { abbreviateNumber } from "js-abbreviation-number";
import { SportsFootball } from '@mui/icons-material';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const iconFontSize = 60;
  
const specificOpportunityCosts = [{ 
		name: 'Human Lives',
		icon: <EmojiPeopleIcon sx={{ fontSize: iconFontSize }} />,
		costPer: 2310016320, 
		description: 'The average human lifespan across the world is 72.3 years old.'
	}, { 
		name: 'Bachelor Degrees',
		icon: <SchoolIcon sx={{ fontSize: iconFontSize }} />,
		costPer: 126230400, 
		description: 'This is the total number of 4 year Bachelor degrees that could have been earned.' 
	}, { 
		name: 'Pregnancies',
		icon: <PregnantWomanIcon sx={{ fontSize: iconFontSize }} />,
		costPer: 23668200, 
		description: 'Total children that could have been conceived and birthed in 9 months.' 
	}, { 
		name: 'Weekends',
		icon: <WeekendIcon sx={{ fontSize: iconFontSize }} />,
		costPer: 172800, 
		description: 'The number of full two day, Saturday and Sunday, weekends. Why spend time with Friends and Family when you can just watch YouTube?'
	}, { 
		name: 'Full Nights of Sleep',
		icon: <HotelIcon sx={{ fontSize: iconFontSize }} />,
		costPer: 28800, 
		description: 'The total number of full 8 hour nights of sleep. '
	}, { 
		name: 'Football Games',
		icon: <SportsFootballIcon sx={{ fontSize: iconFontSize }} />,
		costPer: 10800, 
		description: 'Did you know the average game of American Football is 3 hours long? Because I didn\'t until writing this.'
	},
];

//TEMP for fix
var costBlockKey = 0;

const costBlock = (value, singularUnit, pluralUnit) => {
	if (value > 0) {
		costBlockKey++;

		return (
			<div className='cost-block' key={costBlockKey}>
				<CountUp className='cost-value' start={0} end={value} delay={0} duration={1.5} />
				<label className='cost-unit'>{value === 1 ? `${singularUnit}` : `${pluralUnit}`}</label>
			</div>
		);
	}

	return null;
  };


const specificCostBlock = (item, videoOpportunityCost, index) => {
	const rawCostValue = videoOpportunityCost/item.costPer;
	const roundedCostValue = Math.floor(rawCostValue);
	const abbreviatedValue = abbreviateNumber(roundedCostValue);

	if (rawCostValue >= 1) {
		return (
			<div key={index}>
				<Stack direction="row" justifyContent="start" spacing={3}>
					{item.icon}
					<Stack className="specific-cost-block" justifyContent="center">
						<label className='specific-cost-number'>{abbreviatedValue}</label>
						<label className='specific-cost-label'>{item.name}</label>
					</Stack>
					<Stack direction="row">
						<p>{item.description}</p>
					</Stack>
				</Stack>
			</div>
		);
	}

	return null;
  };

function ResultsView(props) {
	const [copiedToClipboardOpen, setCopiedToClipboardOpen] = useState(false);

	const getCostBlockComponents = (totalSeconds) => {
		const costBlocks = [];
		const formattedTime = ParsingHelpers.getTimeFromTotalSeconds(totalSeconds);

		//ADD KEY TO ALL REACT ELEMENTS BEING GENERATED HERE
		costBlocks.push(costBlock(formattedTime.millennium, 'Millennium', 'Millennia'));
		costBlocks.push(costBlock(formattedTime.centuries, 'Century', 'Centuries'));
		costBlocks.push(costBlock(formattedTime.decades, 'Decade', 'Decades'));
		costBlocks.push(costBlock(formattedTime.years, 'Year', 'Years'));
		costBlocks.push(costBlock(formattedTime.months, 'Month', 'Months'));
		costBlocks.push(costBlock(formattedTime.days, 'Day', 'Days'));
		costBlocks.push(costBlock(formattedTime.hours, 'Hour', 'Hours'));
		costBlocks.push(costBlock(formattedTime.minutes, 'Minute', 'Minutes'));
		costBlocks.push(costBlock(formattedTime.seconds, 'Second', 'Seconds'));

		return costBlocks;
	}

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

	const getSpecificOpportunityCosts = (e) => {
		const specificCost = [];

		specificOpportunityCosts.forEach((item, index) => {
			specificCost.push(specificCostBlock(item, props.data.videoMeta.opportunityCost, index));
		});

		// let shuffled = specificCost
		// 	.map(value => ({ value, sort: Math.random() }))
		// 	.sort((a, b) => a.sort - b.sort)
		// 	.map(({ value }) => value)

		// return shuffled;

		return specificCost;
	};

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
					<Container>
						<h2>Opportunity Cost of "{props.data.videoMeta.title}"</h2>
						<div className='opportunity-cost-block-container'>
							{getCostBlockComponents(props.data.videoMeta.opportunityCost)}
						</div>
					</Container>
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
					<Container>
						<Typography variant="h3">Stats for Fun</Typography>
						<Stack spacing={5}>
							{getSpecificOpportunityCosts(props.data.videoMeta.opportunityCost)}
						</Stack>
					</Container>
				</Stack>
			</Box>
		</div>
	);
  }
  
  export default ResultsView;
  
		 
		 