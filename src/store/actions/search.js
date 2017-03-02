//@flow
import type { Dispatch } from 'redux';
import type { Artist, Album, Track, GetState } from '../../types';
import { constants } from '../reducers/search';
import spotify from '../../dal/spotify'
import * as artistsActions from './artists';
import * as tracksActions from './tracks';
import * as albumsActions from './albums';
import * as topTracksActions from './artistTopTracks';

type SearchResults = {
  albums?: SearchResultItem<Album>,
  artists?: SearchResultItem<Artist>,
  tracks?: SearchResultItem<Track>,
}

type SearchResultItem<T> = {
  href: string,
  items: Array<T>,
  limit: number,
  next: string,
  previous: string,
  offset: number,
}

// Store artists in cache if possible
export function search(searchTerm: string) {
  return async function(dispatch: any, getState: GetState) {
    dispatch(loadingStart());
    try {
      const res = await spotify.search(searchTerm, ['album', 'artist', 'track'])
      const body: SearchResults = res.body;

      const artists = body.artists ? body.artists.items : [];
      const artistsId = artists.map(a => a.id);
      dispatch(artistsActions.upsert(artists));
      dispatch(setArtists(artistsId));

      const tracks = body.tracks ? body.tracks.items : [];
      const tracksId = tracks.map(a => a.id);
      dispatch(tracksActions.upsert(tracks));
      dispatch(setTracks(tracksId));

      const albums = body.albums ? body.albums.items : [];
      const albumsId = albums.map(a => a.id);
      dispatch(albumsActions.upsert(albums));
      dispatch(setAlbums(albumsId));


      await dispatch(topTracksActions.fetchArtistsTopTracks(artists.map(artist => artist.id)));


    } catch (e) {
      console.log(e);
      dispatch(setError('Something went wrong'));

    } finally {
      dispatch(loadingEnd());
    }
  }
}

export function setArtists(artists: Array<string>) {
  return {
    type: constants.SET_ARTISTS,
    payload: artists,
  };
}

export function setTracks(tracks: Array<string>) {
  return {
    type: constants.SET_TRACKS,
    payload: tracks,
  };
}

export function setAlbums(albums: Array<string>) {
  return {
    type: constants.SET_ALBUMS,
    payload: albums,
  };
}

export function loadingStart() {
  return {
    type: constants.LOADING_START,
  };
}

export function loadingEnd() {
  return {
    type: constants.LOADING_END,
  };
}

export function setError(message: string) {
  return {
    type: constants.ERROR,
    payload: message,
    error: true,
  };
}
