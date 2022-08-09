import StylizedInput from '../../components/stylizedInput';
import React, { useState } from 'react';
import './styles.scss';
import { YouTubeUrlInputValidator } from '../../domain/urlValidator';
import { OpportunityCostApiProxy } from '../../domain/opportunityCostApiProxy';
import ResultsView from '../../components/resultsView';

function HomePage(props) {
	const [resultsLoaded, setResultsLoaded] = useState(false);
	const [resultsData, setResultsData] = useState(null);
	const [videoId, setVideoId] = useState(null);

	const onSuccessfulSubmit = (videoUrl) => {
		const videoId = YouTubeUrlInputValidator.getVideoIdFromUrl(videoUrl);
		OpportunityCostApiProxy.getMetadata(videoId, (data) => {
			console.log(data);
			setResultsData(data);
			setVideoId(videoId);
			setResultsLoaded(true);
		}, (error) => {
			alert(error);
		});
	}

	const validateYouTubeUrlInput = (inputValue) => {
		if (YouTubeUrlInputValidator.isValidHttpUrl(inputValue)){
			const videoId = YouTubeUrlInputValidator.getVideoIdFromUrl(inputValue);
			return videoId !== undefined && videoId !== null && videoId.length > 0;
		}

		return false;
	}

	return (
		<div className='site-page-container'>
			<div className={resultsLoaded ? "collapsable collapsed" : "collapsable"}>
				<h1>YouTube Opportunity Cost Calculator</h1>
			</div>
			<div className='input-container'>
				<StylizedInput placeholderText="Enter YouTube URL" onSuccess={onSuccessfulSubmit} inputValidator={validateYouTubeUrlInput}/>
			</div>
			<div className={resultsLoaded ? "collapsable collapsed" : "collapsable"}>
				<p className="definition">
					<b>opportunity cost (noun)</b> - 
					<br /><b>1.</b> The cost of an opportunity forgone (and the loss of the benefits that could be received from that opportunity); the most valuable forgone alternative.
					<br /><b>2.</b> cost in terms of foregoing alternatives
				</p>
			</div>
			{resultsLoaded &&
				<ResultsView data={resultsData} videoId={videoId} />
			}
		</div>
	);
  }
  
  export default HomePage;
  
           
		 
		 