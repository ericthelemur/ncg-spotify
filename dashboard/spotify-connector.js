const currentSongRep = nodecg.Replicant('currentSong');
const logInBtn = document.getElementById("logIn");
const songUpdateBtn = document.getElementById("songUpdate");
const refreshTokenBtn = document.getElementById("refreshBtn");
const spotifyCallback = localStorage.getItem('spotify-callback');
localStorage.removeItem('spotify-callback');
if (spotifyCallback) {
    const params = new URLSearchParams(spotifyCallback);
    if (params.get('error')) {
        nodecg.log.error('Error after spotify callback');
    }
    else {
        const code = params.get('code');
        nodecg.sendMessage('spotify:authenticated', code);
    }
}
/** Starts the login for spotify, opens auth url */
function getAuth() {
    console.log('Logging in');
    nodecg.sendMessage('login', (err, authURL) => {
        console.log(err, authURL);
        if (err) {
            nodecg.log.warn(err.message);
            return;
        }
        if (authURL) {
            window.parent.location.replace(authURL);
        }
        else {
            nodecg.log.warn('Something went very wrong getting the auth url');
        }
    });
}
/** Requests a new refresh token */
function updateSong() {
    console.log('Updating Song');
    nodecg.sendMessage('fetchCurrentSong');
}
/** Requests a new refresh token */
function refreshToken() {
    console.log('Refreshing Token');
    nodecg.sendMessage('refreshAccessToken');
}
currentSongRep.on('change', newVal => {
    document.getElementById('songPlaying').innerHTML = newVal.playing ? "Playing" : "Paused";
    document.getElementById('songName').innerHTML = newVal.name;
    document.getElementById('songArtist').innerHTML = newVal.artist;
    document.getElementById('albumArt').src = newVal.albumArt;
    logInBtn.innerText = newVal.connected ? "Refresh Log In" : "Log In";
    document.getElementById('songInfo').hidden = !newVal.connected;
});
logInBtn.onclick = getAuth;
songUpdateBtn.onclick = updateSong;
refreshTokenBtn.onclick = refreshToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BvdGlmeS1jb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcG90aWZ5LWNvbm5lY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFjLGFBQWEsQ0FBQyxDQUFDO0FBRXBFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFFLENBQUM7QUFDbkQsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUUsQ0FBQztBQUM3RCxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBRSxDQUFDO0FBRS9ELE1BQU0sZUFBZSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNqRSxZQUFZLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFNUMsSUFBSSxlQUFlLEVBQUU7SUFDcEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDcEQsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7S0FDakQ7U0FBTTtRQUNOLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNsRDtDQUNEO0FBRUQsbURBQW1EO0FBQ25ELFNBQVMsT0FBTztJQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUU7UUFDNUMsSUFBSSxHQUFHLEVBQUU7WUFDUixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsT0FBTztTQUNQO1FBRUQsSUFBSSxPQUFPLEVBQUU7WUFDWixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDeEM7YUFBTTtZQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxDQUFDLENBQUM7U0FDbEU7SUFDRixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxtQ0FBbUM7QUFDbkMsU0FBUyxVQUFVO0lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFFRCxtQ0FBbUM7QUFDbkMsU0FBUyxZQUFZO0lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNoQyxNQUFNLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDMUMsQ0FBQztBQUVELGNBQWMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO0lBQ25DLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFxQixDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUM3RyxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBcUIsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNoRixRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBcUIsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNwRixRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBc0IsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNqRixDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQzNCLGFBQWEsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0FBQ25DLGVBQWUsQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDIn0=