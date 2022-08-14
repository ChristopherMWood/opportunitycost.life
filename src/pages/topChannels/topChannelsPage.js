import './styles.scss';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { OpportunityCostApiProxy } from '../../domain/opportunityCostApiProxy';
import Box from '@mui/material/Box';
import InfiniteScroll from 'react-infinite-scroll-component';

function TopChannelsPage(props) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadMoreResults()
  }, [])

  const loadMoreResults = () => {
    const pageSize = 20
    OpportunityCostApiProxy.getTopChannels(page, pageSize, (pagedResults) => {
      setResults([...results, ...pagedResults])
      setPage(page + 1);

      if (results.length > 100 || pagedResults.length < pageSize) {
        setHasMore(false);
      }
    }, (error) => {

    })
  }

	return (
		<div className='site-page-container top-channels-page'>
			<h2>Top Offending Channels (so far)</h2>
			<p>
				These are the top offending channels so far found on YouTube. To help out the cause of mapping the YouTube watch time, install the Chrome Extension here or calculate more videos on this site.
			</p>
			<Box sx={{ height: 500, width: '75%' }}>
        <InfiniteScroll
            dataLength={results.length}
            next={loadMoreResults}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Only the top 100 are displayed</b>
              </p>
            }
          >
            {results.map((result, index) => (
              <div key={index}>
                {index + 1}
                {result.name}
                {result.opportunityCost}
              </div>
            ))}
          </InfiniteScroll>
			</Box>
		</div>
	);
  }
  
  export default TopChannelsPage;
