//@flow
import type { GetState } from '../../types';
import type { Dispatch } from 'redux';
import { constants } from '../reducers/artistTopTracks';
import * as dal from '../../dal';
import * as tracksActions from './tracks'

export function fetchArtistsTopTracks(artistsIds: Array<string>) {
  return async function(dispatch: Dispatch<*>, getState: GetState) {
    dispatch(loadingStart());
    try {
      const artistTrackMap = await dal.fetchArtistsTopTracks(artistsIds)
      const artistTrackRefMap = {}
      let tracks = []
      for (const artistId in artistTrackMap) {
        const artistTracks = artistTrackMap[artistId]
        tracks = tracks.concat(artistTracks);

        const tracksIds = artistTracks.map(track => track.id);
        artistTrackRefMap[artistId] = tracksIds;
      }

      dispatch(tracksActions.upsert(tracks));
      dispatch(upsert(artistTrackRefMap));

    } catch (e) {
      console.log(e);
      dispatch(setError('Something went wrong'));

    } finally {
      dispatch(loadingEnd());
    }
  }
}

export function fetchArtistTopTracks(artistId: string) {
  return async function(dispatch: Dispatch<*>, getState: GetState) {
    dispatch(loadingStart());
    try {
      const artistTopTracks = getState().artistTopTracks[artistId];
      if (!artistTopTracks) {
        const tracksResponse = await dal.spotify.getArtistTopTracks(artistId, 'Ar')
        const tracks = tracksResponse.body.tracks

        const artistTrackRefMap = {[artistId]: tracks.map(track => track.id)};
        dispatch(tracksActions.upsert(tracks));
        dispatch(upsert(artistTrackRefMap));
      }

    } catch (e) {
      console.log(e);
      dispatch(setError('Something went wrong'));

    } finally {
      dispatch(loadingEnd());
    }
  }
}

export function upsert(artistTopTracks: { [artistId: string]: Array<string> }) {
  return {
    type: constants.UPSERT,
    payload: artistTopTracks,
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
