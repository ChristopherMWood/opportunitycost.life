import './styles.scss';
import ReactPlayer from "react-player"
import CountUp from 'react-countup';

const specificOpportunityCosts = [
	{ costPer: 23, description: '' }
];

const costBlock = (value, singularUnit, pluralUnit) => {
	if (value > 0) {
		return (
			<div className='cost-block'>
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

	const getCostBlockComponents = (formattedTime) => {
		const costBlocks = [];

		//ADD KEY TO ALL REACT ELEMENTS BEING GENERATED HERE
		costBlocks.push(costBlock(props.data.formattedTime.centuries, 'Century', 'Centuries'));
		costBlocks.push(costBlock(props.data.formattedTime.decades, 'Decade', 'Decades'));
		costBlocks.push(costBlock(props.data.formattedTime.years, 'Year', 'Years'));
		costBlocks.push(costBlock(props.data.formattedTime.months, 'Month', 'Months'));
		costBlocks.push(costBlock(props.data.formattedTime.days, 'Day', 'Days'));
		costBlocks.push(costBlock(props.data.formattedTime.hours, 'Hour', 'Hours'));
		costBlocks.push(costBlock(props.data.formattedTime.minutes, 'Minute', 'Minutes'));
		costBlocks.push(costBlock(props.data.formattedTime.seconds, 'Second', 'Seconds'));

		return costBlocks;
	}

	const getSpecificOpportunityCosts =() => {
		const specificCost = [];

		specificCost.push(specificCostBlock('1k', 'College educations worth of time were spent'));

		return specificCost;
	};

	return (
		<div className='results-container'>
			<h3>Total Opportunity Cost by Time</h3>
			<div className='opportunity-cost-block-container'>
				{getCostBlockComponents(props.data.formattedTime)}
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
  
		 
		 