//@flow
import type { Artist, GetState } from '../../types';
import spotify from '../../dal/spotify'
import { constants } from '../reducers/artists';

export function fetchArtist(artistId: string) {
  return async function(dispatch: any, getState: GetState) {
    dispatch(loadingStart());
    try {

      const availableArtists = getState().artists.data;
      if (!availableArtists[artistId]) {
        const res = await spotify.getArtist(artistId);
        const artist: Artist = res.body;
        dispatch(upsert([artist]));
      }


    } catch (e) {
      console.log(e);
      dispatch(setError('Something went wrong'));

    } finally {
      dispatch(loadingEnd());
    }
  }
}

export function upsert(artists: Array<Artist>) {
  return {
    type: constants.UPSERT,
    payload: artists,
  };
}

export function remove(artistId: string) {
  return {
    type: constants.REMOVE,
    payload: artistId,
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
