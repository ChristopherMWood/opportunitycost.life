import axios from 'axios';

const baseUrl = 'https://api.christopherwood.dev';
// const baseUrl = "http://localhost:8080";

class OpportunityCostApiProxy {
	static getOverview(success, failure) {
		const requestUrl = `${baseUrl}/api/opportunitycost/overview`;
		axios
			.get(requestUrl)
			.then(function (response) {
				success(response.data);
			})
			.catch(function (error) {
				failure(error);
			});
	}

	static getVideoMetadata(videoId, success, failure) {
		const requestUrl = `${baseUrl}/api/opportunitycost/${videoId}`;
		axios
			.get(requestUrl)
			.then(function (response) {
				success(response.data);
			})
			.catch(function (error) {
				failure(error);
			});
	}

	static getChannelMetadata(channelId, success, failure) {
		const requestUrl = `${baseUrl}/api/opportunitycost/channel/${channelId}`;
		axios
			.get(requestUrl)
			.then(function (response) {
				success(response.data);
			})
			.catch(function (error) {
				failure(error);
			});
	}

	static getTopVideos(page, pageSize, success, failure) {
		const requestUrl = `${baseUrl}/api/opportunitycost/top-videos?page=${page}&${pageSize}`;
		axios
			.get(requestUrl)
			.then(function (response) {
				success(response.data);
			})
			.catch(function (error) {
				failure(error);
			});
	}

	static getTopChannels(page, pageSize, success, failure) {
		const requestUrl = `${baseUrl}/api/opportunitycost/top-channels?page=${page}&${pageSize}`;
		axios
			.get(requestUrl)
			.then(function (response) {
				success(response.data);
			})
			.catch(function (error) {
				failure(error);
			});
	}
}

export { OpportunityCostApiProxy };
