export interface UserInterface {
  display_name: string
  external_urls: {
    spotify: string
  }
  followers: {
    href: string | null
    total: number
  }
  href: string
  id: string
  images: {
    url: string
    height: number
    width: number
  }[]
  type: string
  uri: string
}

export interface LikedTrackInterface {
  added_at: string
  track: TrackInterface
}

export interface TrackInterface {
  album: AlbumInterface
  artists: ArtistInterface[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: {
    isrc: string
    ean: string
    upc: string
  }
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  is_playable: boolean
  linked_from: {}
  restrictions: {
    reason: string
  }
  name: string
  popularity: 0
  preview_url: string
  track_number: 0
  type: string
  uri: string
  is_local: boolean
}

export interface AlbumInterface {
  album_type: string
  total_tracks: number
  available_markets: string[]
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: {
    url: string
    height: number
    width: number
  }[]
  name: string
  release_date: string
  release_date_precision: string
  restrictions: {
    reason: string
  }
  type: string
  uri: string
  artists: {
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
  }[]
}

export interface ArtistInterface {
  external_urls: {
    spotify: string
  }
  followers: {
    href: string
    total: 0
  }
  genres: string[]
  href: string
  id: string
  images: {
    url: string
    height: number
    width: number
  }[]

  name: string
  popularity: number
  type: string
  uri: string
}
