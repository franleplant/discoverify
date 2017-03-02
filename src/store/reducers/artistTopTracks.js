//@flow
import { keyBy } from 'lodash';
import type { Artist, Track, Album, ArtistTrackMap, AppState, Action as ActionType } from '../../types';


export const constants = {
  UPSERT: 'artistTopTracks/UPSERT',
  INITIAL_STATE: 'artistTopTracks/INITIAL_STATE',
  LOADING_START: 'artistTopTracks/LOADING_START',
  LOADING_END: 'artistTopTracks/LOADING_END',
  ERROR: 'artistTopTracks/ERROR',
};

export type ArtistTopTracksState = {
  loading: boolean,
  error: string,
  data: {
    [artistId: string]: Array<string>,
  },
};

export const initialState = {
  loading: false,
  error: '',
  data: {},
};

type Action = ActionType<any>;
export default function artistTopTracksReducer(state: ArtistTopTracksState = initialState, action: Action): ArtistTopTracksState {

  switch(action.type) {
    case constants.UPSERT:
      return (() => {
        const newTrackMap = action.payload;
        const oldTrackMap = state.data;
        const trackMap = { ...oldTrackMap, ...newTrackMap};
        return { ...state, data: trackMap };
      })()

    case constants.INITIAL_STATE:
      return initialState;

    case constants.LOADING_START:
      return { ...state, loading: true, error: '' };

    case constants.LOADING_END:
      return { ...state, loading: false };

    case constants.ERROR:
      return (() => {
        const error = action.payload;
        return { ...state, error };
      })()

    default:
      return state;
  }
}


export function getAllTracksByArtist(state: AppState): ArtistTrackMap {
  const derefedTrackMap = {};

  const artistTrackMap = state.artistTopTracks.data;
  for (const artistId in artistTrackMap ) {
    const artistTracks = artistTrackMap[artistId].map(trackId => state.tracks.data[trackId]);
    derefedTrackMap[artistId] = artistTracks;
  }

  return derefedTrackMap;
}

export function getArtistTracks(state: AppState, artistId: string): Array<Track> {
  const tracks = getAllTracksByArtist(state)[artistId];
  return tracks;
}
