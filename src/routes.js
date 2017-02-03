import { Navigator } from 'react-native';

import Landing from './scenes/Landing'
import Artist from './scenes/Artist'

export const ROUTES = [
  {Component: Landing, index: 'Landing'},
  {Component: Artist, index: 'Artist'},
]

export default function routes(index: string, params: any) {
  const res = ROUTES.find(el => el.index === index)
  if (!res) {
    throw new Error(`Route not found`);
  }

  return Object.assign({}, res, {params});
}
