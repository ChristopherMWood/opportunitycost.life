import './styles.scss';
import ReactPlayer from "react-player"
import CountUp from 'react-countup';
import { ParsingHelpers } from '../../domain/parsingHelpers';

const specificOpportunityCosts = [
	{ costPer: 23, description: '' }
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


const specificCostBlock = (value, description) => {
	return (
		<div className='specific-cost-block'>
			<label>{value}</label>
			<p>{description}</p>
		</div>
	);
  };

function ResultsView(props) {

	const getCostBlockComponents = (totalSeconds) => {
		const costBlocks = [];
		const formattedTime = ParsingHelpers.getTimeFromTotalSeconds(totalSeconds);

		//ADD KEY TO ALL REACT ELEMENTS BEING GENERATED HERE
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

	const getSpecificOpportunityCosts =() => {
		const specificCost = [];

		specificCost.push(specificCostBlock('1k', 'College educations worth of time were spent'));

		return specificCost;
	};

	return (
		<div className='results-container'>
			<h3>{props.data.videoMeta.title}</h3>
			<h3>Total Opportunity Cost by Time</h3>
			<div className='opportunity-cost-block-container'>
				{getCostBlockComponents(props.data.videoMeta.opportunityCost)}
			</div>
			{/* <div className='video-stats-container'>
				<label>Total Views: {props.data.views}</label>
			</div> */}
			{/* <div className='video-player-container'>
				<ReactPlayer
					className='react-player'
					url={'https://www.youtube.com/watch?v=9mLohuOI0pA'}
					width='100%'
					height='100%'
					controls={true}
					/>
			</div> */}
			{/* <h3>Depressing Stats for Fun</h3>
			<div className='opportunity-cost-block-container'>
				{getSpecificOpportunityCosts()}
			</div> */}
		</div>
	);
  }
  
  export default ResultsView;
  
		 
		 