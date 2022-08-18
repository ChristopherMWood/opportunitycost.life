import { Container } from '@mui/system';
import CountUp from 'react-countup';
import { ParsingHelpers } from '../../domain/parsingHelpers';
import './styles.scss';

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

const CostBlocks = (props) => {

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

	return (
		<Container>
			<h2>{props.title}</h2>
			<div className='opportunity-cost-block-container'>
				{getCostBlockComponents(props.totalSeconds)}
			</div>
		</Container>
	)
};

export default CostBlocks;