document.getElementById('submit-button').addEventListener('click', function (event) {
    const value = document.getElementById('path').value;

    if (value && isValidHttpUrl(value))
    {
        const videoId = getVideoIdFromUrl(value);

        getOpportunityCost(videoId, (data) => {
            if (data) {
                alert(JSON.stringify(data));
                console.log(data);
            } else {
                alert('An Error occured');
            }
        });
    }
}, false);

function getVideoIdFromUrl(url) {
    let videoId = url.split('v=')[1];
    let ampersandPosition = videoId.indexOf('&');

    if (ampersandPosition != -1) {
        videoId = videoId.substring(0, ampersandPosition);
    }

    return videoId;
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
    const url = 'https://christopherwood.dev/api/opportunitycost/' + videoId;

    fetch(url).then(function (response) {
        response.json().then((json)=> {
            callback(json);
        });
    }).catch(function (err) {
        callback(err);
    });
}