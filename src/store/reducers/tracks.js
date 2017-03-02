//@flow
import { keyBy } from 'lodash';
import type { Track, Action as ActionType, AppState } from '../../types';


export const constants = {
  UPSERT: 'tracks/UPSERT',
  REMOVE: 'tracks/REMOVE',
  INITIAL_STATE: 'tracks/INITIAL_STATE',
  LOADING_START: 'tracks/LOADING_START',
  LOADING_END: 'tracks/LOADING_END',
  ERROR: 'tracks/ERROR',
};

export type TracksState = {
  loading: boolean,
  error: string,
  data: {
    [trackId: string]: Track,
  },
};

export const initialState = {
  loading: false,
  error: '',
  data: {},
};

type Action = ActionType<any>;
export default function tracksReducer(state: TracksState = initialState, action: Action): TracksState {

  switch(action.type) {
    case constants.UPSERT:
      return (() => {
        const newTracksArray = action.payload;
        const newTracks = keyBy(newTracksArray, 'id');
        const oldTracks = state.data;
        const tracks = { ...oldTracks, ...newTracks};
        return { ...state, data: tracks };
      })()

    case constants.REMOVE:
      return (() => {
        const trackId = action.payload;
        const tracks = state.data;
        delete tracks[trackId];
        return { ...state, data: tracks };
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
