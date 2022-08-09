class YouTubeUrlInputValidator {
	static getQueryData(queryString) {
		var queryData = Object.create(null);
	
		queryString.split("&").some(function (qpair) {
			qpair = qpair.split("=").map(decodeURIComponent);
			queryData[qpair[0]] = qpair[1];
		});
	
		return queryData;
	}
	
	static getVideoIdFromUrl(url) {
		if (url.match(/^https?:\/\/(?:youtu\.be|(?:www\.)?youtube\.com\/embed)\/([\w\-]+)/)) {
			return RegExp.$1;
		}
	
		if (url.match(/^https?:\/\/(?:[\w\-]+\.)*youtube\.com\/(watch|attribution_link)\?([^\#]+)/)) {
			var page = RegExp.$1;
			var qs = RegExp.$2;
			
			switch (page) {
				case "watch":
					var q = this.getQueryData(qs);
					return q.v;
					break;
				case "attribution_link":
					var q1 = this.getQueryData(qs);
					//return q1.u; //debugu;
					if (q1.u) {
						//note q1.u is a 'watch' page path+query, which itself is encoded in a query parameter.
						if (q1.u.match(/^\/watch\?([^\#]+)/)) {
							var q2 = this.getQueryData(RegExp.$1);
							return q2.v
						}
					}
					break;
			}
		}
	}
	
	static isValidHttpUrl(string) {
		let url;
	
		try {
			url = new URL(string);
		} catch (_) {
			return false;
		}
	
		return url.protocol === "http:" || url.protocol === "https:";
	}
}

export { YouTubeUrlInputValidator }