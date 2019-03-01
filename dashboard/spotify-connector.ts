/** Starts the login for spotify, opens auth url */
function getAuth() {
	nodecg.sendMessage('login', (err, authURL) => {
		if (err) {
			nodecg.log.warn(err.message);
			return;
		}

		if (authURL) {
			window.parent.location.replace(authURL);
		} else {
			nodecg.log.warn('Something went very wrong getting the auth url');
		}
	});
}

/** Requests new song data */
function getCurrentSong() {
	nodecg.sendMessage('fetchCurrentSong');
}

/** Requests a new refresh token */
function refreshToken() {
	nodecg.sendMessage('refreshAccessToken');
}

const spotifyCallback = localStorage.getItem('spotify-callback');
localStorage.removeItem('spotify-callback');

if (spotifyCallback) {
	const params = new URLSearchParams(spotifyCallback);
	if (params.get('error')) {
		nodecg.log.error('Error after spotify callback');
	} else {
		const code = params.get('code');
		nodecg.sendMessage('spotify:authenticated', code);
	}
}
