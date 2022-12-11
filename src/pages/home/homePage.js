import SingleFieldInputForm from '../../components/singleFieldInputForm';
import { useState, useEffect } from 'react';
import { Stack, Container } from '@mui/system';
import './styles.scss';
import { YouTubeUrlInputValidator } from '../../domain/urlValidator';
import { OpportunityCostApiProxy } from '../../domain/opportunityCostApiProxy';
import VideoResultsView from '../../components/videoResultsView';
import { useSearchParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import ChannelResultsView from '../../components/channelResultsView';

const animateSpeed = 1000;

function HomePage() {
	const [firstPageLoad, setFirstPageLoad] = useState(true);
	const [loading, setLoading] = useState(false);
	const [resultsLoaded, setResultsLoaded] = useState(false);
	const [loadedViaUrl, setLoadedViaUrl] = useState(false);
	const [resultsData, setResultsData] = useState(null);
	const [videoId, setVideoId] = useState(null);
	const [channelId, setChannelId] = useState(null);
	const [urlInputValue, setUrlInputValue] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const videoId = searchParams.get('v');
		const channelId = searchParams.get('c');

		if (videoId && videoId.length > 0 && firstPageLoad) {
			setVideoId(videoId);
			setLoadedViaUrl(true);
			setFirstPageLoad(false);
			const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
			setUrlInputValue(videoUrl);
			onYouTubeUrlSubmit(videoUrl, false);
		} else if (channelId && channelId.length > 0 && firstPageLoad) {
			setLoadedViaUrl(true);
			setFirstPageLoad(false);
			loadChannelData(channelId);
		}
	}, [location]);

	const onResultsReset = () => {
		setLoadedViaUrl(false);
		setResultsLoaded(false);
		setResultsData(null);
		setUrlInputValue('');
		setVideoId(null);
		setChannelId(null);

		if (searchParams.has('v')) {
			searchParams.delete('v');
			setSearchParams(searchParams);
		}

		if (searchParams.has('c')) {
			searchParams.delete('c');
			setSearchParams(searchParams);
		}
	};

	const updateInput = e => {
		setUrlInputValue(e.target.value);
	};

	const onYouTubeUrlSubmit = (videoUrl, manual = true) => {
		setLoading(true);

		const videoId = YouTubeUrlInputValidator.parseYouTubeVideoId(videoUrl);

		if (videoId) {
			OpportunityCostApiProxy.getVideoMetadata(
				videoId,
				data => {
					setResultsData(data);
					setVideoId(videoId);
					setResultsLoaded(true);
					setLoading(false);

					if (manual) {
						setSearchParams({ v: videoId });
					}
				},
				error => {
					console.log(error);
				}
			);
		}
	};

	const validateYouTubeUrlInput = inputValue => {
		if (YouTubeUrlInputValidator.parseYouTubeVideoId(inputValue)) {
			return '';
		}

		return 'Must be a YouTube video URL';
	};

	const loadChannelData = channelId => {
		setLoading(true);

		if (channelId) {
			OpportunityCostApiProxy.getChannelMetadata(
				channelId,
				data => {
					setResultsData(data);
					setChannelId(channelId);
					setResultsLoaded(true);
					setLoading(false);
				},
				error => {
					console.log(error);
				}
			);
		}
	};

	return (
		<Stack id='home-page-container' className='site-page-container'>
			{!loadedViaUrl && (
				<Collapse in={!resultsLoaded} timeout={animateSpeed}>
					<Typography variant='h4' align='center' component='div'>
						YouTube Opportunity Cost Calculator
					</Typography>
				</Collapse>
			)}

			<SingleFieldInputForm
				className='primary-site-input-container'
				inputLabel='Youtube URL'
				buttonText='Calculate'
				value={urlInputValue}
				onChange={updateInput}
				loading={loading}
				onSubmit={onYouTubeUrlSubmit}
				onValidate={validateYouTubeUrlInput}
			/>

			{!loadedViaUrl && (
				<Collapse in={!resultsLoaded} timeout={animateSpeed}>
					<Container maxWidth='sm'>
						<Stack spacing={1}>
							<Typography variant='body1' align='center'>
								opportunity cost (noun) -{' '}
								<a
									href='https://www.wordnik.com/words/opportunity%20cost'
									target='_blank'
									rel='noreferrer'
								>
									source
								</a>
							</Typography>
							<Typography variant='body1' align='left'>
								1. The cost of an opportunity forgone (and the loss of the
								benefits that could be received from that opportunity); the most
								valuable forgone alternative.
							</Typography>
							{/* <Typography>2. Cost in terms of foregoing alternatives</Typography> */}
							<Typography>
								2. That nagging feeling you get of what else you could have done
								after you let the YouTube algorithm pull you down yet another
								rabbit hole.
							</Typography>
						</Stack>
					</Container>
				</Collapse>
			)}
			{resultsLoaded && videoId && (
				<VideoResultsView
					data={resultsData}
					videoId={videoId}
					onReset={onResultsReset}
				/>
			)}
			{resultsLoaded && channelId && (
				<ChannelResultsView
					data={resultsData}
					channelId={channelId}
					onReset={onResultsReset}
				/>
			)}
		</Stack>
	);
}

export default HomePage;
