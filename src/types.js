//@flow


export type Artist = {
  name: string,
  external_urls: any,
  followers: any,
  genres: Array<any>,
  href: string,
  id: string,
  images: Array<SpotifyImage>,
  popularity: number,
  type: string,
  uri: string,
}

export type Album = {}

export type Track = {
  album: {
    name: string,
  },
  artists: Array<Artist>,
  available_markets: Array<string>,
  disc_number: number,
  duration_ms: number,
  explicit: boolean,
  external_ids: any,
  external_urls: any,
  href: string,
  id: string,
  name: string,
  popularity: number,
  preview_url: string,
  track_number: number,
  type: string,
  uri: string,
}

export type SpotifyImage = {
  height: number,
  width: number,
  url: string,
}

export type ArtistTrackMap = {
  [artistId: string]: Array<Track>,
}
