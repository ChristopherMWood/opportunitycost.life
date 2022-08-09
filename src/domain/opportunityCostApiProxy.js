import axios from 'axios'

class OpportunityCostApiProxy {
	static getMetadata(videoId, success, failure) {
		const requestUrl = `https://api.christopherwood.dev/api/opportunitycost/${videoId}`;
		axios.get(requestUrl)
			.then(function (response) {
				success(response.data)
			})
			.catch(function (error) {
				failure(error)
			})
	}
}

export { OpportunityCostApiProxy }
