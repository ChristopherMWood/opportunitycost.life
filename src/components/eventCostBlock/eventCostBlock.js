import { Stack } from '@mui/system';
import Skeleton from '@mui/material/Skeleton';
import { abbreviateNumber } from 'js-abbreviation-number';
import './styles.scss';

function EventCostBlock(props) {
	const rawCostValue = props.totalOpportunityCost / props.item.costPer;
	const roundedCostValue = Math.floor(rawCostValue);
	const abbreviatedValue = abbreviateNumber(roundedCostValue);

	return (
		<div key={props.index}>
			<Stack direction='row' justifyContent='start' spacing={3}>
				{props.item.icon}
				<Stack className='specific-cost-block' justifyContent='center'>
					{props.totalOpportunityCost == 0 ? (
						<Skeleton variant='rectangular' width='100%' height='100%' />
					) : (
						<label className='specific-cost-number'>{abbreviatedValue}</label>
					)}
					<label className='specific-cost-label'>{props.item.name}</label>
				</Stack>
				<Stack direction='row'>
					<p>{props.item.description}</p>
				</Stack>
			</Stack>
		</div>
	);
}

export default EventCostBlock;
