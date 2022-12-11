import React from 'react';
import { Stack, Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import SchoolIcon from '@mui/icons-material/School';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HotelIcon from '@mui/icons-material/Hotel';
import WeekendIcon from '@mui/icons-material/Weekend';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import { CostInSeconds } from '../../domain/costTypes';
import EventCostBlock from '../eventCostBlock/eventCostBlock';
import Popover from '@mui/material/Popover';
import './styles.scss';

const iconFontSize = 60;

const specificOpportunityCosts = [
	{
		name: 'Human Lives',
		icon: (
			<EmojiPeopleIcon sx={{ fontSize: iconFontSize, color: 'icon.primary' }} />
		),
		costPer: CostInSeconds.AverageHumanLife,
		description:
			'The average human lifespan across the world is 72.3 years old.',
	},
	{
		name: 'Bachelor Degrees',
		icon: <SchoolIcon sx={{ fontSize: iconFontSize, color: 'icon.primary' }} />,
		costPer: CostInSeconds.BachelorDegree,
		description:
			'This is the total number of 4 year Bachelor degrees that could have been earned.',
	},
	{
		name: 'Pregnancies',
		icon: (
			<PregnantWomanIcon
				sx={{ fontSize: iconFontSize, color: 'icon.primary' }}
			/>
		),
		costPer: CostInSeconds.Pregnancy,
		description:
			'Total children that could have been conceived and birthed in 9 months.',
	},
	{
		name: 'Weekends',
		icon: (
			<WeekendIcon sx={{ fontSize: iconFontSize, color: 'icon.primary' }} />
		),
		costPer: CostInSeconds.Weekend,
		description:
			'The number of full two day, Saturday and Sunday, weekends. Why spend time with Friends and Family when you can just watch YouTube?',
	},
	{
		name: 'Full Nights of Sleep',
		icon: <HotelIcon sx={{ fontSize: iconFontSize, color: 'icon.primary' }} />,
		costPer: CostInSeconds.NightOfSleep,
		description: 'The total number of full 8 hour nights of sleep. ',
	},
	{
		name: 'Football Games',
		icon: (
			<SportsFootballIcon
				sx={{ fontSize: iconFontSize, color: 'icon.primary' }}
			/>
		),
		costPer: CostInSeconds.FootballGame,
		description: `${''}Did you know the average game of American Football is 3 hours long? Because I didn't until writing this.`,
	},
];

const specificCostBlock = (item, videoOpportunityCost, index) => {
	const rawCostValue = videoOpportunityCost / item.costPer;

	if (rawCostValue >= 1) {
		return (
			<EventCostBlock
				key={index}
				item={item}
				totalOpportunityCost={videoOpportunityCost}
			/>
		);
	}

	return null;
};

const EventCostBlocks = props => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const showPopover = Boolean(anchorEl);
	const id = showPopover ? 'simple-popover' : undefined;

	const onAboutClicked = () => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const getSpecificOpportunityCosts = () => {
		const specificCost = [];

		specificOpportunityCosts.forEach((item, index) => {
			specificCost.push(specificCostBlock(item, props.totalSeconds, index));
		});

		// let shuffled = specificCost
		// 	.map(value => ({ value, sort: Math.random() }))
		// 	.sort((a, b) => a.sort - b.sort)
		// 	.map(({ value }) => value)

		// return shuffled;

		return specificCost;
	};

	return (
		<Container>
			<Typography variant='h4' align='center'>
				Additional Stats{' '}
				<InfoIcon className='info-icon' onClick={onAboutClicked} />
				<Popover
					id={id}
					open={showPopover}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
				>
					<Box sx={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
						<Typography>Cost Units</Typography>
						<Divider sx={{backgroundColor: 'white', height: 2}} />
						<Typography>K = Thousand (10<sup>3</sup>)</Typography>
						<Typography>M = Million (10<sup>6</sup>)</Typography>
						<Typography>B = Billion (10<sup>9</sup>)</Typography>
						<Typography>T = Tera (10<sup>12</sup>)</Typography>
						<Typography>P = Peta (10<sup>15</sup>)</Typography>
						<Typography>E = Exa (10<sup>18</sup>)</Typography>
					</Box>
				</Popover>
			</Typography>
			<Stack spacing={5}>{getSpecificOpportunityCosts()}</Stack>
		</Container>
	);
};

export default EventCostBlocks;
