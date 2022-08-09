import './styles.scss';
import ReactPlayer from "react-player"

function ResultsView(props) {
	return (
		<div className='results-container'>
			<label>Video TITLE HERE</label>
			<ReactPlayer url={`https://www.youtube.com/watch?v=${props.videoId}`} />
			<label>Views: {props.data.views}</label>
			<label>Video Length HERE</label>
			<br /><label hidden={!props.data.formattedTime.centuries}>{props.data.formattedTime.centuries} centuries</label>
			<br /><label hidden={!props.data.formattedTime.decades}>{props.data.formattedTime.decades} decades</label>
			<br /><label hidden={!props.data.formattedTime.years}>{props.data.formattedTime.years} years</label>
			<br /><label hidden={!props.data.formattedTime.months}>{props.data.formattedTime.months} months</label>
			<br /><label hidden={!props.data.formattedTime.days}>{props.data.formattedTime.days} days</label>
			<br /><label hidden={!props.data.formattedTime.hours}>{props.data.formattedTime.hours} hours</label>
			<br /><label hidden={!props.data.formattedTime.minutes}>{props.data.formattedTime.minutes} minutes</label>
			<br /><label hidden={!props.data.formattedTime.seconds}>{props.data.formattedTime.seconds} seconds</label>
		</div>
	);
  }
  
  export default ResultsView;
  
		 
		 