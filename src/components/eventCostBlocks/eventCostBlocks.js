import { Stack, Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import SchoolIcon from '@mui/icons-material/School';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HotelIcon from '@mui/icons-material/Hotel';
import WeekendIcon from '@mui/icons-material/Weekend';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import { abbreviateNumber } from 'js-abbreviation-number';
import { CostInSeconds } from '../../domain/costTypes';
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
	const roundedCostValue = Math.floor(rawCostValue);
	const abbreviatedValue = abbreviateNumber(roundedCostValue);

	if (rawCostValue >= 1) {
		return (
			<div key={index}>
				<Stack direction='row' justifyContent='start' spacing={3}>
					{item.icon}
					<Stack className='specific-cost-block' justifyContent='center'>
						<label className='specific-cost-number'>{abbreviatedValue}</label>
						<label className='specific-cost-label'>{item.name}</label>
					</Stack>
					<Stack direction='row'>
						<p>{item.description}</p>
					</Stack>
				</Stack>
			</div>
		);
	}

	return null;
};

const EventCostBlocks = props => {
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
			<Typography variant='h3'>Stats for Fun</Typography>
			<Stack spacing={5}>{getSpecificOpportunityCosts()}</Stack>
		</Container>
	);
};

export default EventCostBlocks;
