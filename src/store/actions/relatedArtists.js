//@flow
import type { GetState, Artist } from '../../types';
import type { Dispatch } from 'redux';
import { constants } from '../reducers/relatedArtists';
import * as dal from '../../dal';
import * as artistsActions from './artists'
import * as topTracksActions from './artistTopTracks'

export function fetchRelatedArtists(artistId: string) {
  return async function(dispatch: any, getState: GetState) {
    dispatch(loadingStart());
    try {
      const res = await dal.spotify.getArtistRelatedArtists(artistId);
      const artists: Array<Artist> = res.body.artists;

      dispatch(artistsActions.upsert(artists));
      dispatch(upsert({[artistId]: artists.map(artist => artist.id)}));

    } catch (e) {
      console.log(e);
      dispatch(setError('Something went wrong'));

    } finally {
      dispatch(loadingEnd());
    }
  }
}

export function fetchRelatedArtistsAndTopTracks(artistId: string) {
  return async function(dispatch: any, getState: GetState) {
    await dispatch(fetchRelatedArtists(artistId));
    const artistsIds = getState().relatedArtists.data[artistId];
    await dispatch(topTracksActions.fetchArtistsTopTracks(artistsIds));
  }
}

export function upsert(relatedArtists: { [artistId: string]: Array<string> }) {
  return {
    type: constants.UPSERT,
    payload: relatedArtists,
  };
}

export function initialState() {
  return {
    type: constants.INITIAL_STATE,
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
