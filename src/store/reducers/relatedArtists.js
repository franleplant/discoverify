//@flow
import { keyBy } from 'lodash';
import type { Artist, Track, Album,  AppState, Action as ActionType } from '../../types';


export const constants = {
  UPSERT: 'relatedArtists/UPSERT',
  INITIAL_STATE: 'relatedArtists/INITIAL_STATE',
  LOADING_START: 'relatedArtists/LOADING_START',
  LOADING_END: 'relatedArtists/LOADING_END',
  ERROR: 'relatedArtists/ERROR',
};

export type RelatedArtistsState = {
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
export default function relatedArtistsReducer(state: RelatedArtistsState = initialState, action: Action): RelatedArtistsState {

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


export function getRelatedArtists(state: AppState, artistId: string): Array<Artist> {
  const artistsIds = state.relatedArtists.data[artistId] || [];
  const artists = artistsIds.map(artistId => state.artists.data[artistId]);
  return artists;
}
