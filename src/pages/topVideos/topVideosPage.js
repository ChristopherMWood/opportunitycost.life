import './styles.scss';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { OpportunityCostApiProxy } from '../../domain/opportunityCostApiProxy';
import { Stack, Box, Container} from '@mui/system';

import InfiniteScroll from 'react-infinite-scroll-component';
import { abbreviateNumber } from "js-abbreviation-number";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function TopVideosPage(props) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadMoreResults()
  }, [])

  const getOpportunityCostByType = (totalSeconds, opportunityCostType) => {
    return abbreviateNumber(totalSeconds/22075000); //CHANGE ASAP
  }

  const loadMoreResults = () => {
    const pageSize = 20
    OpportunityCostApiProxy.getTopVideos(page, pageSize, (pagedResults) => {
      let newResultsList = [...results, ...pagedResults]
      newResultsList.map((result) => {
        result.costByType = getOpportunityCostByType(result.opportunityCost, 'life')
      });

      setResults(newResultsList)
      setPage(page + 1);

      if (results.length > 100 || pagedResults.length < pageSize) {
        setHasMore(false);
      }
    }, (error) => {

    })
  }

  const onCostTypeSelected = (event) => {

  }

	return (
		<div className='site-page-container top-videos-page'>
			<h2>Top Offending Videos (so far)</h2>
			<p>
				These are the top offending videos so far found on YouTube. To help out the cause of mapping the YouTube watch time, calculate more videos on this site.
			</p>

      {/* PUT drop down to toggle cost calculation here */}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Cost Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={0}
          label="Cost Type"
          onChange={onCostTypeSelected}
        >
          <MenuItem value={0}>Human Lives</MenuItem>
          <MenuItem value={1}>Football Games</MenuItem>
        </Select>
      </FormControl>


      <TableContainer component={Paper}>

      <InfiniteScroll
          dataLength={results.length}
          next={loadMoreResults}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>End of the top 100 has been reached</b>
            </p>
          }
          >
          <Table aria-label="simple table" size="large">
            <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="center">Cost</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
                  {results.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left" ><a href={"/?v=" + result._id}>{result.title}</a></TableCell>
                      <TableCell align="center">{result.opportunityCost}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
         </InfiniteScroll>
      </TableContainer>
    </div>
  )
}

export default TopVideosPage;