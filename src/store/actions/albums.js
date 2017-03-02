//@flow
import type { Album } from '../../types';
import { constants } from '../reducers/albums';

export function upsert(albums: Array<Album>) {
  return {
    type: constants.UPSERT,
    payload: albums,
  };
}

export function remove(albumId: string) {
  return {
    type: constants.REMOVE,
    payload: albumId,
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
