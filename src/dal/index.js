import type {Artist, ArtistTopTrackMap} from '../types'
import spotifyApi from './spotify'

type ArtistCache = {
  [artistId: string]: Artist,
}
const artistCache: ArtistCache = {};

export const spotify = spotifyApi;

export async function fetchArtistsTopTracks(ids: Array<string>) {
  const responses = await Promise.all(ids.map(id => spotifyApi.getArtistTopTracks(id, 'Ar')))
  const artistTrackMap = {}
  responses.forEach((res, i) => {
    const artistId = ids[i];
    artistTrackMap[artistId] = res.body.tracks;
  })

  return artistTrackMap;
}

// store and retrieve from cache if possible
export async function getArtist(id: string) {
  if (artistCache[id]) {
    return { body: artistCache[id], cached: true };
  }

  const res = await spotify.getArtist(id);
  artistCache[id] = res.body;
  return res;
}



// Store artists in cache if possible
export async function search(searchTerm: string) {
  const res = await spotify.search(searchTerm, ['album', 'artist', 'track'])

  let artists = []
  try {
    artists = res.body.artists.items;
  } catch (err) {}

  artists.forEach(artist => {
    artistCache[artist.id] = artist;
  })

  return res;
}



// Store artists in cache if possible
export async function getArtistRelatedArtists(artistId: string) {
  const res = await spotify.getArtistRelatedArtists(artistId);

  let artists = []
  try {
    artists = res.body.artists;
  } catch(er) {}

  artists.forEach(artist => {
    artistCache[artist.id] = artist;
  })

  return res;
}
