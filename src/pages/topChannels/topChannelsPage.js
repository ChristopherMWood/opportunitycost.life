import './styles.scss';
import { useState, useEffect } from 'react';
import { OpportunityCostApiProxy } from '../../domain/opportunityCostApiProxy';
import { Stack, Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dropdown from '../../components/dropdown/dropdown';
import { CostTypes } from '../../domain/costTypes';
import { getOpportunityCostByType } from '../../domain/costHelpers';

function TopChannelsPage() {
	const [results, setResults] = useState([]);
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [costType, setCostType] = useState(Object.values(CostTypes)[0]);

	useEffect(() => {
		loadMoreResults();
	}, []);

	const loadMoreResults = () => {
		const pageSize = 20;
		OpportunityCostApiProxy.getTopChannels(
			page,
			pageSize,
			pagedResults => {
				let newResultsList = [...results, ...pagedResults];
				newResultsList.map(result => {
					result.costByType = getOpportunityCostByType(
						result.opportunityCost,
						costType
					);
					return result;
				});

				setResults(newResultsList);
				setPage(page + 1);

				if (results.length > 100 || pagedResults.length < pageSize) {
					setHasMore(false);
				}
			},
			error => {
				console.log(error);
			}
		);
	};

	const onCostTypeSelected = event => {
		setCostType(event.target.value);

		const resultsCopy = [...results];
		resultsCopy.map(result => {
			result.costByType = getOpportunityCostByType(
				result.opportunityCost,
				event.target.value
			);
			return result;
		});

		setResults(resultsCopy);
	};

	return (
		<div className='site-page-container top-channels-page'>
			<Stack direction='column' spacing={3}>
				<Typography variant='h4' align='center'>
					Top Offending Channels (so far)
				</Typography>
				<Container>
					<Dropdown
						startValue={costType}
						selectValues={Object.values(CostTypes)}
						onChange={onCostTypeSelected}
					/>
				</Container>
				{results.length === 0 ? (
					<Stack spacing={1}>
						{[...Array(20)].map((_item, index) => {
							return (
								<Skeleton
									key={index}
									variant='rectangular'
									width='100%'
									height={60}
								/>
							);
						})}
					</Stack>
				) : (
					<TableContainer component={Paper}>
						<InfiniteScroll
							dataLength={results.length}
							next={loadMoreResults}
							hasMore={hasMore}
							loader={<h4>Loading...</h4>}
							endMessage={
								<p style={{ textAlign: 'center' }}>
									<b>End of the top 100 has been reached</b>
								</p>
							}
						>
							<Table aria-label='simple table' size='large'>
								<TableHead>
									<TableRow>
										<TableCell align='center'>
											<b>#</b>
										</TableCell>
										<TableCell align='left'>
											<b>Name</b>
										</TableCell>
										<TableCell align='center'>
											<b>Cost</b>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{results.map((result, index) => (
										<TableRow key={index}>
											<TableCell align='left'>{index + 1}</TableCell>
											<TableCell align='left'>
												<a href={'/?c=' + result._id}>{result.name}</a>
											</TableCell>
											<TableCell align='center'>{result.costByType}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</InfiniteScroll>
					</TableContainer>
				)}
			</Stack>
		</div>
	);
}

export default TopChannelsPage;
