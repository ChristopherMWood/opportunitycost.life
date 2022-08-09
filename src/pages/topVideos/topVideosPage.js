import { FlatList, Text, View } from 'react-native';
import './styles.scss';

const testData = [
	{ title: 'Gangnam Style', totalSeconds: 12345 }
]

function TopVideosPage(props) {

	const ListItem = ({ title, index }) => (
		<View>
			<div>
				<label>{index + 1}</label>
				<label>{title}</label>
			</div>
	 	</View> 
	);

	return (
		<div className='top-videos-page'>
			<h2>Top Videos (so far)</h2>
			<p>
				These are the top offending videos so far found on YouTube. To help out the cause of mapping the YouTube watch time, install the Chrome Extension here or calculate more videos on this site.
			</p>
			<FlatList data={testData} renderItem={({item, index}) => <ListItem title={item.title} index={index} />} />
		</div>
	);
  }
  
  export default TopVideosPage;
