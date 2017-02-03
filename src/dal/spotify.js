import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId : 'f0f4ec08b6e84a658d94b71a16513b05',
  //clientSecret : '7a265f02d1c340278ff7977d9c62ca38',
  //redirectUri : 'http://www.example.com/callback'
});

export default spotifyApi;
