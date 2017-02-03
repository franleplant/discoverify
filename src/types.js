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
export type Track = {}

export type SpotifyImage = {
  height: number,
  width: number,
  url: string,
}
