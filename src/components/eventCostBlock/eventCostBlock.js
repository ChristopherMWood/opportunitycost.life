import { Stack, Box } from '@mui/system';
import Skeleton from '@mui/material/Skeleton';
import { abbreviateNumber } from 'js-abbreviation-number';
import { unitSymbols } from '../../domain/costHelpers';
import './styles.scss';
import { Typography } from '@mui/material';

function EventCostBlock(props) {
	const rawCostValue = props.totalOpportunityCost / props.item.costPer;
	const roundedCostValue = Math.floor(rawCostValue);
	const abbreviatedValue = abbreviateNumber(roundedCostValue, 1, { symbols: unitSymbols});

	return (
		<Stack spacing={2} direction='row' className='event-cost-block'>
			<Stack
				direction='row'
				className='event-cost-data-container'
				spacing={3}
				justifyContent='center'
			>
				<Box className='event-cost-icon-container'>{props.item.icon}</Box>
				<Stack className='event-cost-data-number-container' direction='column'>
					{props.totalOpportunityCost == 0 ? (
						<Skeleton variant='rectangular' width='100%' height='100%' />
					) : (
						<Typography align='center' className='event-cost-number'>
							{abbreviatedValue}
						</Typography>
					)}
					<label className='specific-cost-label'>{props.item.name}</label>
				</Stack>
			</Stack>
			<Box className='event-cost-context-container'>
				<Typography align='left'>{props.item.description}</Typography>
			</Box>
		</Stack>
	);
}

export default EventCostBlock;
