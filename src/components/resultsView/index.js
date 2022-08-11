import './styles.scss';
import { Box, Stack, Container } from '@mui/system';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
			<Box>
				<Stack>
					<Container>
						<h2>Opportunity Cost of "{props.data.videoMeta.title}"</h2>
						<div className='opportunity-cost-block-container'>
							{getCostBlockComponents(props.data.videoMeta.opportunityCost)}
						</div>
					</Container>
					<Container>
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
					</Container>
					<Container>
						<h2>Depressing Stats for Fun</h2>
					</Container>
				</Stack>
			</Box>
		</div>
	);
  }
  
  export default ResultsView;
  
		 
		 