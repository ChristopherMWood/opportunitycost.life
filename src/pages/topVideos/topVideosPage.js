import './styles.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'id',
    headerName: 'Rank',
    type: 'number',
    width: 150,
    editable: false,
  },
  {
    field: 'videoTitle',
    headerName: 'Title',
    width: 150,
    editable: true,
  },
  {
    field: 'videoOpportunityCost',
    headerName: 'Opportunity Cost',
    type: 'number',
    width: 110,
    editable: true,
  }
];
const rows = [
	{ id: 1, videoTitle: 'Test title for placement', videoOpportunityCost: '1.9k' },
	{ id: 2, videoTitle: 'Another title to try things out', videoOpportunityCost: '100k' },
	{ id: 3, videoTitle: 'Yet another long title', videoOpportunityCost: '456k' },
	{ id: 4, videoTitle: 'A short title', videoOpportunityCost: '2k' },
  ];

function TopVideosPage(props) {

	return (
		<div className='site-page-container top-videos-page'>
			<h2>Top Offending Videos (so far)</h2>
			<p>
				These are the top offending videos so far found on YouTube. To help out the cause of mapping the YouTube watch time, install the Chrome Extension here or calculate more videos on this site.
			</p>
			<Box sx={{ height: 500, width: '75%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[10]}
				disableSelectionOnClick
			/>
			</Box>
		</div>
	);
  }
  
  export default TopVideosPage;
