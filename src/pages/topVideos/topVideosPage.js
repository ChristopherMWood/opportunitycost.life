import './styles.scss';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { OpportunityCostApiProxy } from '../../domain/opportunityCostApiProxy';
import Box from '@mui/material/Box';
import InfiniteScroll from 'react-infinite-scroll-component';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function TopVideosPage(props) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadMoreResults()
  }, [])

  const loadMoreResults = () => {
    const pageSize = 20
    OpportunityCostApiProxy.getTopVideos(page, pageSize, (pagedResults) => {
      setResults([...results, ...pagedResults])
      setPage(page + 1);

      if (results.length > 100 || pagedResults.length < pageSize) {
        setHasMore(false);
      }
    }, (error) => {

    })
  }

	return (
		<div className='site-page-container top-videos-page'>
			<h2>Top Offending Videos (so far)</h2>
			<p>
				These are the top offending videos so far found on YouTube. To help out the cause of mapping the YouTube watch time, install the Chrome Extension here or calculate more videos on this site.
			</p>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Place</TableCell>
            <TableCell align="left">Video Title</TableCell>
            <TableCell align="left">Opportunity Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
              <TableRow
                key={index}
              >
                <TableCell component="th" scope="row">{index + 1}</TableCell>
                <TableCell align="right">{result.title}</TableCell>
                <TableCell align="right">{result.opportunityCost}</TableCell>
              </TableRow>
            ))}
          </InfiniteScroll>
        </TableBody>
      </Table>
    </TableContainer>
		</div>
	);
  }
  
  export default TopVideosPage;


//   <TableContainer component={Paper}>
//   <Table sx={{ minWidth: 650 }} aria-label="simple table">
//     <TableHead>
//       <TableRow>
//         <TableCell>Dessert (100g serving)</TableCell>
//         <TableCell align="right">Calories</TableCell>
//         <TableCell align="right">Fat&nbsp;(g)</TableCell>
//         <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//         <TableCell align="right">Protein&nbsp;(g)</TableCell>
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {rows.map((row) => (
//         <TableRow
//           key={row.name}
//           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//         >
//           <TableCell component="th" scope="row">
//             {row.name}
//           </TableCell>
//           <TableCell align="right">{row.calories}</TableCell>
//           <TableCell align="right">{row.fat}</TableCell>
//           <TableCell align="right">{row.carbs}</TableCell>
//           <TableCell align="right">{row.protein}</TableCell>
//         </TableRow>
//       ))}
//     </TableBody>
//   </Table>
// </TableContainer>

// <InfiniteScroll
// dataLength={results.length}
// next={loadMoreResults}
// hasMore={hasMore}
// loader={<h4>Loading...</h4>}
// endMessage={
//   <p style={{ textAlign: "center" }}>
//     <b>Only the top 100 are displayed</b>
//   </p>
// }
// >
// {results.map((result, index) => (
//   <div key={index}>
//     {index + 1}
//     {result.title}
//     {result.opportunityCost}
//   </div>
// ))}
// </InfiniteScroll>

// {/* <div className='site-page-container top-videos-page'>
// <h2>Top Offending Videos (so far)</h2>
// <p>
//   These are the top offending videos so far found on YouTube. To help out the cause of mapping the YouTube watch time, install the Chrome Extension here or calculate more videos on this site.
// </p>
// <Box sx={{ height: 500, width: '75%' }}>
//   <InfiniteScroll
//       dataLength={results.length}
//       next={loadMoreResults}
//       hasMore={hasMore}
//       loader={<h4>Loading...</h4>}
//       endMessage={
//         <p style={{ textAlign: "center" }}>
//           <b>Only the top 100 are displayed</b>
//         </p>
//       }
//     >
//       {results.map((result, index) => (
//         <div key={index}>
//           {index + 1}
//           {result.title}
//           {result.opportunityCost}
//         </div>
//       ))}
//     </InfiniteScroll>
// </Box>
// </div>
// ); */}