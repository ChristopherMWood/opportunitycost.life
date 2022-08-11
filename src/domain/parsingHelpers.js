import { parse } from 'tinyduration'

class ParsingHelpers {
	static getSecondsFromVideoDuration(videoDuration) {
		let time = parse(videoDuration)
		let totalSeconds = 0
    
		if (time.days) {
			totalSeconds += time.months * 86400
		}

		if (time.hours) {
			totalSeconds += time.hours * 3600
		}
        
		if (time.minutes) {
			totalSeconds += time.minutes * 60
		}
    
		if (time.seconds) {
			totalSeconds += time.seconds
		}
    
		return totalSeconds
	}
    
	static getTimeFromTotalSeconds(seconds) {
		let time = {}

		time.millennium = Math.floor(seconds / 31557600000)
		seconds -= time.millennium * 31557600000

		time.centuries = Math.floor(seconds / 3155760000)
		seconds -= time.centuries * 3155760000

		time.decades = Math.floor(seconds / 315576000)
		seconds -= time.decades * 315576000
    
		time.years = Math.floor(seconds / 31536000)
		seconds -= time.years * 31536000
    
		time.months = Math.floor(seconds / 2592000)
		seconds -= time.months * 2592000
    
		time.days = Math.floor(seconds / 86400)
		seconds -= time.days * 86400
    
		time.hours = Math.floor(seconds / 3600)
		seconds -= time.hours * 3600
    
		time.minutes = Math.floor(seconds / 60)
		seconds -= time.minutes * 60
    
		time.seconds = seconds
    
		return time
	}
    
	static getVideoIdFromUrl(url) {
		let videoId = url.split('v=')[1]
		let ampersandPosition = videoId.indexOf('&')
    
		if (ampersandPosition != -1) {
			videoId = videoId.substring(0, ampersandPosition)
		}
    
		return videoId
	}
}

export { ParsingHelpers }