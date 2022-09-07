import SingleFieldInputForm from '../../components/singleFieldInputForm';
import { useState, useEffect } from 'react';
import { Stack, Container } from '@mui/system';
import './styles.scss';
import { YouTubeUrlInputValidator } from '../../domain/urlValidator';
import { OpportunityCostApiProxy } from '../../domain/opportunityCostApiProxy';
import ResultsView from '../../components/resultsView';
import { useSearchParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CollapsibleView from '../../components/collapsibleView/collapsibleView';

function HomePage() {
	const [firstPageLoad, setFirstPageLoad] = useState(true);
	const [loading, setLoading] = useState(false);
	const [resultsLoaded, setResultsLoaded] = useState(false);
	const [loadedViaUrl, setLoadedViaUrl] = useState(false);
	const [resultsData, setResultsData] = useState(null);
	const [videoId, setVideoId] = useState(null);
	const [urlInputValue, setUrlInputValue] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const videoId = searchParams.get('v');

		if (videoId && videoId.length > 0 && firstPageLoad) {
			setVideoId(videoId);
			console.log(loadedViaUrl);
			setLoadedViaUrl(true);
			setFirstPageLoad(false);
			const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
			setUrlInputValue(videoUrl);
			onYouTubeUrlSubmit(videoUrl, false);
		}
	}, []);

	const onResultsReset = () => {
		setResultsLoaded(false);
		setResultsData(null);
		setUrlInputValue('');
	};

	const onYouTubeUrlSubmit = (videoUrl, manual = true) => {
		setLoading(true);

		const videoId = YouTubeUrlInputValidator.parseYouTubeVideoId(videoUrl);

		if (videoId) {
			OpportunityCostApiProxy.getMetadata(
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
					alert(error);
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

	return (
		<Stack id='home-page-container' className='site-page-container'>
			<CollapsibleView
				animate={true}
				isVisible={!resultsLoaded}
				startWithAnimation={false}
			>
				<Typography variant='h4' align='center' component='div'>
					YouTube Opportunity Cost Calculator
				</Typography>
			</CollapsibleView>

			<SingleFieldInputForm
				className='primary-site-input-container'
				inputLabel='Youtube URL'
				buttonText='Calculate'
				startValue={urlInputValue}
				loading={loading}
				onSubmit={onYouTubeUrlSubmit}
				onValidate={validateYouTubeUrlInput}
			/>

			<CollapsibleView
				animate={true}
				isVisible={!resultsLoaded}
				startWithAnimation={false}
			>
				<Container justifyContent='center' maxWidth='sm'>
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
							2. That nagging feeling you get of what else you could be doing
							after you let the YouTube algorithm pull you down yet another
							rabbit hole.
						</Typography>
					</Stack>
				</Container>
			</CollapsibleView>
			{resultsLoaded && (
				<ResultsView
					data={resultsData}
					videoId={videoId}
					onReset={onResultsReset}
				/>
			)}
		</Stack>
	);
}

export default HomePage;
