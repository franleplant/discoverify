//@flow
import { keyBy } from 'lodash';
import type { Album, Action as ActionType, AppState } from '../../types';


export const constants = {
  UPSERT: 'albums/UPSERT',
  REMOVE: 'albums/REMOVE',
  INITIAL_STATE: 'albums/INITIAL_STATE',
  LOADING_START: 'albums/LOADING_START',
  LOADING_END: 'albums/LOADING_END',
  ERROR: 'albums/ERROR',
};

export type AlbumsState = {
  loading: boolean,
  error: string,
  data: {
    [albumId: string]: Album,
  },
};

export const initialState = {
  loading: false,
  error: '',
  data: {},
};

type Action = ActionType<any>;
export default function albumsReducer(state: AlbumsState = initialState, action: Action): AlbumsState {

  switch(action.type) {
    case constants.UPSERT:
      return (() => {
        const newAlbumsArray = action.payload;
        const newAlbums = keyBy(newAlbumsArray, 'id');
        const oldAlbums = state.data;
        const albums = { ...oldAlbums, ...newAlbums};
        return { ...state, data: albums };
      })()

    case constants.REMOVE:
      return (() => {
        const albumId = action.payload;
        const albums = state.data;
        delete albums[albumId];
        return { ...state, data: albums };
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
