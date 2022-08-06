window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const videoId = urlParams.get('v');

    if (videoId) {
        getOpportunityCost(videoId, (data) => {
            if (data) {
                displayResults(videoId, data);
            } else {
                console.error("unknown error occured");
            }
        });
    }
};

document.getElementById('submit-button').addEventListener('click', function (event) {
    event.preventDefault();
    const value = document.getElementById('path').value;
    const errorTextElement = document.getElementById("path-error-text");

    if (!value) {
        errorTextElement.style.display = "none";
        document.getElementById('path').focus();
        return;
    }

    if (!isValidHttpUrl(value)) {
        errorTextElement.innerHTML = "must enter a YouTube video url";
        errorTextElement.style.display = "block";
        document.getElementById('path').focus();
        return;
    }

    const videoId = getVideoIdFromUrl(value);

    if (!videoId) {
        errorTextElement.innerHTML = "no video id found in url";
        errorTextElement.style.display = "block";
        document.getElementById('path').focus();
        return;
    }

    document.getElementById("submit-button").disabled = true;

    getOpportunityCost(videoId, (data) => {
        if (data) {
            errorTextElement.style.display = "none";
            document.getElementById("submit-button").disabled = false;
            displayResults(value, data);
        } else {
            errorTextElement.innerHTML = "something went wrong, check the url and try again";
            errorTextElement.style.display = "block";
            document.getElementById('path').focus();
            document.getElementById("submit-button").disabled = false;
        }
    });
}, false);

function getQueryData(queryString) {
    var queryData = Object.create(null);

    queryString.split("&").some(function (qpair) {
        qpair = qpair.split("=").map(decodeURIComponent);
        queryData[qpair[0]] = qpair[1];
    });

    return queryData;
}

function getVideoIdFromUrl(url) {
    if (url.match(/^https?:\/\/(?:youtu\.be|(?:www\.)?youtube\.com\/embed)\/([\w\-]+)/)) {
        return RegExp.$1;
    }

    if (url.match(/^https?:\/\/(?:[\w\-]+\.)*youtube\.com\/(watch|attribution_link)\?([^\#]+)/)) {
        var page = RegExp.$1;
        var qs = RegExp.$2;
        
        switch (page) {
            case "watch":
                var q = getQueryData(qs);
                return q.v;
                break;
            case "attribution_link":
                var q1 = getQueryData(qs);
                //return q1.u; //debugu;
                if (q1.u) {
                    //note q1.u is a 'watch' page path+query, which itself is encoded in a query parameter.
                    if (q1.u.match(/^\/watch\?([^\#]+)/)) {
                        var q2 = getQueryData(RegExp.$1);
                        return q2.v
                    }
                }
                break;
        }
    }
}

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

function getOpportunityCost(videoId, callback) {
    const url = 'https://api.christopherwood.dev/api/opportunitycost/' + videoId;

    fetch(url).then(function (response) {
        response.json().then((json) => {
            callback(json);
        });
    }).catch(function (err) {
        callback(err);
    });
}

function displayResults(url, data) {
    document.getElementById("youtube-url").innerHTML = url;
    document.getElementById("video-views").innerHTML = data.views;
    document.getElementById("total-seconds").innerHTML = data.totalSeconds;
    document.getElementById("centuries").innerHTML = data.formattedTime.centuries;
    document.getElementById("decades").innerHTML = data.formattedTime.decades;
    document.getElementById("years").innerHTML = data.formattedTime.years;
    document.getElementById("months").innerHTML = data.formattedTime.months;
    document.getElementById("days").innerHTML = data.formattedTime.days;
    document.getElementById("hours").innerHTML = data.formattedTime.hours;
    document.getElementById("minutes").innerHTML = data.formattedTime.minutes;
    document.getElementById("seconds").innerHTML = data.formattedTime.seconds;
    document.getElementById("results-container").style.display = "block";
}