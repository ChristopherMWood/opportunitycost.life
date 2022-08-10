import StylizedInput from '../../components/stylizedInput';
import React, { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom";
import './styles.scss';
import { YouTubeUrlInputValidator } from '../../domain/urlValidator';
import { OpportunityCostApiProxy } from '../../domain/opportunityCostApiProxy';
import ResultsView from '../../components/resultsView';
import { useLoading, Audio } from '@agney/react-loading';
import { useSearchParams } from "react-router-dom";

function HomePage(props) {
	const [firstPageLoad, setFirstPageLoad] = useState(true);
	const [resultsLoaded, setResultsLoaded] = useState(false);
	const [loadedViaUrl, setLoadedViaUrl] = useState(false);
	const [resultsData, setResultsData] = useState(null);
	const [videoId, setVideoId] = useState(null);
	const [initialInputValue, setInitialInputValue] = useState(undefined);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const videoId = searchParams.get('v');

		if (videoId && videoId.length > 0 && firstPageLoad) {
			setVideoId(videoId);
			setLoadedViaUrl(true);
			setFirstPageLoad(false);
			const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
			setInitialInputValue(videoUrl);
			onSuccessfulSubmit(videoUrl, false);
		}
	}, []);

	const onSuccessfulSubmit = (videoUrl, manual = true) => {
		const videoId = YouTubeUrlInputValidator.getVideoIdFromUrl(videoUrl);
		OpportunityCostApiProxy.getMetadata(videoId, (data) => {
			console.log(data);
			setResultsData(data);
			setVideoId(videoId);
			setResultsLoaded(true);

			if (manual) {
				setSearchParams({v: videoId});
			}
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
		<div className='site-page-container home-page-container'>
			<div className={resultsLoaded ? "collapsable collapsed" : "collapsable"} hidden={loadedViaUrl}>
				<h1>YouTube Opportunity Cost Calculator</h1>
			</div>
			<div className='input-container'>
				<StylizedInput initialValue={initialInputValue} placeholderText="Enter YouTube URL" onSuccess={onSuccessfulSubmit} inputValidator={validateYouTubeUrlInput}/>
			</div>
			<div className={resultsLoaded ? "collapsable collapsed" : "collapsable"} hidden={loadedViaUrl}>
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
  
           
		 
		 