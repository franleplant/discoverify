//@flow
import type { Artist, Track, Album, AppState, Action as ActionType } from '../../types';


export const constants = {
  SET_ARTISTS: 'search/SET_ARTISTS',
  SET_TRACKS: 'search/SET_TRACKS',
  SET_ALBUMS: 'search/SET_ALBUMS',
  INITIAL_STATE: 'search/INITIAL_STATE',
  LOADING_START: 'search/LOADING_START',
  LOADING_END: 'search/LOADING_END',
  ERROR: 'search/ERROR',
};

export type SearchState = {
  loading: boolean,
  error: string,
  artists: Array<string>,
  tracks: Array<string>,
  albums: Array<string>,
};

export const initialState = {
  loading: false,
  error: '',
  artists: [],
  tracks: [],
  albums: [],
};

type Action = ActionType<any>;
export default function searchReducer(state: SearchState = initialState, action: Action): SearchState {

  switch(action.type) {
    case constants.SET_ARTISTS:
      return (() => {
        const artistsId = action.payload;
        return { ...state, artists: artistsId };
      })();

    case constants.SET_TRACKS:
      return (() => {
        const tracksId = action.payload;
        return { ...state, tracks: tracksId };
      })();

    case constants.SET_ALBUMS:
      return (() => {
        const albumsId = action.payload;
        return { ...state, albums: albumsId };
      })();

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

export function getArtists(state: AppState): Array<Artist> {
  const artistsId = state.search.artists;
  const artists: Array<Artist> = artistsId.map(id => state.artists.data[id]);
  return artists;
}

export function getTracks(state: AppState): Array<Track> {
  const tracksId = state.search.tracks;
  const tracks: Array<Track> = tracksId.map(id => state.tracks.data[id]);
  return tracks;
}

export function getAlbums(state: AppState): Array<Album> {
  const albumsId = state.search.albums;
  const albums: Array<Album> = albumsId.map(id => state.albums.data[id]);
  return albums;
}
