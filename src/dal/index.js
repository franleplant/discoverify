import type {ArtistTopTrackMap} from '../types'
import spotifyApi from './spotify'

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
