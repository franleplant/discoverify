//@flow
import type { Track } from '../../types';
import { constants } from '../reducers/tracks';

export function upsert(tracks: Array<Track>) {
  return {
    type: constants.UPSERT,
    payload: tracks,
  };
}

export function remove(trackId: string) {
  return {
    type: constants.REMOVE,
    payload: trackId,
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
