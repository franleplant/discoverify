//@flow
import { keyBy } from 'lodash';
import type { Artist, Action as ActionType, AppState } from '../../types';


export const constants = {
  UPSERT: 'artists/UPSERT',
  REMOVE: 'artists/REMOVE',
  INITIAL_STATE: 'artists/INITIAL_STATE',
  LOADING_START: 'artists/LOADING_START',
  LOADING_END: 'artists/LOADING_END',
  ERROR: 'artists/ERROR',
};

export type ArtistsState = {
  loading: boolean,
  error: string,
  data: {
    [artistId: string]: Artist,
  },
};

export const initialState = {
  loading: false,
  error: '',
  data: {},
};

type Action = ActionType<any>;
export default function artistsReducer(state: ArtistsState = initialState, action: Action): ArtistsState {

  switch(action.type) {
    case constants.UPSERT:
      return (() => {
        const newArtistsArray = action.payload;
        const newArtists = keyBy(newArtistsArray, 'id');
        const oldArtists = state.data;
        const artists = { ...oldArtists, ...newArtists};
        return { ...state, data: artists };
      })()

    case constants.REMOVE:
      return (() => {
        const artistId = action.payload;
        const artists = state.data;
        delete artists[artistId];
        return { ...state, data: artists };
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

export function getArtist(state: AppState, artistId: string): Artist {
  return state.artists.data[artistId];
}
