//@flow
import { combineReducers } from 'redux'
import artists from './artists';
import type { ArtistsState } from './artists';
import tracks from './tracks';
import type { TracksState } from './tracks';
import albums from './albums';
import type { AlbumsState } from './albums';
import search from './search';
import type { SearchState } from './search';
import artistTopTracks from './artistTopTracks';
import type { ArtistTopTracksState } from './artistTopTracks';
import relatedArtists from './relatedArtists';
import type { RelatedArtistsState } from './relatedArtists';

export type AppState = {
  artists: ArtistsState,
  tracks: TracksState,
  albums: AlbumsState,
  search: SearchState,
  artistTopTracks: ArtistTopTracksState,
  relatedArtists: RelatedArtistsState,
}

export default combineReducers({
  artists,
  tracks,
  albums,
  search,
  artistTopTracks,
  relatedArtists,
})
