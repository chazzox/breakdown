declare enum SpotifyTypes {
    user = "user",
    playlist = "playlist",
    track = "track",
}
interface UserInfo {
    display_name: string;
    external_urls: { spotify: string };
    followers: { href: null; total: 15 };
    href: string;
    id: string;
    images: SpotifyImage[];
    type: SpotifyTypes.user;
}

interface SpotifyImage {
    height: number | null;
    url: string;
    width: number | null;
}

interface Song {
    added_at: string;
    added_by: UserInfo;
    is_local: boolean;
    primary_color: string | null;
    track: TrackInfo;
    video_thumbnail: { url: string | null };
}

interface Tracklist {
    href: string;
    items: Song[];
    limit: number;
    next: null | string;
    offset: number;
    previous: null | string;
    total: number;
}

interface TrackInfo {
    album: {};
    artists: any[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    episode: boolean;
    explicit: boolean;
    external_ids: { isrc: string };
    external_urls: { spotify: string };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track: boolean;
    track_number: number;
    type: SpotifyTypes.track;
    uri: string;
}

interface Playlist {
    collaborative: boolean;
    description: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    owner: UserInfo;
    primary_color: string | null;
    public: boolean;
    snapshot_id: string;
    tracks: { href: string };
    type: SpotifyTypes.playlist;
    uri: string;
}

interface AllPlaylists {
    href: string;
    items: Playlist[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

interface SpotifyError {
    error: {
        status: number;
        message: string;
    };
}
